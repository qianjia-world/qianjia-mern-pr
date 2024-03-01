"use client";
import React, { useState } from "react";
import { useImmer } from "use-immer";
import { cn } from "@/lib/utils";
import Wrap from "@/components/shared/Wrap";

export default function WSComponment() {
  const [chat, setChat] = useImmer([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [ws, setWs] = useState(null);

  function open() {
    console.log("[open connection]");
  }

  function onmessage(event) {
    console.log("[send message]", event.data);
    setChat((draft) => {
      draft.push(event.data);
    });
  }

  function onclose() {
    console.log("[close connection]");
  }

  function connect() {
    if (ws) {
      alert("已連線");
    } else {
      let ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => open();
      ws.onmessage = (event) => onmessage(event);
      ws.onclose = () => onclose();
      setWs(ws);
    }
  }

  function close() {
    if (ws) {
      ws.close();
      setWs(null);
    }
  }

  function sendMessage() {
    if (ws) {
      let data = {
        name,
        msg,
      };
      ws.send(JSON.stringify(data));
    } else {
      alert("未連線");
    }
  }
  return (
    <Wrap>
      <div className="h-page flex w-full flex-col items-stretch justify-stretch gap-y-2 bg-white px-2 py-2 text-black">
        <h2 className="pb-1 text-center">WS sample1</h2>
        <div className="flex-1 gap-y-1 overflow-y-scroll rounded-md bg-primary p-2">
          {chat.map((item, index) => {
            return (
              <p className="" key={index}>
                {item}
              </p>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className={cn("h-10 rounded-md border-2 bg-yellow-200 px-4 py-2", {
              hidden: ws,
            })}
            onClick={connect}
          >
            connect
          </button>
          <button
            className={cn("h-10 rounded-md border-2 bg-yellow-200 px-4 py-2", {
              hidden: !ws,
            })}
            onClick={close}
          >
            close
          </button>
          <input
            className={cn("h-10 w-80 rounded-md border-2", {
              hidden: !ws,
            })}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="請輸入姓名"
          />
          <input
            className={cn("h-10 w-80 rounded-md border-2", {
              hidden: !ws,
            })}
            type="text"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            value={msg}
            placeholder="輸入訊息"
          />
          <button
            className={cn("h-10 rounded-md border-2 bg-yellow-200 px-4 py-2", {
              hidden: !ws,
            })}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </Wrap>
  );
}
