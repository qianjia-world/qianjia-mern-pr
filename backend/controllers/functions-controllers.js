const HttpError = require("../models/http-error")
const Web = require("../models/web")

const getFunctions = async (req, res, next) => {
	let webInfo
	try {
		webInfo = await Web.findOne({ name: "info" }).select("functions")
	} catch (error) {
		return next(
			new HttpError(
				"Fetching web info failed, please try again later.",
				500
			)
		)
	}
	res.json({
		data: webInfo.toObject({ getters: true }).functions
	})
}

exports.getFunctions = getFunctions
