const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

let authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    //TODO replace by actuoa view
    res.render('register', { title: 'Registration'})
});

authController.post('/register', isGuest(),
    body('username')
        .isLength({ min: 2 }).withMessage('Username shoud be at least 2 charakters long')
        .isAlphanumeric().withMessage('Username shoud contain only letters and numbers'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password shoud be at least 4 charakters long')
        .isAlphanumeric().withMessage('Password shoud contain only letters and numbers'),
    body('email')
        .isEmail().withMessage('Invalid email')
        .isLength({ min: 10 }).withMessage('Email shoud be at least 10 charakters long'),
    async (req, res) => {
        console.log(req.body);
        try {
            const { errors } = validationResult(req);
            if(errors.length > 0) {
                throw errors;
            }
            if(req.body.username == '' || req.body.email == ''  || req.body.password == '')  {
                throw new Error('All fields are required!');
            } 
            if(req.body.password != req.body.repass){
                throw new Error('Password don\'t match');
            }

            const token = await register(req.body.username, req.body.email, req.body.password);
            //TODO chachk if register create session 
            res.cookie('token', token);

            res.redirect('/');
        } catch (error) {
            let errors = parseError(error);
            //TODO add error display from assigment 
            res.render('register', {
                title: 'Register Page',
                errors,
                body: {
                    username: req.body.username,
                    email: req.body.email
                }
            })
        }
})

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title:'Login Page'
    })
})

authController.post('/login', isGuest(), async (req, res) => {
    console.log(req.body.email, req.body.password)
    try {
        if(req.body.email == '' || req.body.password == '')  {
            throw new Error('All fields are required!');
        } 
        let token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');//TODO replace redirect
        
    } catch (error) {
        let errors = parseError(error);

        res.render('login', {
            title:'Login Page',
            errors,
            body: {
                email: req.body.email
            }
        })
    }
})

authController.get('/logout', (req, res) =>{
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;