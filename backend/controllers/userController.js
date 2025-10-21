import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { verifyEmail } from "../emailVerify/email.js";

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === ""
    )
      return res.json({
        success: false,
        status: 400,
        message: "All field are required",
      });

    const user = await User.findOne({ email })
    if (user) {
      return res.json({
        status: 400,
        message: "User already exist",
        success: false,
      });
    }
    
    const hashPassword = await bcrypt.hash(password, 10)

    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword
    });

    const token = jwt.sign({id: newuser._id}, process.env.SECRET_KEY, {expiresIn: "3hr"});
    verifyEmail(token, email) // send the email verification 
    newuser.token = token

    await newuser.save();
    return res.status(200).json({
      success: true,
      message: "User registred successfully",
      user: newuser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verify = async (req, res) =>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                success: false,
                message: "Authorization token is missing"
            })
        }

        const token = authHeader.split(" ")[1]
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY, {expiresIn: "15min"})
        } catch (error) {
            if(error.name === "TokenExpiredError"){
               return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }

            return res.status(400).json({
                success: false,
                message:"Token verification failed"
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"

            })
        }
        user.token = null,
        user.isVerified = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"

        })

    } catch (error) {
       return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const reVerify = async(req, res)=>{
  try {
    
    const {email} = req.body;
    const user = await User.findOne({email})
  
    if(!user){
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
  
    if (!process.env.SECRET_KEY) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: SECRET_KEY missing" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '15min' })
    verifyEmail(token, email);
    user.token = token
    await user.save()
    return res.status(200).json({
      success: true,
      message: "Verification email sent again successfully",
      token: user.token
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
  }
