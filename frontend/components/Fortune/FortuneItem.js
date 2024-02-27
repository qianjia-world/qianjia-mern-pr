import { cn } from "@/lib/utils";
export default function FortuneItem({ children, status }) {
  return (
    <div className="rounded-md border border-primary">
      <div
        className={cn(
          "relative h-full w-full cursor-pointer opacity-70 hover:opacity-100",
          {
            "opacity-100": status,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
