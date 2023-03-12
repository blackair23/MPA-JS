const { getForHome } = require('../services/blogService');

let homeController = require('express').Router();

//TODO  replace with real conteoller
homeController.get('/', async (req, res) => {
    let blogs = await getForHome();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        blogs,
    });
}); 

module.exports = {
    homeController
}