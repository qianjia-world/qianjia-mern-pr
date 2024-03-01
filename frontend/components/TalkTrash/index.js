"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useImmer } from "use-immer";
import { useHttpClient } from "@/hooks/http-hook";

import Wrap from "@/components/shared/Wrap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResultDialog } from "../shared/ApiResultDialog";

const themeList = [
  {
    theme: "engineer",
    bg: "/talkTrash/bg-engineer.webp",
    bgAlt: "a background of engineer talk trash",
    title: "輸入你聽過的工程師幹話:",
  },
  {
    theme: "pua",
    bg: "/talkTrash/bg-pua.webp",
    bgAlt: "a background of pua talk trash",
    title: "輸入你聽過的PUA幹話:",
  },
  {
    theme: "quote",
    bg: "/talkTrash/bg-quote.webp",
    bgAlt: "a background of quote",
    title: "輸入你覺得美麗的文字:",
  },
];
export default function TechTalkTrash() {
  const [theme, setTheme] = useState("engineer");
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();
  const [word, setWord] = useImmer({
    left: "",
    right: "",
    bottom: "",
  });
  const [submitMsg, setSubmitMsg] = useState("");

  async function handleOnClick(type) {
    if (word[type]) return;

    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/fortunes/${theme}/result?not_msg=true`,
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
    }, 1500);
  }

  function handleOnSubmit() {
    if (!submitMsg) return;
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/fortunes/${theme}`,
      method: "POST",
      body: JSON.stringify({
        result: submitMsg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestData);
    setSubmitMsg("");
  }

  function handleOnChangeTheme(theme) {
    setTheme(theme);
  }

  const title = themeList.find((item) => item.theme === theme).title;

  return (
    <Wrap>
      <ApiResultDialog
        title="API訊息"
        content={apiMsg}
        onOpenChange={clearApiMsg}
      />
      <section className="relative min-h-page ">
        {themeList.map((item) => {
          return (
            <Image
              key={item.theme}
              src={item.bg}
              fill
              alt={item.bgAlt}
              className={cn(
                "object-cover opacity-0 transition-opacity duration-300",
                {
                  "opacity-100": theme === item.theme,
                },
              )}
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          );
        })}
        <div className="absolute grid h-full w-full grid-cols-1 grid-rows-1 sm:w-1/2 sm:translate-x-1/2 sm:grid-cols-2 sm:grid-rows-2">
          <div
            className="relative hidden sm:block"
            onClick={() => handleOnClick("left")}
            onMouseEnter={() => handleOnClick("left")}
          >
            <div
              className={cn(
                "absolute right-2/4 top-1/2 min-h-8 w-60 rounded-md bg-stone-900 p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-100": word.left,
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
                "absolute left-2/4 top-1/2 w-60 rounded-md bg-stone-900 p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-100": word.right,
                },
              )}
            >
              {word.right}
            </div>
          </div>

          <div
            className="relative sm:col-span-2"
            onClick={() => handleOnClick("bottom")}
            onMouseEnter={() => handleOnClick("bottom")}
          >
            <div
              className={cn(
                "absolute bottom-1/4 left-1/2 w-60 -translate-x-1/2 translate-y-1/2 rounded-md bg-stone-900 p-2 text-white opacity-0 transition-opacity duration-300",
                {
                  "opacity-100": word.bottom,
                },
              )}
            >
              {word.bottom}
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2  min-w-60 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-white bg-primary p-4">
          <h4 className="block pb-4 text-center">{title}</h4>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="輸入文字..."
              value={submitMsg}
              onChange={(e) => setSubmitMsg(e.target.value)}
            />
            <Button type="submit" onClick={handleOnSubmit}>
              送出
            </Button>
          </div>
        </div>
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col justify-center gap-y-2">
          {themeList.map((item, index) => {
            return (
              <Button
                className={cn("h-2 w-2 hover:bg-primary", {
                  "bg-primary": theme === item.theme,
                })}
                onClick={() => handleOnChangeTheme(item.theme)}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </section>
    </Wrap>
  );
}
