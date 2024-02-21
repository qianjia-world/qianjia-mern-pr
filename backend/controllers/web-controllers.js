const HttpError = require("../models/http-error")

const Web = require("../models/web")
const Contact = require("../models/contact")

const getInfo = async (req, res, next) => {
	let webInfo
	try {
		webInfo = await Web.findOne({ name: "info" })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching web info failed, please try again later.",
				500
			)
		)
	}
	res.json({
		data: webInfo.toObject({ getters: true })
	})
}
const postContact = async (req, res, next) => {
	const { title, content, email } = req.body
	let contact
	contact = new Contact({
		title,
		content,
		email
	})

	try {
		await contact.save()
	} catch (error) {
		return next(
			new HttpError(
				"Fetching contact failed, please try again later.",
				500
			)
		)
	}

	res.json({
		massage: "已發送訊息！"
	})
}

exports.getInfo = getInfo
exports.postContact = postContact
