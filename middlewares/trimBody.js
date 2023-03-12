module.exports = (...exlydedKeys) => (req, res, next) => {
    if(req.body){
        for(let key in req.body){
            if(exlydedKeys.includes(key) == false){
                req.body[key] = req.body[key].trim(); 
            }
        }
    }
    next();
}