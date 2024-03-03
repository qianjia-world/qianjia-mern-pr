const { validationResult } = require("express-validator")
const nextValidatorError = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		let message = errors
			.array()
			.map((error) => error.msg)
			.join(",")
		res.status(400).json({
			message: message || "An unknown error occurred!"
		})
	} else {
		next()
	}
}

exports.nextValidatorError = nextValidatorError
