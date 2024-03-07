//取列表 => slug id 列表
//用id做靜態生成

export async function generateStaticParams() {
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos",
  ).then((res) => res.json());

  const ids = posts.map(({ id }) => ({
    id: id.toString(),
  }));
  return ids;
}

export default async function ISR_TODO_Page({ params }) {
  const { id } = params;
  let data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { revalidate: 10 }, // User request 到來的 10 秒後重新 build 一次這個頁面，並且在這 10 秒內的所有 request 都會用 cache 的資料，直到超過 10 秒後才會用新的資料
  });
  data = await data.json();

  return (
    <div>
      <h1>Incremental Static Regeneration + Dynamic Route Page</h1>
      <p>
        ISR 可以想成是 SSG + Revalidate 的實踐結果，若使用者在 url 輸入的 route
        是已經預先透過 generateStaticParams build 好的就會直接回傳 html
        檔，若是沒 build 過的路徑，就會 build 好以後回傳。
      </p>
      <p>fetched data: {data.title}</p>
    </div>
  );
}
