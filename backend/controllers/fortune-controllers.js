const HttpError = require("../models/http-error")
const fortune = require("../models/fortune")

const getTypes = async (req, res, next) => {
	let types
	try {
		types = await fortune.find().select("type name")
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	res.json({ data: types })
}

const getResult = async (req, res, next) => {
	const { type } = req.params

	let typeData
	try {
		typeData = await fortune.findOne({ type })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	if (!typeData) {
		return next(new HttpError("Invalid type query.", 400))
	}

	if (typeData.list.length === 0) {
		return next(new HttpError("No item in this type.", 400))
	}

	const randomIndex = Math.floor(Math.random() * typeData.list.length)

	res.json({ data: typeData.list[randomIndex] })
}

const getTypeItems = async (req, res, next) => {
	const { type } = req.params

	let typeData
	try {
		typeData = await fortune.findOne({ type })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	if (!typeData) {
		return next(new HttpError("Invalid type query.", 400))
	}

	res.json({ data: typeData.list })
}

const postTypes = async (req, res, next) => {
	const { type, name } = req.body

	const newType = new fortune({
		type,
		name,
		list: []
	})

	try {
		await newType.save()
	} catch (error) {
		const err = new HttpError(
			"Fetching fortune failed, please try again later.",
			500
		)
		return next(err)
	}

	res.json({ message: "新增類型成功" })
}

const postTypeItem = async (req, res, next) => {
	const { type } = req.params
	const { image, result } = req.body

	let typeData
	try {
		typeData = await fortune.findOne({ type })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	if (!typeData) {
		return next(new HttpError("Invalid type query.", 400))
	}

	const newItem = {
		image,
		result
	}

	typeData.list.push(newItem)

	try {
		await typeData.save()
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	res.json({ message: "新增項目成功" })
}

const patchTypeItem = async (req, res, next) => {
	const { type, id } = req.params
	const { image, result } = req.body

	let typeData
	try {
		typeData = await fortune.findOne({ type })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	if (!typeData) {
		return next(new HttpError("Invalid type query.", 400))
	}

	if (!typeData.list.id(id)) {
		return next(new HttpError("Invalid id query.", 400))
	}

	image && (typeData.list.id(id).image = image)
	result && (typeData.list.id(id).result = result)

	try {
		await typeData.save()
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	res.json({ message: "修改項目成功" })
}

const deleteTypeItem = async (req, res, next) => {
	const { type, id } = req.params

	let typeData
	try {
		typeData = await fortune.findOne({ type })
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	if (!typeData) {
		return next(new HttpError("Invalid type query.", 400))
	}

	if (!typeData.list.id(id)) {
		return next(new HttpError("Invalid id query.", 400))
	}

	typeData.list.id(id).deleteOne()

	try {
		await typeData.save()
	} catch (error) {
		return next(
			new HttpError(
				"Fetching fortune failed, please try again later.",
				500
			)
		)
	}

	res.json({ message: "刪除項目成功" })
}

exports.getTypes = getTypes
exports.getResult = getResult
exports.getTypeItems = getTypeItems
exports.postTypes = postTypes
exports.postTypeItem = postTypeItem
exports.patchTypeItem = patchTypeItem
exports.deleteTypeItem = deleteTypeItem
