import Image from "next/image";
export default function Avatar() {
  return (
    <div className="relative  m-auto aspect-square  h-full min-h-60 border-2 border-primary">
      <Image
        src={"/loading.gif"}
        fill
        alt={"website info"}
        priority
        className="rounded-md object-cover "
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
