const mongoose = require("mongoose")

const Schema = mongoose.Schema

const voteSchema = new Schema({
	question: { type: String, required: true },
	option: {
		left: { type: String, required: true },
		right: { type: String, required: true }
	},
	result: {
		left: { type: Number, required: true },
		right: { type: Number, required: true }
	}
})

module.exports = mongoose.model("Vote", voteSchema)
