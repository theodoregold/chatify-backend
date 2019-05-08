const express = require("express");

// controllers
const auth = require("../controllers/auth");

// schemas
const AuthSchema = require("../schemas/auth");

// middleware
const validate = require("../middleware/validate");



const router = express.Router();

router
	.post("/auth/signup", [validate(AuthSchema.signup)], auth.signup);



module.exports = router;
