import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
        username: {
            type: String,
            
            unique: true,
        },
        email: {
            type: String,
            
        },
        fullName: {
            type: String,
            
        },
       
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isAdmin : {
            type : Boolean,
            default : false
        },

        refreshToken: {
            type: String,
          },
          avatar : {
            type : String,
          }
} , {timestamps: true})

userSchema.method()
export const User = mongoose.model("User" ,userSchema )
