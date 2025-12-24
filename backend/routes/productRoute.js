import express from "express"
import { addProduct, deleteProducts, getAllProducts, updateProducts } from "../controllers/productController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { multipleUpload } from "../middleware/multer.js"

const router = express.Router()

router.post("/add", isAuthenticated, isAdmin, multipleUpload ,addProduct);
router.get("/getallproducts", getAllProducts)
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProducts);
router.put("/update/:id", isAuthenticated, isAdmin, multipleUpload, updateProducts);


export default router


