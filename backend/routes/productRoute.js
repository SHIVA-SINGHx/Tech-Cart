import express from "express"
import { addProduct, deleteProducts, getAllProducts } from "../controllers/productController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js"
import { multipleUpload } from "../middleware/multer.js"

const router = express.Router()

router.post("/add", isAuthenticated, isAdmin, multipleUpload ,addProduct);
router.get("/getallproducts", getAllProducts)
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProducts);
router.put("/update/:productId", isAuthenticated, isAdmin, multipleUpload, deleteProducts);


export default router