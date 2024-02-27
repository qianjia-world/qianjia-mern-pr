import { cn } from "@/lib/utils";
export default function FortuneItemLight({ className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute h-4 w-4 rounded-md border-2 border-transparent ",
        className,
      )}
    ></div>
  );
}
