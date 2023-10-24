const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Connected to database: ${conn.connection.host}`);
    } catch(e){
        console.log('Error connecting to database')
    }
}

module.exports = connectDB;