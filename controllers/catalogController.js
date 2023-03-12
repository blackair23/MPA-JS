const { checkUser } = require('../middlewares/guards');
const { getBlogById, getAllBlog, editBlog, deleteBlog, followedUsers } = require('../services/blogService');
const { getUserById } = require('../services/userService');
const { parseError } = require('../util/parser');

let catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {

    let blog = await getAllBlog();
    console.log(blog);
    res.render('catalog', {
        user: req.user,
        blog,
    });
})

catalogController.get('/:id/details', async (req, res) => {

    let blog = await getBlogById(req.params.id);
    // console.log('owner', posts.owner);
    let ownerOfBlog = await getUserById(blog.owner);
    let user = req.user;
    if(req.user){

        // console.log('user', user, '---', req.user);
        blog.followed = blog.followListEmails.map(x => x.toString()).includes(req.user.email.toString());
        if(blog.owner == req.user._id){
            user.isOwner = true;
        }
    }
    res.render('details', {
        title: 'Details Page',
        user,
        blog,
        blogOwner: {email: ownerOfBlog.email},
    });
})

catalogController.get('/:id/delete', checkUser(), async (req, res) => {
    const blog = await getBlogById(req.params.id);
    if(blog.owner == req.user._id){
        await deleteBlog(req.params.id);
        // user.isOwner = true;
    }
    res.redirect('/catalog');
});

catalogController.get('/:id/edit', checkUser(), async (req, res) => {
    const blog = await getBlogById(req.params.id);
    if(blog.owner.toString() != req.user._id.toString()){
        return res.redirect('/catalog');
    }
    res.render('edit', { user: req.user, blog });
});

catalogController.post('/:id/edit', checkUser(), async (req, res) => {
    const blog = await getBlogById(req.params.id);

    if(blog.owner.toString() != req.user._id.toString()){
        return res.redirect('/catalog');
    }
    
    try{
        await editBlog(req.params.id, req.body);
        res.redirect(`/catalog/${req.params.id}/details`);
    }catch(error){
        // let errors = parseError(error);
        res.render('edit', {user: req.user, blog , errors: parseError(error) } )
    }
});

catalogController.get('/:id/follow', checkUser(), async (req, res) => {
    const blog = await getBlogById(req.params.id);
    if(blog.owner.toString() != req.user._id.toString() &&
        blog.followListEmails.map(x => x.toString()).includes(req.user.email.toString()) == false ){
            await followedUsers(req.user.email, req.user._id,  req.params.id);
        }
        
     res.redirect(`/catalog/${req.params.id}/details`);
});

module.exports = catalogController;