import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },

    avatar: {
      type: String, // cloudinary url
      default: ""
    },

    coverImage: {
      type: String, // cloudinary url
      default: ""
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      }
    ],

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },

    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);



userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.isPasswordCorrect = async function (password){
 return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
 return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
  )
}

userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRE
    }
  )
}

export const User = mongoose.model("User", userSchema);


