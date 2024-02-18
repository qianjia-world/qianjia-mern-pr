const User = require("../models/user")
const HttpError = require("../models/http-error")

const getUsers = async (req, res, next) => {
	const page = req.query.page ? parseInt(req.query.page) : 1

	if (isNaN(page)) {
		return next(new HttpError("Invalid page query, not a number", 400))
	}

	let total
	try {
		total = await User.countDocuments()
	} catch (error) {
		return next(
			new HttpError(
				"Fetching users count failed, please try again later.",
				500
			)
		)
	}

	const limit = 10
	if (page > Math.ceil(total / limit)) {
		return next(new HttpError("Maximum number of pages exceeded", 400))
	}

	let users
	let sort = {}
	if (req.query.sort === "badges") {
		sort = { badges: -1 }
	}

	try {
		users = await User.find({}, "-password -email")
			.skip((page - 1) * limit)
			.limit(limit)
			.sort(sort)
	} catch (error) {
		return next(
			new HttpError("Fetching users failed, please try again later.", 500)
		)
	}

	res.json({
		users: users.map((user) => user.toObject({ getters: true })),
		totalPage: Math.ceil(total / limit),
		total
	})
}

const getUserDetail = async (req, res, next) => {
	const userId = req.params.id

	// 確定他是本人 或 admin帳號
}
const signup = async (req, res, next) => {}
const login = async (req, res, next) => {}
const logout = async (req, res, next) => {}
const patchUserDetail = async (req, res, next) => {}

exports.getUsers = getUsers
exports.getUserDetail = getUserDetail
exports.signup = signup
exports.login = login
exports.logout = logout
exports.patchUserDetail = patchUserDetail
