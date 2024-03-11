const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
	const totalPage = Math.ceil(total / limit)
	if (page > totalPage) {
		return next(new HttpError("Maximum number of pages exceeded", 400))
	}

	let users
	let sort = {}
	if (req.query.sort === "badges") {
		sort = { badges: -1 }
	}

	try {
		users = await User.find({})
			.select("name badges avatar")
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
		totalPage,
		total
	})
}

const getUserDetail = async (req, res, next) => {
	let userId = req.params.id
	if (userId == "myself") {
		userId = req.authData?.id
	}
	// 資料本人或admin才能看詳細資料
	// 一般使用者只能看name, badges, avatar
	let select
	if (req.authData?.userId !== userId && req.authData?.role !== "admin") {
		select = "name badges avatar"
	} else {
		select = "-password"
	}

	let user
	try {
		user = await User.findById(userId).select(select)
	} catch (error) {
		return next(
			new HttpError(
				"Fetching users for this id failed, please try again later.",
				500
			)
		)
	}

	if (!user) {
		return next(new HttpError("Could not find user for this id.", 404))
	}

	res.json({
		user: user.toObject({ getters: true })
	})
}

const signup = async (req, res, next) => {
	const { name, email, avatar, password, code } = req.body

	let existUser
	try {
		existUser = await User.findOne({ email })
	} catch (error) {
		return next(
			new HttpError("Fetching user failed, please try again later.", 500)
		)
	}

	if (existUser) {
		return next(new HttpError("Email has been registered", 409))
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(code, process.env.JWT_EMAIL_CODE)
	} catch (error) {
		if (error.message === "jwt expired") {
			return next(new HttpError("Authentication code expired", 401))
		}
		return next(new HttpError("Authentication failed", 401))
	}

	if (decodedToken?.email !== email) {
		return next(
			new HttpError("Authentication failed, code is not correct", 403)
		)
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (err) {
		const error = new HttpError(
			"Could not hashed password, please try again.",
			500
		)
		return next(error)
	}

	const createUser = new User({
		name,
		email,
		avatar,
		badges: 0,
		password: hashedPassword,
		role: "user"
	})

	try {
		await createUser.save()
	} catch (error) {
		return next(
			new HttpError("Signing up failed, please try again later.", 500)
		)
	}

	//取得detail，造token
	const token = jwt.sign(
		{
			id: createUser.id,
			email: createUser.email,
			role: createUser.role
		},
		process.env.JWT_KEY,
		{
			expiresIn: "1h"
		}
	)
	res.json({
		message: "註冊成功",
		token
	})
}

const getEmailCode = async (req, res, next) => {
	const { email } = req.body
	let user
	try {
		user = await User.findOne({ email })
	} catch (error) {
		return next(
			new HttpError("Fetching user failed, please try again later.", 500)
		)
	}

	if (user) {
		return next(new HttpError("Email has been used", 409))
	}

	const email_token = jwt.sign({ email }, process.env.JWT_EMAIL_CODE, {
		expiresIn: "1h"
	})

	//TODO: 寄信到郵箱

	res.json({
		message: "Email code 有效期限為1小時",
		email_token
	})
}

const login = async (req, res, next) => {
	const { email, password } = req.body
	let user
	try {
		user = await User.findOne({ email })
	} catch (error) {
		return next(
			new HttpError("Fetching user failed, please try again later.", 500)
		)
	}

	if (!user) {
		return next(new HttpError("Email has not been registered yet", 404))
	}

	let isValidPassword = false
	try {
		isValidPassword = await bcrypt.compare(password, user.password)
	} catch (err) {
		return next(
			new HttpError("Invalid password, please try again later", 500)
		)
	}

	if (!isValidPassword) {
		return next(new HttpError("Incorrect password", 401))
	}

	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			role: user.role
		},
		process.env.JWT_KEY,
		{
			expiresIn: "3h"
		}
	)

	res.json({
		message: "登入成功",
		id: user.id,
		token
	})
}

const patchUserDetail = async (req, res, next) => {
	let userId = req.params.id
	if (userId == "myself") {
		userId = req.authData?.id
	}

	const { name, email, avatar, password, new_password, code } = req.body

	let user
	try {
		user = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError(
				"Fetching users for this id failed, please try again later.",
				500
			)
		)
	}

	if (!user) {
		return next(new HttpError("Could not find user for this id.", 404))
	}
	// 如果是本人，要驗證密碼 + 要改email要密碼
	isValidPassword = false
	if ((new_password && req.authData.id === userId) || email) {
		try {
			isValidPassword = await bcrypt.compare(password, user.password)
		} catch (err) {
			return next(
				new HttpError("Invalid password, please try again later", 500)
			)
		}

		if (!isValidPassword) {
			return next(new HttpError("Incorrect password", 401))
		}
	}

	let hashedPassword
	if (new_password) {
		try {
			hashedPassword = await bcrypt.hash(new_password, 12)
		} catch (err) {
			const error = new HttpError(
				"Could not hashed password, please try again.",
				500
			)
			return next(error)
		}
	}

	if (email && req.authData.id === userId) {
		let existUser
		try {
			existUser = await User.findOne({ email })
		} catch (error) {
			return next(
				new HttpError(
					"Fetching user failed, please try again later.",
					500
				)
			)
		}

		if (existUser) {
			return next(new HttpError("Email has been used", 409))
		}

		let decodedToken
		try {
			decodedToken = jwt.verify(code, process.env.JWT_EMAIL_CODE)
		} catch (error) {
			if (error.message === "jwt expired") {
				return next(new HttpError("Authentication code expired", 401))
			}
			return next(new HttpError("Authentication failed", 401))
		}

		if (decodedToken?.email !== email) {
			return next(
				new HttpError("Authentication failed, code is not correct", 403)
			)
		}
	}

	if (name) user.name = name
	if (email) user.email = email
	if (avatar) user.avatar = avatar
	if (new_password) user.password = hashedPassword

	try {
		await user.save()
	} catch (error) {
		return next(
			new HttpError("Patchung user failed, please try again later.", 500)
		)
	}

	res.json({
		message: "已更新會員資料"
	})
}

exports.getUsers = getUsers
exports.getUserDetail = getUserDetail
exports.signup = signup
exports.getEmailCode = getEmailCode
exports.login = login
exports.patchUserDetail = patchUserDetail
