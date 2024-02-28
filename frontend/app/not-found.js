import Link from "next/link";
import Image from "next/image";
export default async function NotFound() {
  return (
    <div className="min-h-page flex w-full flex-col items-center justify-center bg-primary">
      <h2>該頁面不存在</h2>
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
