const { getUserBlog, getUserFolledBlog } = require('../services/blogService');

let profileController = require('express').Router();

//TODO  replace with real conteoller
profileController.get('/', async (req, res) => {
    let blogs = await getUserBlog(req.user._id);
    let followed = await getUserFolledBlog(req.user._id)
    let createCounter = blogs.length;
    let followCounter = followed.length;
    res.render('profile', {
        user: req.user,
        blogs,
        createCounter,
        followCounter,
        followed
    });
}); 

module.exports = {
    profileController
}