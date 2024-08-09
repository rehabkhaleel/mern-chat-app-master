import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Environment variable key
const SPECIAL_AUTH_FOR_TEACHER = import.meta.env.VITE_SPECIAL_AUTH_FOR_TEACHER;
console.log("Special Key Required in Hook:", SPECIAL_AUTH_FOR_TEACHER);

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    // Function to handle input errors and validation
    const handleInputErrors = ({ name, email, password, confirmPassword, gender, role, specialKey }) => {
        if (!name || !email || !password || !confirmPassword || !gender) {
            toast.error("Please fill in all fields");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        if (role === "teacher" && specialKey !== SPECIAL_AUTH_FOR_TEACHER) {
            // For Debugging
            console.log("Special Key Provided:", specialKey);
            console.log("Special Key Required:", SPECIAL_AUTH_FOR_TEACHER);
            toast.error("Invalid special key for teachers");
            return false;
        }

        return true;
    };

    // Function to handle signup
    const signup = async ({ name, email, password, confirmPassword, gender, role,course,batch,courses, batches, specialKey }) => {
        const success = handleInputErrors({ name, email, password, confirmPassword, gender, role, specialKey });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, confirmPassword, gender, role, course,batch,courses, batches, specialKey }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Sign up successful!");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;