var express = require('express');
const bodyParser = require('body-parser');
var Book = require('../models/bookModel');
var mongoose = require('mongoose');
const { ensureAuthenticated, ensureAdmin } = require('../authenticate');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => { 
  Book.find({})
  .then( (books) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(books);
  }, (err) => next(err))
  .catch((err) => next(err));
});


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    
      cb(null, '../public/images');
  },
  filename: function(req, file, cb) {   
      cb(null,  Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    console.log(true);
      cb(null, true);
  } else {
    console.log(false);
      cb(null, false);
  }
}

let upload = multer({ storage: storage, fileFilter: fileFilter});
var newBook = new Book();

router.post('/add',(req, res, next) => { newBook.name = req.body.name; newBook.author = req.body.authorName; newBook.price = req.body.price;
   next();},upload.single('photo'), (req, res) => {
  //console.log(req.body);
  console.log(req.file);
    newBook.source = req.file.filename;
  /*const newBookData = new Book({
      name: req.body.name,
      author: req.body.authorName,
      price: req.body.price,
      source: req.file.path
  })*/

  

  newBook.save()
         .then(() => {
            Book.find({})
            .then( (books) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(books);
            }, (err) => next(err))
         })
         .catch(err => res.status(400).json('Error: ' + err));
    newBook = new Book();
      //res.json(newBook);
});


module.exports = router;
