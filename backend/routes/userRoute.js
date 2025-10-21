import express from "express"
import { register, verify } from "../controllers/userController.js"

const router = express.Router()

router.post("/register", register),
router.post("/verify", verify),
router.post("/register", register),
router.post("/register", register)

export default router