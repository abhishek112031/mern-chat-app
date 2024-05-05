import mongoose from 'mongoose';

const connectTOMongoDB=async()=>{
    console.log('process.env.MONGO_URI====>',process.env.MONGO_URI)
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongoDB')
    }catch(err){
        console.log(err)
    }
}

export default connectTOMongoDB;