const express = require("express");
const http = require("http");
const app = express();

const { logger } = require("./logger");

require("dotenv").config();
require("./bootstrap/database")();
require("./bootstrap/routes")(app);

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => logger.log("info", `Server Listening on ${port}`));
