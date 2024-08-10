import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";

    // Determine profile picture based on sender
    const profilePic = fromMe
        ? (authUser.profilePic || "https://via.placeholder.com/150") // Default image if no profile picture
        : (selectedConversation?.profilePic || "https://via.placeholder.com/150"); // Default image if no profile picture

    const bubbleBgColor = fromMe ? "bg-green-500" : "bg-blue-500"; // Adjusted for better visibility
    const shakeClass = message.shouldShake ? "shake" : "";

    // Debugging logs
    console.log('Message Sender ID:', message.senderId);
    console.log('Auth User ID:', authUser._id);
    console.log('Selected Conversation Pic:', selectedConversation?.profilePic);
    console.log('Profile Pic URL:', profilePic);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img 
                        alt='User Avatar' 
                        src={profilePic} 
                        onError={(e) => e.target.src = "https://via.placeholder.com/150"} // Fallback URL
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;