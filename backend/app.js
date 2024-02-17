const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const userRoutes = require("./routes/users-routes")
const functionRoutes = require("./routes/functions-routes")
// const gameRoutes = require("./routes/games-routes")
const uploadRoutes = require("./routes/upload-routes")
const webRoutes = require("./routes/web-routes")

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

// user
app.use("/api/v1/users", userRoutes)
// function: 列表 投票、占卜、websocket
app.use("/api/v1/functions", functionRoutes)
// Game
// app.use("/api/v1/games", gameRoutes)
// upload
app.use("/api/v1/upload", uploadRoutes)
// website: info contact
app.use("/api/v1/web", webRoutes)

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
