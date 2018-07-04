const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

// POST route for updating data
router.post('/', (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    let err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords don't match");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, (error, user) => {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
      if (error || !user) {
        let err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    let err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET route after registering
router.get('/profile', (req, res, next) => {
  User.findById(req.session.userId)
    .exec((error, user) => {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          let err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br /><a type="button" href="/logout">Logout</a>');
        }
      }
    });
});

// GET route for logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
