"use client";
import Image from "next/image";
export default function User() {
  return (
    <>
      <div className="flex sm:h-14 flex-col items-center justify-between p-2 sm:flex-row ">
        <h3>會員資料</h3>
        <div className="flex gap-x-2">
          <button className="rounded-md border bg-primary p-2 hover:border-primary hover:bg-white">
            修改姓名
          </button>
          <button className="rounded-md border bg-primary p-2 hover:border-primary hover:bg-white">
            修改Email
          </button>
          <button className="rounded-md border bg-primary p-2 hover:border-primary hover:bg-white">
            修改密碼
          </button>
        </div>
      </div>

      <div className="flex items-stretch gap-x-4 p-2">
        <div className="relative aspect-square w-32">
          <Image
            src={"/cat-box.gif"}
            fill
            alt={"user avatar"}
            priority
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-1">
          <p>姓名:</p>
          <p>權限:</p>
          <p>Email:</p>
        </div>
      </div>
    </>
  );
}
