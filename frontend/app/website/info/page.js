import Wrap from "@/components/shared/Wrap";
import Avatar from "@/components/website/avatar";
import Info from "@/components/website/info";
export default async function InfoPage() {
  let responseData = await fetch(`${process.env.NEXT_PUBLIC_API}/web/info`);
  responseData = await responseData.json();

  const data = responseData.data;
  return (
    <Wrap>
      <section className="grid min-h-page grid-cols-1 gap-x-3  gap-y-14 px-5 pb-10 pt-5 sm:px-16 sm:py-14 md:grid-cols-2 lg:px-32">
        <Avatar />
        <Info />
      </section>
    </Wrap>
  );
}
