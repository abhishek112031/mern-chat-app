import mongoose from 'mongoose';

const connectTOMongoDB=async()=>{
    console.log('Comnnection DB to:',process.env.MONGO_URI)
    try{
        await mongoose.connect(process.env.MONGO_URI)
        
    }catch(err){
        console.log(err)
    }
}

export default connectTOMongoDB;