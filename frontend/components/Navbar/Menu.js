import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Menu({ data = [], isOpen }) {
  return (
    <ul
      className={cn(
        "absolute top-full z-50 flex h-0 w-full flex-col overflow-hidden bg-white px-3 opacity-0 transition-all duration-700 sm:px-5",
        {
          "h-auto opacity-100": isOpen,
        },
      )}
    >
      {data.map((item) => {
        return <MenuItem key={item.title} item={item} />;
      })}
    </ul>
  );
}

function MenuItem({ item }) {
  return (
    <>
      <li
        key={item.title}
        className="hover:text-primary group relative mx-1 flex cursor-pointer flex-col items-stretch px-0"
      >
        <Link
          className="border-primary flex w-full justify-between border-b py-4 text-base"
          href={item.href}
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
        className="border-primary hover:text-primary border-b px-2 py-4 text-base"
        href={item.href}
      >
        {item.title}
      </Link>
    </>
  );
}