const mongoose = require('mongoose');

const uri = "mongodb+srv://vish_10:imtheadmin@cluster0.sdrom.mongodb.net/book?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: false });
    console.log('DB connected');
}


module.exports = connectDB;