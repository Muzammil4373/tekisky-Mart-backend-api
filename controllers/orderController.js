import {
  saveOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} from "../services/orderService.js";
import dotenv from 'dotenv';
import axios from "axios"
dotenv.config()
import { mongoose } from 'mongoose';

import { getOneProductService } from "../services/adminServices.js";

// Function to generate a unique order IDlet orderCounter = 1001;
let orderCounter = 10001;
const generateOrderId = () => {
  try {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    const tekiskyMart = 'TekiskyMart:';
    const orderId = `${tekiskyMart}${year}${orderCounter}`;

    orderCounter += 1; // Increment the counter for the next order

    return orderId;
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};

// Reset the counter when needed, for example, at the start of a new day
const resetOrderCounter = () => {
  orderCounter = 1001;
};



const sendMessage = async (mobileNumber) => {
  try {
    const accessToken = process.env.WHATSAPP_TOKEN;

    const url = 'https://graph.facebook.com/v18.0/160700440470778/messages';

    const data = {
      messaging_product: 'whatsapp',
      to: mobileNumber,
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`);
  }
};



export const addOrder = async (req, res) => {

  try {
    const uniqueOrderID = await generateOrderId(); // this function generates a unique ID

    const status = await saveOrder({ orderId: uniqueOrderID, ...req.body });

    if (status.success) {
      const apiCall = await sendMessage(req.body.mobileNumber)
      res.status(201).json({ success: true, message: 'Successfully added order',order:status.order });
    } else {
      res.status(400).json({ success: false, message: 'Error while adding the order' });
    }
  } catch (error) {
    console.error('Error in controller adding order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    console.error("Error in getting orders:", error);
    res.status(500).json({ status: "error", message: "Error in getting orders" });
  }
};





export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    // Assuming req.body contains the updated data for the order
    const updateData = req.body;

    const updatedOrder = await updateOrderById(id, updateData);

    if (updatedOrder) {
      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await deleteOrderById(id);
    res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById1 = async (req, res) => {
  try {
    const id = req.params.id;
    const updateOrder = await getOrderById(id);
    res.status(200).json({ success: true, order: updateOrder, updateOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
