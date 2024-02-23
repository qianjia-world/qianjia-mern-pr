import Link from "next/link";

export default function PCMenu({ data = [] }) {
  return (
    <ul className="hidden items-stretch lg:flex">
      {data.map((item) => {
        return (
          <li
            key={item.title}
            className="hover:text-primary group relative flex items-center justify-center px-2"
          >
            <Link href={item.href}>{item.title}</Link>

            {item.children.length > 0 && (
              <ul className="border-primary absolute right-0 top-full hidden min-w-48 flex-col rounded-bl-xl rounded-br-md border-2 bg-white p-3 shadow-md group-hover:flex group-hover:text-black">
                {item.children.map((item) => {
                  return (
                    <Link key={item.title} href={item.href} className="py-2">
                      {item.title}
                    </Link>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
