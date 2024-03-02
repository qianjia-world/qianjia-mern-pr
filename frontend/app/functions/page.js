"use client";
import { useRef, useEffect } from "react";
import { useImmer } from "use-immer";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MenuDatas from "@/constant/menuData";

export default function Functions() {
  const [data, setData] = useImmer(MenuDatas[2].children);
  let ref = useRef();

  useEffect(() => {
    function handleMouseMove(e) {
      let x = e.clientX;
      let y = e.clientY;
      ref.current.style.display = "block";
      ref.current.style.left = x + "px";
      ref.current.style.top = y + -60 + "px";
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function handleOnClick(e, index) {
    e.stopPropagation();
    if (index === 1) {
      setData((draft) => {
        draft.push(draft.at(0));
        draft.shift(draft[0]);
      });
    } else {
      setData((draft) => {
        draft.unshift(draft.at(index));
        draft.splice(index + 1, 1);
      });
    }
  }

  return (
    <div
      className="relative cursor-pointer overflow-hidden"
      onClick={(e) => handleOnClick(e, 1)}
    >
      {/* 背景圖 */}
      <Image
        src={`${data[0].image}`}
        fill
        priority
        alt="functions bg"
        className={cn("bg-white object-cover ")}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      {/* 左側說明文字 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute left-1/4 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-primary p-3 text-black lg:w-1/4",
        )}
      >
        <h3 className="pb-4 text-center font-[500]">{data[0].title}</h3>
        <p className="hidden pb-2 leading-6 sm:block">{data[0].description}</p>
        <button
          className="mx-auto block rounded-md bg-black p-2 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={data[0].href}>瞭解更多</Link>
        </button>
      </div>

      {/* 右側輪播圖 */}
      <div className="mx-auto grid  h-[600px] min-h-page max-w-screen-2xl grid-cols-2 items-center">
        {/* 純空for排版 */}
        <div></div>
        {/* 輪播 */}
        <ul className="flex flex-nowrap gap-x-5">
          {data.map((item, index) => {
            return (
              <li
                key={item.title}
                onClick={(e) => handleOnClick(e, index)}
                className={cn(
                  "relative h-96 w-60 flex-shrink-0 cursor-pointer rounded-xl bg-pink-800 transition-all duration-200",
                  {
                    "w-0 opacity-0": index === 0,
                  },
                )}
              >
                <Image
                  src={`${item.image}`}
                  fill
                  priority
                  alt={"functions bg"}
                  className={cn("rounded-xl bg-white object-cover ")}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* {鼠標圖片} */}
      <Image
        ref={ref}
        src={"/loading.gif"}
        width={50}
        height={50}
        priority
        alt="functions bg"
        className={cn(
          "absolute left-0 top-0 z-10 hidden -scale-x-100 object-cover",
        )}
        sizes="(max-width: 768px) 33vw, 10vw"
      />
    </div>
  );
}
