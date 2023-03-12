let defautController = require('express').Router();

defautController.get('/', (req, res) => {
    res.render('404', {
        user: req.user
    });
}); 


module.exports = {
    defautController
}