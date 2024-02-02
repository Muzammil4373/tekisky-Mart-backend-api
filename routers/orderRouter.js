import express from "express";
import { addOrder,getAllOrder,getOrderById1,deleteOrder,updateOrder } from "../controllers/orderController.js";


let orderRoute=express.Router();
orderRoute.post("/saveOrder",addOrder);
orderRoute.get("/getAllOrders",getAllOrder);
orderRoute.get("/getOrderById/:id",getOrderById1)
orderRoute.delete("/deleteOrderById/:id",deleteOrder)
orderRoute.put("/updateOrderById/:id",updateOrder)
export default orderRoute;
