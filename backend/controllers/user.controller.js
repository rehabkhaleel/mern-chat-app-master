import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findById(loggedInUserId).select("-password");

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let filteredUsers;

    if (loggedInUser.role === "teacher") {
      // Teachers can see all students
      filteredUsers = await User.find({ role: "student" }).select("-password");
    } else if (loggedInUser.role === "student") {
      // Students can see teachers assigned to their course and batch
      filteredUsers = await User.find({
        role: "teacher",
        course: loggedInUser.course,
        batch: loggedInUser.batch
      }).select("-password");
    } else {
      // For any other role or unexpected cases
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};