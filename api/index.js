/* eslint-disable quotes */
const { app, server } = require('./src/socket/socket');
const routes = require('./src/config/routes');

init();

async function init() {
    require('dotenv').config();
    await require('./src/config/mongoose')();

    require('./src/config/express')(app);
    app.use(routes);

    server.listen(process.env.PORT, () =>
        console.log(
            `🚀 [server]: Server is up and running on port: ${process.env.PORT}`
        )
    );
}
