import Image from "next/image";
export default function FortuneItemBg({ src, alt }) {
  return (
    <Image
      src={src}
      fill
      alt={alt}
      priority
      className="rounded-md object-cover "
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  );
}
