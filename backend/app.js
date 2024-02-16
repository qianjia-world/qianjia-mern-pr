const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const userRoutes = require("./routes/users-routes")

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")

	next()
})

app.use("/api/v1/users", userRoutes)

// Error handling middleware
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error)
	}
	res.status(error.code || 500)
	res.json({ message: error.message || "An unknown error occurred!" })
})

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-qianjia.jrqb7ii.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log("Connected to database!")
		app.listen(5001)
	})
	.catch((err) => {
		console.log(err)
		console.log("Connected to DB failed")
		app.listen(5001)
	})
