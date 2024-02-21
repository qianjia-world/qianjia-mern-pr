const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema
const childSchema = new Schema({
	image: { type: String },
	result: { type: String, required: true }
})

const fortuneSchema = new Schema({
	type: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	list: [childSchema]
})

fortuneSchema.plugin(uniqueValidator)
module.exports = mongoose.model("fortune", fortuneSchema)
