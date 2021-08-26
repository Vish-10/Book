const mongoose = require('mongoose');
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sdrom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async() => {
    await mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false });
    console.log('DB connected');
}


module.exports = connectDB;