 import mongoose from 'mongoose'

const connectdb=async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/homedb');
    console.log("connect with db");
}

export default connectdb;