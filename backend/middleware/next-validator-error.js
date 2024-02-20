const { validationResult } = require("express-validator")
const nextValidatorError = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400).json({
			message: errors.array() || "An unknown error occurred!"
		})
	}
	next()
}

exports.nextValidatorError = nextValidatorError
