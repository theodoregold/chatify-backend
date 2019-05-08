const pino = require("pino");

const logger = pino({
	name: "node-chat",
	level: (process.env.LOG_LEVEL || "info"),
	redact: ["message", "body"],
	prettyPrint: {
		translateTime: true,
		colorize: true,
	},
});


module.exports = logger;
