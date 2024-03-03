import Link from "next/link";

export default function PCMenu({ data = [] }) {
  return (
    <ul className="z-10 hidden items-stretch lg:flex">
      {data.map((item) => {
        return (
          <li
            key={item.title}
            className="group relative flex cursor-pointer items-stretch justify-center px-2 hover:text-primary"
          >
            <Link
              className="flex items-center justify-center"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
            >
              {item.title}
            </Link>

            {item.children.length > 0 && (
              <ul className="absolute -right-5 top-full hidden min-w-48 flex-col rounded-bl-xl rounded-br-md border-2 border-primary bg-white p-3 shadow-md group-hover:flex group-hover:text-black">
                {item.children.map((item) => {
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="py-2 hover:text-primary"
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                    >
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
