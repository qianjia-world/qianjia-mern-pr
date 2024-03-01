const express = require("express")
const ServerSocket = require("ws").Server

const PORT = 8080

const server = express().listen(PORT, () =>
	console.log(`[Server] Listening on https://localhost:${PORT}`)
)

const wss = new ServerSocket({ server })

wss.on("connection", (ws) => {
	console.log("[Client connected]")

	ws.on("message", (data) => {
		data = JSON.parse(data)

		let clients = wss.clients
		clients.forEach((client) => {
			client.send(`${data.name}:${data.msg}`)
		})
	})

	ws.on("close", () => {
		console.log("Close connected")
	})
})
