import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async(): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (isConnected){
        console.log('Already connected to DB');
        return;
    }

    try{
       await mongoose.connect(process.env.MONGODB_URL || '', {
        dbName: 'dashboard',
       })
       isConnected = true;
       console.log('Connected to DB');

    } catch (err) {
        console.log('Error connecting to DB', err);
    }

}