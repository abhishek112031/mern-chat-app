import express from 'express'
import protectRoutes from '../middlewares/protectRoutes.js'
import {getUsersForSideBars} from '../controller/user.controller.js'



const userRoute=express.Router();



userRoute.get('/',protectRoutes,getUsersForSideBars)
// userRoute.get('/get-messages/:id',protectRoutes,getMessages)



export default userRoute;