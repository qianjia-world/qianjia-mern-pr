export async function generateStaticParams() {
  //   const posts = await fetch("https://.../posts").then((res) => res.json());
  let posts = [
    {
      slug: "slug1",
    },
    {
      slug: "slug2",
    },
    {
      slug: "slug3",
    },
    {
      slug: "slug4",
    },
    {
      slug: "slug5",
    },
    {
      slug: "slug6",
    },
    {
      slug: "slug7",
    },
    {
      slug: "slug8",
    },
    {
      slug: "slug9",
    },
    {
      slug: "slug10",
    },
  ];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }) {
  const { slug } = params;

  return <h1>this ssg page : {slug}</h1>;
}
