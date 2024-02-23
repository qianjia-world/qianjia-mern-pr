import Link from "next/link";
import { Caveat } from "next/font/google";
import Image from "next/image";

const caveat = Caveat({
  subsets: ["latin"],
});

export default function Logo() {
  return (
    <Link href={"/"} className="flex cursor-pointer items-center">
      <div className="relative h-14 w-14 sm:h-20 sm:w-20">
        <Image
          src={"/logo.gif"}
          fill
          alt="qianjia web logo, a cat drinks"
          priority
          className="rounded-md object-cover"
          sizes="10vw"
        />
      </div>
      <h1 className={`text-primary text-2xl italic ${caveat.className}`}>
        Mern-Qianjia-Project
      </h1>
    </Link>
  );
}
