var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/userModel');
var Book = require('../models/bookModel');
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
const { ensureAuthenticated, ensureAdmin } = require('../authenticate');

/*uri = "mongodb+srv://vish_10:imtheadmin@cluster0.sdrom.mongodb.net/book?retryWrites=true&w=majority";

const db = (uri);
mongoose.Promise = global.Promise;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err)
    console.log(err);
  else
    console.log('Connected');
})*/

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
/*router.get('/', (req, res, next) => { //only for admins
  User.find({})
  .then( (users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});*/


router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) throw err;
    encryptedPass = hash;
  })
  
  const query = User.where({username: req.body.username});
  query.findOne(function (err, user) {
    if(err)
      return next(err);
    
    if(!user){
      console.log(req.body.username);
      temp = {};
      temp.name = req.body.name;
      temp.email = req.body.email;
      temp.username = req.body.username;
      temp.password = encryptedPass;
      Temp = new User(temp)
      Temp.save((err, newUser) => {
        if(err)
        return res.json(err);

        else
          res.json(newUser);
      })
    }

    else{
      res.statusCode = 406;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Registration unsuccessfull', err: 'username already exists'});
    }
  })
})


router.post('/login', (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {
    if(err) throw err;
    if(!user) res.send(false);
    else{
      req.logIn(user, err => {
        if(err) throw err;
        User.findOne({username: user.username})
        .populate('list').exec((err, user) => {
            if(err) throw err;
            res.json(user);
        })
         
      })
    }
  })(req, res, next);
});



router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

router.post('/id', ensureAuthenticated, (req, res, next) => { //adding favorite to list
  console.log(req.user._id);
  console.log(req.body.id);
  var check = true;
  for(var i = 0; i<req.user.list.length; i++)
    if(req.user.list[i] == req.body.id)
      {check = false;break;}
  if(check){
    req.user.list.push(req.body.id);
    
    User.deleteOne({ username: req.user.username });
    console.log(req.user);
    
    req.user.save((err, newUser) => {
      if(err) throw err;

      User.findOne({username: newUser.username})
      .populate('list').exec((err, user) => {
          if(err) throw err;
          res.json(user);
      })

    })
  }
  else
    res.json(false);

})


router.put('/id', ensureAuthenticated, (req, res, next) => { //removing favorite to list
  console.log(req.user._id);
  console.log(req.body.id);
  var i = req.user.list.indexOf(req.body.id);
  temp = req.user.list[i];
  req.user.list[i] = req.user.list[req.user.list.length - 1];
  req.user.list[req.user.list.length - 1] = temp;
  req.user.list.pop();

   
  User.deleteOne({ username: req.user.username });
  console.log(req.user);
  
  req.user.save((err, newUser) => {
    if(err) throw err;

    User.findOne({username: newUser.username})
    .populate('list').exec((err, user) => {
        if(err) {res.json(false);throw err;}
        return res.json(user);
    })
  })
  

})

router.get('/admin/allusers', ensureAuthenticated, ensureAdmin, (req, res, next) => {
  User.find({})
  .then( (users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});


router.put('/admin/makeadmin', ensureAuthenticated, ensureAdmin, (req, res, next) => {
 User.findOneAndUpdate({_id: req.body.id}, {$set:{'admin': true}}, { useFindAndModify: false, new: true}, (err, doc) => {
  User.find({})
  .then( (users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
 })
})


router.put('/admin/removeuser', ensureAuthenticated, ensureAdmin, (req, res, next) => {
  console.log(req.body.id);
  const query  = User.where({ _id: req.body.id });
  query.findOne(function (err, user) {
    if (err) return handleError(err);
    User.deleteOne({username: user.username})
    .then(() => {
      User.find({})
      .then((users) => {
        res.json(users);
      })
    })
    
  })
  /*User.deleteOne({username: req.body.id});
  User.find({})
  .then( (users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));*/
 
 })

 router.put('/admin/removebook', ensureAuthenticated, ensureAdmin, (req, res, next) => {
  console.log(req.body.id);
  const query  = Book.where({ _id: req.body.id });
  query.findOne(function (err, book) {
    if (err) return handleError(err);
    Book.deleteOne({_id: book._id})
    .then(() => {
      Book.find({})
      .then((books) => {
        res.json(books);
      })
    })
    
  })
 
 })

module.exports = router;
