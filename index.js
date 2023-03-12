let express = require('express');
let expressConfig = require('./config/express');
let databaseConfig = require('./config/database');
let routeConfig = require('./config/routes');

start();

async function start(){
    const app = express();

    //...execute config
    await databaseConfig(app);
    expressConfig(app);
    routeConfig(app);

    app.listen(3000, () => {console.log('Server listen on port 3000')});
} 