var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const BookSchema = new Schema({
    name: String,
    author: String,
    source: {
        type: String,
        default: ''
    },
    price: Number
   
});


var Book = mongoose.model('books', BookSchema);
module.exports = Book;
