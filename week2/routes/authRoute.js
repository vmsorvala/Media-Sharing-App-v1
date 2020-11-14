'use strict';
const express = require('express');
const router = express.Router();
const { body, sanitizeBody } = require('express-validator');
const authController = require('../controllers/authController');


router.post('auth/login', authController.login);
router.get('auth/logout', authController.logout);
router.post('auth/register',
    [
        body('name', 'minimum 3 characters').isLength({ min: 3 }),
        body('username', 'email is not valid').isEmail(),
        body('password', 'at least one upper case letter').
            matches('(?=.*[A-Z]).{8,}'),
        body('name').escape(),
    ],
    authController.user_create_post,
    authController.login,
);

module.exports = router;