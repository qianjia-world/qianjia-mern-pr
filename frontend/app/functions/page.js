"use client";
import Image from "next/image";
import MenuDatas from "@/constant/menuData";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
export default function Functions() {
  const [target, setTarget] = useState(0);
  const data = MenuDatas[2].children;
  const slider = data.map((item, index) => {
    return (
      <li
        className={cn(
          "h-90 relative z-20 w-60 flex-shrink-0 rounded-xl bg-pink-800 transition-all duration-500",
          {
            "absolute left-1/2 top-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2":
              index === target,
          },
        )}
      >
        <Image
          src={`${item.image}`}
          fill
          priority
          className={cn("rounded-xl bg-white object-cover ", {
            "rounded-none": index === target,
          })}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className={cn(
            "absolute left-1/4 top-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-primary p-3 text-black opacity-0",
            {
              "opacity-100": index === target,
            },
          )}
        >
          <h3 className="pb-4 text-center font-[500]">{item.title}</h3>
          <p className="pb-2 leading-6">{item.description}</p>
          <button className="mx-auto block rounded-md bg-black p-2  text-white">
            <Link href={item.href}>瞭解更多</Link>
          </button>
        </div>
      </li>
    );
  });
  function handleOnClick(newTarget) {
    if (newTarget < 0) {
      setTarget(data.length - 1);
    } else if (newTarget >= data.length) {
      setTarget(0);
    } else {
      setTarget(newTarget);
    }
  }
  return (
    <div className="relative overflow-hidden bg-primary">
      <div className="mx-auto grid  h-[600px] min-h-page max-w-screen-2xl grid-cols-2 items-center">
        <div>文字區</div>
        {/* 輪播 */}
        <ul className="flex flex-nowrap gap-x-5">{slider}</ul>
      </div>

      {/* {按鈕} */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 justify-center gap-x-2">
        <button
          className="relative h-16 w-16"
          onClick={() => handleOnClick(target + 1)}
        >
          <Image
            src={"/loading.gif"}
            fill
            alt={"website info"}
            priority
            className="rounded-full bg-white object-cover "
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </button>
        <button
          className="relative h-16 w-16"
          onClick={() => handleOnClick(target - 1)}
        >
          <Image
            src={"/loading.gif"}
            fill
            alt={"website info"}
            priority
            className="-scale-x-100 rounded-full bg-white object-cover "
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </button>
      </div>
    </div>
  );
}
