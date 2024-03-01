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
    href: "/functions",
    children: [
      {
        title: "投票",
        href: "/functions/vote",
      },
      {
        title: "占卜",
        href: "/functions/fortune",
      },
      {
        title: "隨機主題語句",
        href: "/functions/random-talk",
      },
      {
        title: "WS Chat",
        href: "/functions/ws",
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
        href: "/user",
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
