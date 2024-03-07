// In app/page.tsx
async function getTodo() {
  // Always cache the data
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/2", {
    next: { revalidate: 10 }, // User request 到來的 10 秒後重新 build 一次這個頁面，並且在這 10 秒內的所有 request 都會用 cache 的資料，直到超過 10 秒後才會用新的資料
  });

  if (!response.ok) throw Error;

  const data = await response.json();

  return data;
}

export default async function TodoPage() {
  const data = await getTodo();

  return <p>fetched data: {data.title}</p>;
}
