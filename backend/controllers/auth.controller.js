import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const HARD_CODED_SPECIAL_KEY = "123";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      gender,
      role,
      course,
      batch,
      courses,
      batches,
      specialKey,
    } = req.body;

    console.log(req.body);

    // Check for password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Validate special key for teachers
    if (role === "teacher" && specialKey !== HARD_CODED_SPECIAL_KEY) {
      return res
        .status(400)
        .json({ error: "Invalid special key for teachers" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate avatar URL
    const profilePicBaseUrl = "https://avatar.iran.liara.run/public/";
    const profilePicUrl = `${profilePicBaseUrl}${
      gender === "male" ? "boy" : "girl"
    }?username=${email}`;

    // For debugging
    console.log(req.body);

    let newUser;

    if (role === "student") {
      // Debugging log
      console.log("Course and Batch:", course, batch);
      if (!course || !batch) {
        return res
          .status(400)
          .json({ error: "Course and batch are required for students" });
      }

      // Find teachers for the student's course and batch
      const teachers = await User.find({
        role: "teacher",
        courses: course,
        batches: batch,
      });

      // Assuming assigning only the first matching teacher
      const teacher = teachers.length > 0 ? teachers[0]._id : null;

      newUser = new User({
        name,
        email,
        password: hashedPassword,
        gender,
        role,
        course,
        batch,
        teacher, // Optional field for students
        avatar: profilePicUrl,
      });
    } else if (role === "teacher") {
      if (
        !courses ||
        !batches ||
        courses.length === 0 ||
        batches.length === 0
      ) {
        return res
          .status(400)
          .json({ error: "Courses and batches are required for teachers" });
      }

      newUser = new User({
        name,
        email,
        password: hashedPassword,
        gender,
        role,
        courses,
        batches,
        avatar: profilePicUrl,
      });
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Save user and generate token
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    });
    // For Debugging
    console.log(newUser);
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
