import User from '../models/user.model.js'
export const getUsersForSideBars=async (req,res,next)=>{
    try {

        const currentUser =req.user._id;

        const allOtherusers=await User.find({_id:{$ne:currentUser}}).select('-password');

        res.status(200).json(allOtherusers);
        
    } catch (error) {
        console.log('error in getUsers:-->', error);
        res.status(500).json({error:"internal server error"})
        
    }

}