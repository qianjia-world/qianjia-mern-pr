import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Menu({ data = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.name;
  let renderData = [...data];
  if (token) {
    renderData.pop();
  } else {
    renderData.splice(-2, 1);
  }

  function handleToggle() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <ul
        className={cn(
          "absolute top-full z-50 flex h-0 w-full flex-col overflow-hidden bg-white px-3 opacity-0 transition-all duration-700 sm:px-5",
          {
            "h-auto opacity-100": isOpen,
          },
        )}
      >
        {renderData.map((item) => {
          return <MenuItem key={item.title} item={item} />;
        })}
      </ul>
      <MenuToggle onClick={handleToggle}></MenuToggle>
    </>
  );
}

function MenuItem({ item }) {
  return (
    <>
      <li
        key={item.title}
        className="group relative mx-1 flex cursor-pointer flex-col items-stretch px-0 hover:text-primary"
      >
        <Link
          className="flex w-full justify-between border-b border-primary py-4 text-base"
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : "_self"}
        >
          {item.title}
        </Link>

        {item.children.length > 0 && (
          <div className="flex flex-col items-stretch pl-4 group-hover:text-black">
            {item.children.map((item) => {
              return <SubMenuItem key={item.title} item={item} />;
            })}
          </div>
        )}
      </li>
    </>
  );
}

function SubMenuItem({ item }) {
  return (
    <>
      <Link
        key={item.title}
        className="border-b border-primary px-2 py-4 text-base hover:text-primary"
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : "_self"}
      >
        {item.title}
      </Link>
    </>
  );
}

function MenuToggle({ onClick }) {
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
