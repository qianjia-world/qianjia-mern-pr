const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const { nextValidatorError } = require("../middleware/next-validator-error")
const { getAuth, checkAuthSelfOrAdmin } = require("../middleware/check-auth")

const usersControllers = require("../controllers/users-controllers")

router.get("/", usersControllers.getUsers)

router.get("/:id", getAuth, usersControllers.getUserDetail)

router.post(
	"/",
	[
		check("name").trim().not().isEmpty().withMessage("Name is required"),
		check("email").isEmail().withMessage("Invalid email"),
		check("avatar").isNumeric().withMessage("Avatar must be a number"),
		check("password")
			.isAlphanumeric()
			.withMessage("Password must be alphanumeric")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters long")
			.custom((value, { req, loc, path }) => {
				return value === req.body.confirm_password
			})
			.withMessage("Password must match with confirm password"),
		check("code").not().isEmpty().withMessage("Code is required")
	],
	nextValidatorError,
	usersControllers.signup
)

router.post(
	"/emailCode",
	[check("email").isEmail().withMessage("Invalid email")],
	nextValidatorError,
	usersControllers.getEmailCode
)

router.post(
	"/login",
	[
		check("email").isEmail().withMessage("Invalid email"),
		check("password")
			.isAlphanumeric()
			.withMessage("Password must be alphanumeric")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters long")
	],
	nextValidatorError,
	usersControllers.login
)

router.patch(
	"/:id",
	checkAuthSelfOrAdmin,
	[
		check("name")
			.optional()
			.trim()
			.not()
			.isEmpty()
			.withMessage("Name con not set empty value"),
		check("email")
			.optional()
			.isEmail()
			.withMessage("Invalid email")
			.custom((value, { req, loc, path }) => {
				return !!req.body.password
			})
			.withMessage("Password is required when email exists"),

		check("avatar")
			.optional()
			.isNumeric()
			.withMessage("Avatar must be a number"),
		check("password")
			.optional()
			.isAlphanumeric()
			.withMessage("Password must be alphanumeric")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters long")
			.custom((value, { req, loc, path }) => {
				return value !== req.body.new_password
			})
			.withMessage("Password can not match with old new password"),
		check("new_password")
			.optional()
			.isAlphanumeric()
			.withMessage("Password must be alphanumeric")
			.isLength({ min: 4 })
			.withMessage("Password must be at least 4 characters long")
			.custom((value, { req, loc, path }) => {
				return value !== req.body.password
			})
			.withMessage("New password can not match with old password")
			.custom((value, { req, loc, path }) => {
				return !!req.body.password
			})
			.withMessage("Password is required when new_password exists"),
		check("code")
			.custom((value, { req, loc, path }) => {
				if (req.body.email) {
					if (!value) {
						return false
					}
				}
				return true
			})
			.withMessage("code is required when email exists")
	],
	nextValidatorError,
	usersControllers.patchUserDetail
)

module.exports = router
