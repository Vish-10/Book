var mongoose = require('mongoose');
const bookSchema = require('./bookModel')
var Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    admin: {
        type: Boolean,
        default: false
    },
    list:[
        {
            type: Schema.Types.ObjectId,
            default:'',
            ref: 'books'
        }
    ]
    
  
});


var User = mongoose.model('users', UserSchema);
module.exports = User;
