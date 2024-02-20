const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")
// 權限檢查分成四種：
// 1. 取，沒有沒關係(關係到給的資料詳細度)，驗證失敗跳過就好
// 2. 取，要是會員或admin才能操作
// 3. 取，要是本人或是admin才能操作
// 4. 取，只有admin才能操作

const getAuth = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next()
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(code, process.env.JWT_KEY)
	} catch (error) {
		return next()
	}

	req.authData = {
		id: decodedToken.id,
		email: decodedToken.email,
		role: decodedToken.role
	}

	return next()
}

const checkAuthMemberOrAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_KEY)
	} catch (error) {
		if (error.message === "jwt expired") {
			return next(new HttpError("Authentication token expired", 401))
		}
		return next(new HttpError("Authentication failed", 401))
	}

	if (decodedToken.role !== "user" && decodedToken.role !== "admin") {
		return next(new HttpError("Permission denied,", 403))
	}

	req.authData = {
		id: decodedToken.id,
		email: decodedToken.email,
		role: decodedToken.role
	}

	return next()
}

const checkAuthSelfOrAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_KEY)
	} catch (error) {
		if (error.message === "jwt expired") {
			return next(new HttpError("Authentication token expired", 401))
		}
		return next(new HttpError("Authentication failed", 401))
	}

	if (decodedToken.id !== req.params.id && decodedToken.role !== "admin") {
		return next(new HttpError("Permission denied,", 403))
	}

	req.authData = {
		id: decodedToken.id,
		email: decodedToken.email,
		role: decodedToken.role
	}

	return next()
}

const checkAuthAdmin = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}

	const token = req.headers.authorization?.split(" ")[1]
	if (!token) {
		return next(new HttpError("Unauthorized,", 401))
	}

	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_KEY)
	} catch (error) {
		if (error.message === "jwt expired") {
			return next(new HttpError("Authentication token expired", 401))
		}
		return next(new HttpError("Authentication failed", 401))
	}

	if (decodedToken.role !== "admin") {
		return next(new HttpError("Permission denied,", 403))
	}

	req.authData = {
		id: decodedToken.id,
		email: decodedToken.email,
		role: decodedToken.role
	}

	return next()
}

module.exports.getAuth = getAuth
module.exports.checkAuthMemberOrAdmin = checkAuthMemberOrAdmin
module.exports.checkAuthSelfOrAdmin = checkAuthSelfOrAdmin
module.exports.checkAuthAdmin = checkAuthAdmin
