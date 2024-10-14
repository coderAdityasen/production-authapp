import bcryptjs from "bcryptjs"
import { User } from "../model/user.models.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


export const registerUser = async (req, resp) => {
	try {
		const { username, email, fullName, password } = req.body;
	
		if (
		  ![username, email, fullName, password].every(
			(field) => field.trim() !== ""
		  )
		) {
		  return resp.status(400).json({ message: "All fields are required" });
		}
	
		// Check if the user already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
		  return resp.status(409).json({ message: "User already exists" });
		}
	
		const hashPassword = await bcryptjs.hash(password, 10);
	
		// Create a new user instance
		const newUser = new User({
		  username,
		  email,
		  fullName,
		  password: hashPassword,
		});
		// Save the new user to the database
		const savedUser = await newUser.save();
	
		return resp
		  .status(201)
		  .json({
			success: true,
			message: "User created successfully",
			data: savedUser,
		  });
	  } catch (error) {
		resp.status(500).json({ success: false, message: "Internal server error" });
	  }
	};


	
export const login = async (req, resp) => {
	const { email, password } = req.body;
	try {
	  const user = await User.findOne({ email });
	  const userID = user._id
	  if(!user) {
		return resp.status(400).json({ message: "Invalid username or password" });
	  }
	  const isMatched = await bcryptjs.compare(password, user.password);
	  if (!user || !isMatched) {
		return resp.status(400).json({ message: "Invalid username or password" });
	  }

	  generateTokenAndSetCookie(userID, resp);
	  return resp
		.status(200)
		.json({
		  message: "user login successfully",
		  data: {
			_id: user._id,
			username: user.username,
			fullname: user.fullName,
			email: user.email,
			isAdmin: user.isAdmin,
			avatar: user.avatar,
		  },
		});
	} catch (error) {
		throw error; // for developement pupose remove in production
	  resp.status(400).json({message : "user not found"})
	}
  };
  
export const getCurrUser = async (req, resp) => {
	 const userID = req.user._id;
	 try {
		const user = await User.findById(userID).select("-password");
		return resp.status(200).json({ data: user });
	 } catch (error) {
		resp.status(500).json({ success: false, message: "Internal server error" });
	 }
}