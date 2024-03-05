import Link from "next/link";
export default function UserMenu() {
  return (
    <div className="min-w-72 bg-white">
      <div className="border-2 border-primary">
        <h6 className="bg-primary p-2 text-center">會員中心</h6>
        <ul className="flex flex-col px-5 py-3">
          <li className="py-2 hover:text-primary">
            <Link href={"/user"}>會員資料</Link>
          </li>
          <li className="py-2 hover:text-primary">
            <Link href={"/user/badge"}>成就紀錄</Link>
          </li>
          <li className="py-2 hover:text-primary">
            <Link href={"/user/game-record"}>遊戲紀錄</Link>
          </li>
          <li className="py-2 hover:text-primary">
            <Link href={"/user/game-items"}>我的道具</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
