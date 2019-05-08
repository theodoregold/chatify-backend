const Redis = require("ioredis");

const CONFIG = require("../../env");

const redis = new Redis(CONFIG.redis);



module.exports = redis;
