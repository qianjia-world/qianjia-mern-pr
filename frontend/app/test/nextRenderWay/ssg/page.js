// In app/page.tsx
async function getTodo() {
  // Always cache the data
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/2", {
    cache: "force-cache", // SSG，如果要用 SSR 則是設定 cache: 'no-store'
  });

  if (!response.ok) throw Error;

  const data = await response.json();

  return data;
}

export default async function TodoPage() {
  const data = await getTodo();

  return <p>fetched data: {data.title}</p>;
}
