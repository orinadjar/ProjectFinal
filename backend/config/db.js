import mongoose, { connect } from "mongoose";

const connectDB = async () => { 
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL); // connection to mongo
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err){
        console.log(`Eroor: ${err.message}`);
        process.exit(1);

    }
}

export default connectDB;