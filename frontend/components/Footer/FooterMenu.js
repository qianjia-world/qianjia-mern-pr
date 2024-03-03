import Wrap from "@/components/shared/Wrap";
import MenuData from "@/constant/menuData";
import Link from "next/link";
import Logo from "@/components/shared/Logo";

export default function FooterMenu() {
  return (
    <Wrap className="border-y-2 border-primary">
      <div className="grid grid-cols-1 gap-y-14  px-5 pb-10 pt-5 sm:px-16 sm:py-14 md:grid-cols-2 lg:px-32">
        <ul className="grid grid-flow-col grid-rows-5 gap-x-1 gap-y-4 border-b-2   border-primary p-1 text-lg sm:grid-rows-4 sm:gap-y-3 ">
          {MenuData.map((item) => {
            return (
              <li
                key={item.title}
                className="cursor-pointer hover:text-primary"
              >
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-x-2 border-t-2 border-primary">
          <Logo imageStyle="w-20 sm:w-40" textStyle="text-3xl lg:text-4xl" />
        </div>
      </div>
    </Wrap>
  );
}
