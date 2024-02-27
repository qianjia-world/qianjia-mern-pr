import { cn } from "@/lib/utils";
import Image from "next/image";
export default function FortuneButton({ show, onClick, src }) {
  return (
    <Image
      src={src}
      width={80}
      height={80}
      alt={"fortune button img"}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-300 object-contain opacity-0 transition-all duration-700",
        {
          "pointer-events-auto block opacity-100": show,
        },
      )}
      sizes="10vw"
      onClick={onClick}
    />
  );
}
