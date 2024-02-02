import express from 'express'
import { createUser, loginUser, getUsers, updateUserById, deleteUser, getOneUser } from '../controllers/userController.js';



const userRoutes = express.Router();

userRoutes.post('/createUser', createUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/updateUser/:id', updateUserById);
userRoutes.get('/getUsers', getUsers);
userRoutes.get('/deleteUser/:id', deleteUser);
userRoutes.get('/getOneUser/:id', getOneUser)


export default userRoutes