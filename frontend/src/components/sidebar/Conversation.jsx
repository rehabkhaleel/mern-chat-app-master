import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import md5 from 'md5'; // Ensure md5 package is installed

// Function to generate a unique avatar URL based on email and gender
const getAvatarUrl = (gender, email) => {
  const genderParam = gender === 'male' ? 'male' : 'female'; // Default to female if not male
  const emailHash = md5(email.trim().toLowerCase()); // Hash the email

  return `https://avatar.iran.liara.run/public/${emailHash}?gender=${genderParam}`;
};

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    // Generate the URL for the profile picture based on gender and hashed email
    const profilePicUrl = conversation.profilePic
        ? conversation.profilePic
        : getAvatarUrl(conversation.gender, conversation.email);

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img
                          src={profilePicUrl}
                          alt='user avatar'
                          onError={(e) => e.target.src = "https://via.placeholder.com/150"} // Fallback URL
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.name}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation;
