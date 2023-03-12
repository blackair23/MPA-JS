const { Schema, model, Types } = require('mongoose');


const URL_PATTERN = /https?:\/\/./i;

const blogSchema = new Schema({
    title: { type: String, required: true, unique: true, minlenght: [4, 'Title must be atleast 4 charakters!'] },
    imgUrl: { type: String, required: true, validate:{
        validator: (value) => URL_PATTERN.test(value),
        message: 'Invalid URL'
    }},
    content: { type: String, required: true, minlenght: [10, 'Content must be atleast 10 charakters!']},
    category: { type: String, required: true, minlenght: [3, 'Category must be atleast 3 charakters!'] },
    followList : { type: [Types.ObjectId], ref:'User', default: [] },
    followListEmails : { type: [Types.String], ref:'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
});

blogSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;