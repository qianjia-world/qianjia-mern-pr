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
        image: "/menuData/vote.webp",
        description:
          "本功能為一個投票系統，用戶可以進行投票操作以表達對特定議題的意見。當用戶點擊投票按鈕後，系統會記錄用戶的投票並更新相應的投票統計數據。用戶投完票後，系統會顯示該議題的最新投票結果，以便用戶了解其他參與者的意見。投票結果將以直觀的方式呈現，例如圖表或數字統計。",
      },
      {
        title: "占卜",
        href: "/functions/fortune",
        image: "/menuData/fortune.webp",
        description:
          "本功能為一個占卜系統，提供了針對愛情、工作和金錢等三種不同類型的占卜服務。用戶可以點擊相應的占卜類型按鈕，系統將隨機生成一個占卜結果，以提供用戶娛樂和參考。",
      },
      {
        title: "隨機主題語句",
        href: "/functions/random-talk",
        image: "/menuData/random-talk.webp",
        description:
          "本功能為一個隨機主題語句生成系統，提供了工程師幹話、PUA幹話和美麗的文字三種主題的語句。用戶在滑鼠滑過或點擊相應區塊時，系統將隨機顯示該主題的一句語句。同時，用戶還可以通過輸入框輸入自己的語句，並將其儲存到系統中，以便之後隨機顯示在區塊上。",
      },
      {
        title: "WS Chat",
        href: "/functions/ws",
        image: "/menuData/ws-chat.webp",
        description:
          "本功能為一個基於 WebSocket 的即時聊天室（WS Chat），允許使用者進行即時的文字聊天。當使用者點擊「Connect」按鈕後，將建立與 WebSocket 伺服器的連接。一旦連接成功，用戶可以輸入自己的用戶名稱和聊天訊息，並將其發送到聊天室中。其他已連接到相同 WebSocket 伺服器的使用者也可以看到這些訊息，從而實現即時的群聊功能。",
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
