const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = '468s9ad46asd4s8fs6a5d';


async function getUserById( id ){
    return await User.findById(id);
}

async function register(  username, email, password ){
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if(existingUsername) {
        throw new Error('Username is taken!');
    }
    if(existingEmail) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword,
    });

    //TODO check if user session is needed 
    const token = createSession(user);

    return token;
};

async function login(email, password){

    // const hashedPassword = await bcrypt.compare()

    let user = await User.findOne({email}).collation({ locale: 'en', strength: 2 });
    if(!user) {
        throw new Error('Incorrect email ot password!');
    }

    const isMatched = await bcrypt.compare(password, user.hashedPassword);
    if(isMatched != true) {
        throw new Error('Incorrect email ot password!');
    }

    const token = createSession(user);
    return token;
};

function createSession({ _id, username, email }){
    const payload = {
        _id,
        username, 
        email
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token; 
};

function verifyToken(token){
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    register,
    login,
    verifyToken,
    getUserById,
}