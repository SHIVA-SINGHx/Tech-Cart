import { User } from "../models/userModel.js";

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

    const user = await new User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "User already exist",
        success: false,
      });
    }
    //   const hashPassword =

    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
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
