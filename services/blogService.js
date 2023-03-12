const Blog = require('../models/Blog');


async function getBlogById(id) {
    return  Blog.findById(id).lean();
}


async function getAllBlog() {
    return await Blog.find({}).lean();
}



async function getForHome() {
    return await Blog.find({}).limit(3).lean();
    // console.log(result);
}

async function createBlog(blog) {
    return await Blog.create(blog);
}

async function deleteBlog(id) {
    await Blog.findByIdAndDelete(id);
}

async function editBlog(id, blog) {
    const existing = await Blog.findById(id);
    // console.log('course >>> ',course)
    // console.log('existing >>> ', existing);

    existing.title = blog.title;
    existing.imgUrl = blog.imgUrl;
    existing.content = blog.content;
    existing.category = blog.category;

    return existing.save();
}

async function followedUsers(email, idUser, idCourse) {
    const existing = await Blog.findById(idCourse);

    existing.followList.push(idUser);
    existing.followListEmails.push(email);

    return existing.save();
}


async function getUserBlog(id) {
    return await Blog.find({owner: id}).lean();
}

async function getUserFolledBlog(id) {
    return await Blog.find({followList: id}).lean();
}
    
module.exports = {
    getBlogById,
    editBlog,
    createBlog,
    deleteBlog,
    followedUsers,
    getAllBlog,
    getForHome,
    getUserBlog,
    getUserFolledBlog,
}