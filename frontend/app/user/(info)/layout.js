import Wrap from "@/components/shared/Wrap";
import UserMenu from "@/components/user/UserMenu";
export default function Layout({ children }) {
  return (
    <Wrap>
      <div className="flex min-h-page flex-col justify-stretch gap-7  p-5 md:flex-row lg:px-32 lg:py-8">
        <UserMenu></UserMenu>
        <div className="flex flex-1 flex-col justify-stretch border-2 border-primary ">
          {children}
        </div>
      </div>
    </Wrap>
  );
}
