import express from 'express'
import { signup,login,logout } from '../controller/auth.controllers.js';

const authRoute=express.Router();



authRoute.post('/signup',signup)
authRoute.post('/login',login)
authRoute.post('/logout',logout)

export default authRoute;