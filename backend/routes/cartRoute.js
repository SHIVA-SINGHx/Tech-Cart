import express from "express"
import { addCart, getCart, removeCart, updateQuantity} from "../controllers/cartController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.get("/getallproducts", getCart)
router.post("/", isAuthenticated, addCart);
router.put("/update", isAuthenticated, updateQuantity);
router.delete("/remove", isAuthenticated, removeCart);


export default router