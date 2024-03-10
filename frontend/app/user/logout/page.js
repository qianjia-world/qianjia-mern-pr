"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
export default function logoutPage() {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
  return (
    <div className="flex min-h-page w-full flex-col items-center justify-center bg-primary">
      <h2>已登出</h2>
      <p className="my-2">
        <Link href="/">回首頁</Link>
      </p>
      <div className="relative aspect-square w-40">
        <Image
          src={"/cat-box.gif"}
          fill
          alt="a image for 404 not found page"
          priority
          className="rounded-md object-cover "
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
