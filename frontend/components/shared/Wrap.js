import { cn } from "@/lib/utils";
export default function Wrap({ children, className = "" }) {
  return (
    <div className={cn("bg-white", className)}>
      <div className="mx-auto max-w-screen-2xl">{children}</div>
    </div>
  );
}
