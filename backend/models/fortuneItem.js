const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const fortuneItemSchema = new Schema({})

fortuneItemSchema.plugin(uniqueValidator)
module.exports = mongoose.model("fortuneItem", fortuneItemSchema)
