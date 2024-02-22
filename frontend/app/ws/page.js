"use client";
import React, { useState } from "react";

let ws;
function Page() {
  const [msg, setMsg] = useState(null);

  function connect() {
    console.log("[click connect]");
    // Create WebSocket connection
    ws = new WebSocket("ws://localhost:8080");
    // 在開啟連線時執行
    ws.onopen = () => console.log("[open connection]");
    ws.onmessage = (event) => console.log("[send message]", event.data);
  }

  function disconnect() {
    console.log("[click disconnect]");
    ws.close();
    // 在關閉連線時執行
    ws.onclose = () => console.log("[close connection]");
  }

  function sendMessage(msg) {
    console.log("[click send]");
    ws.send(msg);
  }
  return (
    <div className="h-screen w-full bg-white text-black">
      <h1>WS</h1>
      <button
        className="m-1 rounded-md border-2 bg-yellow-200 px-4 py-2"
        onClick={connect}
      >
        Connect
      </button>
      <button
        className="m-1 rounded-md border-2 bg-yellow-200 px-4 py-2"
        onClick={disconnect}
      >
        Disconnect
      </button>
      <input
        className="h-[40px] rounded-md border-2"
        type="text"
        id="sendMsg"
        onChange={(e) => {
          console.log(e.target.value);
          setMsg(e.target.value);
        }}
      />
      <button
        className="m-1 rounded-md border-2 bg-yellow-200 px-4 py-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default Page;
