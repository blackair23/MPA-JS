const mongoose = require('mongoose');

// TODO change database name according to assigment
let CONNECTION_STRING = 'mongodb://127.0.0.1:27017/mindBlog'
 
module.exports = async (app) => {
    try{
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected!');
        
    }catch(err) {
        console.error(err.message);
        process.exit(1)
    }
}