import Wrap from "@/components/shared/Wrap";
import Image from "next/image";
export default async function Website() {
  let responseData = await fetch(`${process.env.NEXT_PUBLIC_API}/web/info`);
  responseData = await responseData.json();

  const data = responseData.data;
  return (
    <Wrap>
      <section className="grid min-h-page grid-cols-1 gap-x-3  gap-y-14 px-5 pb-10 pt-5 sm:px-16 sm:py-14 md:grid-cols-2 lg:px-32">
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
        <div>
          <h2 className="font-[600]">網站資訊</h2>
          <p className="leading-10">
            <span className="font-[500]">網站描述:</span> {data.description}
            <br />
            <span className="font-[500]">作者: </span>
            {data.author}
            <br />
            <span className="font-[500]">作者資訊: </span>
            {data.author_info}
            <br />
            <span className="font-[500]">作者Email: </span>
            {data.author_email}
            <br />
            <span className="font-[500]">信念: </span>
            {data.beliefs}
          </p>
        </div>
      </section>
    </Wrap>
  );
}
