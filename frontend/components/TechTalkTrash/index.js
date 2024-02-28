"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useImmer } from "use-immer";
import { useHttpClient } from "@/hooks/http-hook";
import Wrap from "@/components/shared/Wrap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ApiResultDialog } from "../shared/ApiResultDialog";
export default function TechTalkTrash() {
  const [word, setWord] = useImmer({
    left: "",
    right: "",
    bottom: "",
  });
  const [submitMsg, setSubmitMsg] = useState("");
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();

  async function handleOnClick(type) {
    if (word[type]) return;

    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/fortunes/engineer/result?not_msg=true`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const responseData = await sendRequest(requestData);
    setWord((draft) => {
      draft[type] = responseData.data.result;
    });
    setTimeout(() => {
      setWord((draft) => {
        draft[type] = "";
      });
    }, 1000);
  }

  function handleOnSubmit() {
    if (!submitMsg) return;
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/fortunes/engineer`,
      method: "POST",
      body: JSON.stringify({
        result: submitMsg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestData);
  }

  return (
    <Wrap>
      <ApiResultDialog
        title="API訊息"
        content={apiMsg}
        onOpenChange={clearApiMsg}
      ></ApiResultDialog>
      <section className="relative h-96 ">
        <Image
          src={"/techTalkTrash/bg.webp"}
          fill
          alt={"a background of tech talk trash"}
          priority
          className="rounded-md object-cover "
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute grid h-full w-full grid-cols-1 grid-rows-1 sm:w-1/2 sm:translate-x-1/2 sm:grid-cols-2 sm:grid-rows-2">
          <div
            className="relative hidden sm:block"
            onClick={() => handleOnClick("left")}
            onMouseEnter={() => handleOnClick("left")}
          >
            <div
              className={cn(
                "absolute right-2/4 top-1/2 min-h-8 w-60 rounded-md bg-primary p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-80": word.left,
                },
              )}
            >
              {word.left}
            </div>
          </div>

          <div
            className="relative hidden sm:block"
            onClick={() => handleOnClick("right")}
            onMouseEnter={() => handleOnClick("right")}
          >
            <div
              className={cn(
                "absolute left-2/4 top-1/2 w-60 rounded-md bg-primary p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-80": word.right,
                },
              )}
            >
              {word.right}
            </div>
          </div>

          <div
            className="relativ sm:col-span-2"
            onClick={() => handleOnClick("bottom")}
            onMouseEnter={() => handleOnClick("bottom")}
          >
            <div
              className={cn(
                "absolute bottom-1/4 left-1/2 w-60 -translate-x-1/2 translate-y-1/2 rounded-md bg-primary p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-80": word.bottom,
                },
              )}
            >
              {word.bottom}
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2  min-w-60 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-white bg-primary p-4">
          <h4 className="block pb-4 text-center">輸入你聽過的工程師幹話:</h4>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="耶嘿"
              value={submitMsg}
              onChange={(e) => setSubmitMsg(e.target.value)}
            />
            <Button type="submit" onClick={handleOnSubmit}>
              送出
            </Button>
          </div>
        </div>
      </section>
    </Wrap>
  );
}
