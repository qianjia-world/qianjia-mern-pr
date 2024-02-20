const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")
// 權限檢查分成五種：
// 1. 取，沒有沒關係(關係到給的資料詳細度)
// 2. 取，要是會員或admin才能操作
// 3. 取，要是本人或是admin才能操作
// 4. 取，只能是本人才能操作
// 5. 取，只有admin才能操作

const getAuth = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]

	if (!token) {
		return next()
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY)
		req.authData = {
			id: decodedToken.id,
			email: decodedToken.email,
			role: decodedToken.role
		}
		return next()
	} catch (error) {
		console.log(error)
		return next(new HttpError("Authentication failed", 401))
	}
}
const checkAuthMemberOrAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY)

		if (decodedToken.role !== "user" && decodedToken.role !== "admin") {
			return next(new HttpError("Permission denied,", 403))
		}

		req.authData = {
			id: decodedToken.id,
			email: decodedToken.email,
			role: decodedToken.role
		}

		return next()
	} catch (error) {
		console.log(error)
		return next(new HttpError("Authentication failed", 401))
	}
}
const checkAuthSelfOrAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}
	let token = req.headers.authorization?.split(" ")[1]

	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_KEY)
	} catch (error) {
		return next(
			new HttpError(error.message || "Authentication failed", 401)
		)
	}

	if (req.params.id !== decodedToken.id && decodedToken.role !== "admin") {
		return next(new HttpError("Permission denied,", 403))
	}

	req.authData = {
		id: decodedToken.id,
		email: decodedToken.email,
		role: decodedToken.role
	}

	return next()
}
const checkAuthSelf = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY)

		if (req.params.id !== decodedToken.id) {
			return next(new HttpError("Permission denied,", 403))
		}

		req.authData = {
			id: decodedToken.id,
			email: decodedToken.email,
			role: decodedToken.role
		}

		return next()
	} catch (error) {
		console.log(error)
		return next(new HttpError("Authentication failed", 401))
	}
}
const checkAuthAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY)

		if (decodedToken.role !== "admin") {
			return next(new HttpError("Permission denied,", 403))
		}

		req.authData = {
			id: decodedToken.id,
			email: decodedToken.email,
			role: decodedToken.role
		}

		return next()
	} catch (error) {
		console.log(error)
		return next(new HttpError("Authentication failed", 401))
	}
}

module.exports.getAuth = getAuth
module.exports.checkAuthMemberOrAdmin = checkAuthMemberOrAdmin
module.exports.checkAuthSelfOrAdmin = checkAuthSelfOrAdmin
module.exports.checkAuthSelf = checkAuthSelf
module.exports.checkAuthAdmin = checkAuthAdmin
