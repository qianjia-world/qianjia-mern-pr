const MenuData = [
  {
    title: "首頁",
    href: "/",
    children: [],
  },
  {
    title: "關於網站",
    href: "/website",
    children: [],
  },
  {
    title: "功能",
    href: "/function",
    children: [
      {
        title: "投票",
        href: "/function/vote",
      },
      {
        title: "占卜",
        href: "/function/fortune",
      },
      {
        title: "主題式隨機語句觸發",
        href: "/function/random",
      },
      {
        title: "Websocket小遊戲",
        href: "/function/websocket",
      },
    ],
  },
  {
    title: "遊戲",
    href: "/game",
    children: [],
  },
  {
    title: "技術Blog",
    href: "https://qianjia-tech.vercel.app/",
    children: [],
  },
  {
    title: "聯絡我們",
    href: "/contact",
    children: [],
  },
  {
    title: "會員管理",
    href: "/user",
    children: [
      {
        title: "會員管理",
        href: "/user/profile",
      },
      {
        title: "註冊",
        href: "/user/register",
      },
      {
        title: "登入",
        href: "/user/login",
      },
      {
        title: "登出",
        href: "/user/logout",
      },
    ],
  },
];

export default MenuData;