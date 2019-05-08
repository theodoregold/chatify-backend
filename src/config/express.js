const express = require("express");

const pino = require("express-pino-logger");

const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const parser = require("body-parser");

const router = require("./router");

const handler = require("../helpers/handler");
const logger = require("../helpers/logger");

const serverError = require("../errors/server");



module.exports = () => {
	// create express app
	const app = express();

	app.use(cors());
	app.use(helmet());
	app.use(compress());
	app.use(parser.json());
	app.use(parser.urlencoded({extended: true}));

	app.enable("trust proxy");

	// headers
	app.set({
		"Access-Control-Allow-Origin": "*",
	});

	app.use(pino({
		logger,
	}));

	// setup routes
	app.use("/", router);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error("Not found");

		err.status = 404;
		next(err);
	});

	// error handler
	app.use((err, req, res, next) => {
		const status = err.status || 500;

		logger.error(JSON.stringify(err), "error next catch");

		res.status(status).json(handler.error(serverError.UNKNOWN, status));
	});

	return app;
};
