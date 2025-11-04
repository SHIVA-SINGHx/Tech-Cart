import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { verifyEmail } from "../emailVerify/email.js";
import { Session } from "../models/sessionModel.js";
import { sentOtpMail } from "../emailVerify/sentOtpMail.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    )
      return res.json({
        success: false,
        status: 400,
        message: "All field are required",
      });

    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "User already exist",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newuser._id }, process.env.SECRET_KEY, {
      expiresIn: "3hr",
    });
    verifyEmail(token, email); // send the email verification
    newuser.token = token;

    await newuser.save();
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newuser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing",
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY, {
        expiresIn: "15min",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    (user.token = null), (user.isVerified = true);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!process.env.SECRET_KEY) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server misconfiguration: SECRET_KEY missing",
        });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15min",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Verification email sent again successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    console.log("User verification status:", existingUser.isVerified); 

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!existingUser.isVerified) {
      // Changed condition to check isVerified
      return res.status(400).json({
        success: false,
        message: "Verify your account before login",
      });
    }

    // generate token
    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    existingUser.isLoggedIn = true;
    await existingUser.save();

    // Check for existing session and delete it
    const existingSession = await Session.findOne({ userId: existingUser._id });
    if (existingSession) {
      await Session.deleteOne({ userId: existingUser._id });
    }

    // create a new session
    await Session.create({ userId: existingUser._id });
    return res.status(200).json({
      success: true,
      message: `Welcome ${existingUser.firstName}`,
      refreshToken,
      accessToken,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //10min
    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sentOtpMail(otp, email);
    return res.status(200).json({
      success: true,
      message: "Otp sent successfully on your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const otp = req.body;
    const { email } = req.params.email;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "Otp is not generated or already verified",
      });
    }

    if (!user.otp < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp has epxired please generate new one",
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is invalid",
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allUser = async(req, res)=>{
  try {
    const users = await User.find()
    return res.status(200).json({
      success: true,
      users
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getUserById = async (req, res) =>{
  try {
    const {userId} = req.params;
    const user = await User.findById(userId).select("-password -token -otp -otpExpiry")
    if(!user){
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
  
    return res.status(200).json({
      success: true,
      message: user,
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id;
    const loggedInUser = req.user; // from authenticated middleware
    const { firstName, lastName, address, city, zipCode, phoneNo, role } = req.body;

    // Authorization check
    if (loggedInUser._id.toString() !== userIdToUpdate && loggedInUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    let user = await User.findById(userIdToUpdate);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Keep existing images
    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    // If new file uploaded
    if (req.file) {
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
      }

      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      profilePicUrl = uploadRes.secure_url;
      profilePicPublicId = uploadRes.public_id;
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneNo = phoneNo || user.phoneNo; // ✅ fixed name
    user.role = role || user.role;
    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error in updateUser:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
