import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}, () => console.log("DB connected"))
    } catch (error) {
        console.log(`cannot connect ${error}`);
        
    }
}  

export default connectDB;