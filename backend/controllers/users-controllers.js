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

const getUserDetail = async (req, res, next) => {}
const signup = async (req, res, next) => {}
const login = async (req, res, next) => {}
const logout = async (req, res, next) => {}
const putUserDetail = async (req, res, next) => {}

exports.getUsers = getUsers
exports.getUserDetail = getUserDetail
exports.signup = signup
exports.login = login
exports.logout = logout
exports.putUserDetail = putUserDetail