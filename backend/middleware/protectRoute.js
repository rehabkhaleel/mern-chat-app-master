import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		// For Debugging
		console.log("Token Retrieved:", token);

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		let decoded;
		try {
			decoded = jwt.verify(token, process.env.JWT_SECRET);
			// For Debugging
			console.log("Token Decoded:", decoded);
		} catch (error) {
			if (error.name === 'TokenExpiredError') {
				return res.status(401).json({ error: "Unauthorized - Token Expired" });
			}
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
