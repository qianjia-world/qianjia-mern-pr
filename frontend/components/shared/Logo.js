import Link from "next/link";
import { Caveat } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
const caveat = Caveat({
  subsets: ["latin"],
});

export default function Logo({ imageStyle = "w-14 sm:w-20", textStyle = "" }) {
  return (
    <Link href={"/"} className="flex cursor-pointer items-center">
      <div className={cn("relative aspect-square ", imageStyle)}>
        <Image
          src={"/logo.gif"}
          fill
          alt="qianjia web logo, a cat drinks"
          priority
          className="rounded-md object-cover"
          sizes="10vw"
        />
      </div>
      <h1 className={cn("italic text-primary", caveat.className, textStyle)}>
        Mern-Qianjia-Project
      </h1>
    </Link>
  );
}
