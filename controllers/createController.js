const { checkUser } = require('../middlewares/guards');
const { createBlog } = require('../services/blogService');
const { parseError } = require('../util/parser');

let createController = require('express').Router();

createController.get('/',  checkUser(), (req, res) => {
    res.render('create', { user: req.user });
});

createController.post('/',  checkUser(), async (req, res) => {
    let blog = {
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        content: req.body.content,
        category: req.body.category,
        owner: req.user._id,
    }
    try {
        await createBlog(blog);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            errors: parseError(error),
            body: blog,
        })
    }
});

module.exports = createController;