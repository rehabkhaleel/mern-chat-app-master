import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				if (!res.ok) { // Check for HTTP errors
					throw new Error(data.error || 'Failed to fetch conversations');
				}
				console.log("Fetched Conversations:", data); // Debugging
				setConversations(data); // Update state with fetched conversations
			} catch (error) {
				toast.error(error.message); // Display error message
			} finally {
				setLoading(false); // Ensure loading state is turned off
			}
		};

		getConversations();
	}, []);

	return { loading, conversations }; // Return loading and conversations state
};

export default useGetConversations;
