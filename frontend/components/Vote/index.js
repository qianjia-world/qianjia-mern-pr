"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

import { useHttpClient } from "@/hooks/http-hook";
import Wrap from "@/components/shared/Wrap";

export default function Vote() {
  const [votes, setVotes] = useState([]);
  const [isResult, setIsResult] = useState(false);
  const { sendRequest } = useHttpClient();
  const [springs, api] = useSpring(() => ({
    from: { width: "50%" },
  }));
  const [isInit, setIsInit] = useState(true);
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const responseData = await sendRequest({
          url: `${process.env.NEXT_PUBLIC_API}/functions/votes`,
        });
        setVotes(responseData.votes);
        setIsInit(false);
      } catch (err) {}
    };

    fetchVotes();
  }, [sendRequest]);

  const handleClick = (result) => {
    const newVotes = [...votes];
    newVotes[0].result[result]++;

    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/votes/${votes[0].id}`,
      method: "PATCH",
      body: JSON.stringify({
        vote_result: result,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestData);

    setVotes(newVotes);

    const resultWidth = Math.floor(
      (newVotes[0].result.left /
        (newVotes[0].result.left + newVotes[0].result.right)) *
        100,
    );

    api.start({
      to: { width: `${resultWidth}%` },
    });

    setIsResult(true);

    setTimeout(() => {
      setIsResult(false);
      setVotes((prevVotes) => {
        const newVotes = [...prevVotes];
        newVotes.shift();
        return newVotes;
      });
      api.start({
        to: { width: `50%` },
      });
    }, 1000);
  };

  return (
    <>
      <Wrap className="m-2 rounded-md bg-gradient-to-r from-yellow-300 to-yellow-400">
        <section className="flex min-h-page h-full flex-col p-7 text-center">
          <h4 className="mb-4 underline underline-offset-4 subpixel-antialiased ">
            {isInit && "問題載入中"}
            {votes.length > 0 && votes[0].question}
            {votes.length === 0 && !isInit && "題目都回答完囉，沒有更多題目了"}
          </h4>

          {votes.length > 0 && isResult && (
            <span className="mb-4 text-xl">
              {votes[0].result.left}:{votes[0].result.right}
            </span>
          )}

          <div className="mb-4 rounded-[8px] bg-sky-200">
            <animated.div
              className="h-5 bg-red-200"
              style={{
                ...springs,
              }}
            />
          </div>

          <div className="flex h-full flex-1 gap-x-1 divide-primary">
            <button
              className="w-1/2 rounded-l-md bg-white hover:bg-red-200"
              disabled={isResult || votes.length === 0}
              onClick={() => handleClick("left")}
            >
              {votes.length > 0 ? (
                votes[0].option.left
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={"/cat-box.gif"}
                    fill
                    alt="qianjia web logo, a cat drinks"
                    priority
                    className="rounded-md object-cover"
                    sizes="10vw"
                  />
                </div>
              )}
            </button>
            <button
              className="w-1/2 rounded-r-md bg-white hover:bg-sky-200"
              onClick={() => handleClick("right")}
              disabled={isResult || votes.length === 0}
            >
              {isInit && "努力加載中..."}
              {votes.length > 0 && votes[0].option.right}
              {votes.length === 0 && !isInit && "感謝你的回答～"}
            </button>
          </div>
        </section>
      </Wrap>
    </>
  );
}
