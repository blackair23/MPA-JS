function checkUser() {
    return (req, res, next) => {
        if(req.user){
            next();
        } else {
            res.redirect('/auth/login'); //TODO corect redirect
        }
    }
}
function isGuest() {
    return (req, res, next) => {
        if(req.user){
            res.redirect('/'); //TODO corect redirect
        } else {
            next();
        }
    }
}

module.exports = { 
    checkUser,
    isGuest,
}