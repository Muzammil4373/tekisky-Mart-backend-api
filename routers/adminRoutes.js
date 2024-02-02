import { addProduct, deleteProduct, getProduct, updateProduct,getOneProduct,dealOfTheDay} from "../controllers/adminController.js";
import  express from "express";
import multer, { memoryStorage } from "multer"
const upload = multer({ storage: multer.memoryStorage() });

const adminRoutes = express.Router()


adminRoutes.post('/addproduct',upload.array('files',5),addProduct)
adminRoutes.get('/getproduct',getProduct)
adminRoutes.put('/update/:id',updateProduct)
adminRoutes.get('/delete/:id',deleteProduct)
adminRoutes.get('/getoneproduct/:id',getOneProduct)
adminRoutes.get('/dealoftheday',dealOfTheDay)

export default adminRoutes