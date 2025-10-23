
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"


export const isAuthenticated = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith === ("Bearer ")){
            return res.status(400).json({
                success: false,
                message: "Authorization token is missing"
            })
        }
        const token = await authHeader.split(" ")[1]
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }
            return res.json({
                success: false,
                message: "Access token is missing or invalid"
            })
        }

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        req.user = user
        req.id = user._id
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: message.error
        })
    }
}

export const isAdmin = async (req, res, next) =>{
    if(req.user && req.user.role === 'Admin'){
        next()
    } else{
        return res.status(403).json({
            success: false,
            message: 'Access denied: Admins only'
        })
    }
}