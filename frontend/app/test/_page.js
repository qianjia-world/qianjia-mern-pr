"use client";
import React, { useEffect, useState } from "react";
export default function Home() {
  const [second, setSecond] = useState(3);
  const [timeId, setTimeId] = useState(null);

  async function handleStartCalcuteSecond() {
    const id = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
    setTimeId(id);
  }

  useEffect(() => {
    console.log("second", second);
    if (second === 0) {
      clearInterval(timeId);
      setTimeId(null);
    }
  }, [second]);
  return (
    <>
      時間：{second}
      <button onClick={handleStartCalcuteSecond}>開始計時</button>
    </>
  );
}
