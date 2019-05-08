const logger = require("./helpers/logger");

const CONFIG = require("../env");



const PORT = CONFIG.port;

// config
const app = require("./config/express")();
const redis = require("./services/redis");
const server = require("./config/server")(app);
const socket = require("./config/socket")(server);

require("./config/process")(server, socket, redis);

// start
server.listen(PORT, () => {
	logger.info(`Express server listening on port: ${PORT}`);
	logger.info(`PID: ${process.pid}`);
});

// expose app
exports = module.exports = app;
