"use client";
import Wrap from "@/components/shared/Wrap";
import MenuToggle from "./MenuToggle";
import Logo from "@/components/shared/Logo";
import PCMenu from "./PCMenu";
import Menu from "./Menu";
import MenuData from "@/constant/menuData";

export default function NavBar() {
  return (
    <Wrap className="border-b-2 border-primary">
      <div className="relative flex items-stretch justify-between pr-5">
        <Logo imageStyle="w-14 sm:w-20" textStyle="text-2xl" />
        <PCMenu data={MenuData} />
        <Menu data={MenuData} />
      </div>
    </Wrap>
  );
}
