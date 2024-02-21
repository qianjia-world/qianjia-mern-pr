const Vote = require("../models/vote")
const HttpError = require("../models/http-error")

const getVotes = async (req, res, next) => {
	let votes
	try {
		votes = await Vote.find()
	} catch (error) {
		return next(
			new HttpError("Fetching votes failed, please try again later", 500)
		)
	}

	res.json({ votes: votes.map((vote) => vote.toObject({ getters: true })) })
}
const postVote = async (req, res, next) => {
	const { question, option } = req.body
	const createdVote = new Vote({
		question,
		option,
		result: {
			left: 0,
			right: 0
		}
	})

	try {
		await createdVote.save()
	} catch (error) {
		return next(
			new HttpError("Creating vote failed, please try again later", 500)
		)
	}

	res.status(200).json({ message: "新增成功" })
}
//admin才有權限更新題目，會員可以更新投票結果(+1票)
const patchVote = async (req, res, next) => {
	const { id } = req.params
	const { question, option, vote_result } = req.body

	if ((question || option) && req.authData.role !== "admin") {
		return next(new HttpError("Permission denied", 403))
	}

	let vote
	try {
		vote = await Vote.findById(id)
	} catch (error) {
		return next(
			new HttpError("Fetching vote failed, please try again later", 500)
		)
	}

	if (!vote) {
		return next(
			new HttpError("Could not find a vote for the provided id", 404)
		)
	}

	question && (vote.question = question)
	option && (vote.option = option)
	vote_result && (vote.result[vote_result] += 1)

	try {
		await vote.save()
	} catch (error) {
		return next(
			new HttpError("Updating vote failed, please try again later", 500)
		)
	}

	let message
	if (vote_result) {
		message = "投票成功"
	} else {
		message = "更新成功"
	}

	res.json({ message })
}
const deleteVote = async (req, res, next) => {
	const { id } = req.params

	let vote
	try {
		vote = await Vote.findById(id)
	} catch (error) {
		return next(
			new HttpError("Fetching vote failed, please try again later", 500)
		)
	}

	if (!vote) {
		return next(
			new HttpError("Could not find a vote for the provided id", 404)
		)
	}

	try {
		await vote.deleteOne()
	} catch (error) {
		return next(
			new HttpError("Deleting vote failed, please try again later", 500)
		)
	}

	res.json({ message: "刪除成功" })
}

exports.getVotes = getVotes
exports.postVote = postVote
exports.patchVote = patchVote
exports.deleteVote = deleteVote
