'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

const username = 'foo';
const password = 'bar';
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
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
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/form', (req, res) => {
	if (req.session.logged) {
		res.redirect('/secret');
	} else {
		res.render('form');
	}
});

app.get('/secret', (req, res) => {
	if (req.session.logged) {
		res.render('secret');
	} else {
		res.redirect('/form');
	}
});

app.post('/login', (req, res) => {
	console.log(req.body);
	if (req.body.username === username && req.body.password === password) {
		req.session.logged = true;
		res.redirect('/secret');
	} else {
		res.redirect('/form');
	}
});
app.get('/setCookie/:clr', (req, res) => {
	res.cookie('color', req.params.clr);
	res.send('moro');
});

app.get('/readCookie', (req, res) => {
	console.log(req.cookies);
	res.send('moro');
});

app.get('/deleteCookie', (req, res) => {
	res.clearCookie('color');
	res.send('moro');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
