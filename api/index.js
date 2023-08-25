/* eslint-disable quotes */
const express = require("express");
const routes = require("./src/config/routes");

init();

async function init() {
  require("dotenv").config();
  await require("./src/config/mongoose")();

  const app = express();
  require("./src/config/express")(app);
  app.use(routes);

  app.listen(process.env.PORT, () =>
    console.log("Server is up and running on PORT: " + process.env.PORT)
  );
}
