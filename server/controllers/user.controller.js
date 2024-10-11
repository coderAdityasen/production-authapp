
import { User } from "../model/user.models.js";


export const registerUser = async (req, resp) => {
	try {
	  const { username,  password } = req.body;
		
	  if (
		![username, password].every(
		  (field) => field.trim() !== ""
		)
	  ) {
		return resp.status(400).json({ message: "All fields are required" });
	  }
  
	  const existingUser = await User.findOne({ username });
	  if (existingUser) {
		return resp.status(409).json({ message: "User already exists" });
	  }
  
	  const newUser = new User({
		username,
		password
	  });
	  const savedUser = await newUser.save();
  
	  return resp
		.status(201)
		.json({
		  success: true,
		  message: "User created successfully",
		  data: savedUser,
		});
	} catch (error) {
		throw error;
	  resp.status(500).json({ success: false, message: "Internal server error" });
	}
  };

