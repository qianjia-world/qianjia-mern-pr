export default async function Website() {
  const message = await new Promise((resolve) => {
    console.log("in executing sleep!");
    setTimeout(() => resolve("after 3000 ms!"), 3000);
  });
  return <h1>關於網站{message}</h1>;
}
