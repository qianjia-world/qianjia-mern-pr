const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { nextValidatorError } = require("../middleware/next-validator-error")

const webControllers = require("../controllers/web-controllers")

router.get("/info", webControllers.getInfo)
router.post(
	"/contact",
	[
		check("title").not().isEmpty().withMessage("Title is required"),
		check("content").not().isEmpty().withMessage("Content is required"),
		check("email").optional().isEmail().withMessage("Invalid email")
	],
	nextValidatorError,
	webControllers.postContact
)

module.exports = router
