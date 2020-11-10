'use strict';
const express = require('express');
const passport = require('./utils/pass');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 6000,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine', 'pug');


const loggedIn = (req, res, next) => {
	if (req.user) {
	  next();
	} else {
	  res.redirect('/form');
	}
  };



app.get('/', (req, res) => {
	res.render('home');
});

app.get('/form', (req, res) => {
	if (req.user) {
		res.redirect('/secret');
	} else {
		res.render('form');
	}
});

app.get('/secret',loggedIn, (req, res) => {
	res.render('secret');
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/form'}),
(req, res) => {
  console.log('success');
  res.redirect('/secret');
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/form');
  });

// app.get('/setCookie/:clr', (req, res) => {
// 	res.cookie('color', req.params.clr);
// 	res.send('moro');
// });

// app.get('/readCookie', (req, res) => {
// 	console.log(req.cookies);
// 	res.send('moro');
// });

// app.get('/deleteCookie', (req, res) => {
// 	res.clearCookie('color');
// 	res.send('moro');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
