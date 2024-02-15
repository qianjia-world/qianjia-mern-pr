const User = require("../models/user")
const HttpError = require("../models/http-error")

const getUsers = async (req, res, next) => {
	let users
	try {
		users = await User.find({}, "-password")
	} catch (error) {
		return next(
			new HttpError("Fetching users failed, please try again later.", 500)
		)
	}
	res.json({ users: users.map((user) => user.toObject({ getters: true })) })
}

exports.getUsers = getUsers
