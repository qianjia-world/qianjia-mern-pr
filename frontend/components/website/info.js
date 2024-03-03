export default async function Info() {
  let responseData = await fetch(`${process.env.NEXT_PUBLIC_API}/web/info`);
  responseData = await responseData.json();

  const data = responseData.data;
  return (
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
  );
}
