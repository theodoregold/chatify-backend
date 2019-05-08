const logger = require("../helpers/logger");



// for async/await
const close = (service) => {
	return new Promise((resolve) => {
		service.close(() => {
			resolve();
		});
	});
};

const handle = (server, socket, redis) => async (signal) => {
	logger.info("\n");
	logger.info(`${signal} received`);
	logger.info("Ending app");

	// app should gracefully completes current connections
	// while balance loader should handle new ones

	logger.info("Disconnecting WebSocket");
	await close(socket);

	logger.info("Disconnecting server");
	await server.close();
	logger.info("Server disconnected");

	logger.info("Disconnecting Redis");
	await redis.quit();
	logger.info("Redis disconnected");

	process.exit(0);
};


module.exports = (server, socket, redis) => {
	process.title = "node-chat";

	process.on("SIGINT", handle(server, socket, redis));
	process.on("SIGTERM", handle(server, socket, redis));
};
