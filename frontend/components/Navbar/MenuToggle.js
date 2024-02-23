import Image from "next/image";

export default function PhoneMenuToggle({ onClick }) {
  return (
    <div className="flex items-center lg:hidden">
      <div className="relative h-14 w-14 cursor-pointer" onClick={onClick}>
        <Image
          src={"/menu.gif"}
          fill
          alt="qianjia web logo, a cat drinks"
          priority
          className="rounded-md object-cover"
          sizes="10vw"
        />
      </div>
    </div>
  );
}
