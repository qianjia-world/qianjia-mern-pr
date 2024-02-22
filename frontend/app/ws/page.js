"use client"
import React, { useState } from "react"

let ws
function Page() {
	const [msg, setMsg] = useState(null)

	function connect() {
		console.log("[click connect]")
		// Create WebSocket connection
		ws = new WebSocket("ws://localhost:8080")
		// 在開啟連線時執行
		ws.onopen = () => console.log("[open connection]")
		ws.onmessage = (event) => console.log("[send message]", event.data)
	}

	function disconnect() {
		console.log("[click disconnect]")
		ws.close()
		// 在關閉連線時執行
		ws.onclose = () => console.log("[close connection]")
	}

	function sendMessage(msg) {
		console.log("[click send]")
		ws.send(msg)
	}
	return (
		<div className='bg-white w-full h-screen text-black'>
			<h1>WS</h1>
			<button
				className='py-2 px-4 m-1 bg-yellow-200 border-2 rounded-md'
				onClick={connect}
			>
				Connect
			</button>
			<button
				className='py-2 px-4 m-1 bg-yellow-200 border-2 rounded-md'
				onClick={disconnect}
			>
				Disconnect
			</button>
			<input
				className='border-2 rounded-md h-[40px]'
				type='text'
				id='sendMsg'
				onChange={(e) => {
					console.log(e.target.value)
					setMsg(e.target.value)
				}}
			/>
			<button
				className='py-2 px-4 m-1 bg-yellow-200 border-2 rounded-md'
				onClick={sendMessage}
			>
				Send
			</button>
		</div>
	)
}

export default Page
