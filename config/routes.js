const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const createController = require("../controllers/createController");
const { defautController } = require("../controllers/defautController");
const { homeController } = require("../controllers/homeController");
const { profileController } = require("../controllers/profileController");
const { checkUser } = require("../middlewares/guards");

module.exports = async (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/create', checkUser(), createController);
    app.use('/catalog', catalogController);
    app.use('/profile', checkUser(), profileController);

    app.use('/*', defautController);
};