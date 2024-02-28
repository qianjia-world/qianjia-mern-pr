"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isShowBtn);
    return () => {
      window.removeEventListener("scroll", isShowBtn);
    };
  }, []);

  function isShowBtn() {
    if (window.pageYOffset < 100) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 hidden h-10 w-10 cursor-pointer items-center justify-center border-2 border-primary bg-primary sm:bottom-10 sm:right-10 lg:bottom-20",
        {
          flex: isShow,
        },
      )}
      onClick={() => scrollToTop()}
    >
      <Image
        src={"/logo.gif"}
        fill
        alt={"a btn can return to top"}
        priority
        className="rounded-md object-cover "
        sizes="(max-width: 768px) 20vw, 10vw"
      />
    </div>
  );
}
