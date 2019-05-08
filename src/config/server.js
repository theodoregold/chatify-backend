const http = require("http");



module.exports = (app) => {
	return http.createServer(app);
};
