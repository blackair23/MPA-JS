const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        // console.log(token);
        try {
            const userData = verifyToken(token);
            // console.log('User: ', userData.username);
            req.user = userData;
            res.locals.username = userData.username;
        } catch (error) {
            // console.log('Ivalid token')
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }
    next();
}