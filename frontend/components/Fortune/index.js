"use client";
import { cn } from "@/lib/utils";
import { useImmer } from "use-immer";
import { useHttpClient } from "@/hooks/http-hook";
import { ApiResultDialog } from "../shared/ApiResultDialog";
import Wrap from "@/components/shared/Wrap";
import FortuneItem from "./FortuneItem";
import FortuneItemBg from "./FortuneItemBg";
import FortuneItemLight from "./FortuneItemLight";
import FortuneButton from "./FortuneButton";

const initLightStatus = {
  love: {
    lt: false,
    lb: false,
    rt: false,
    rb: false,
  },
  work: {
    mt: false,
    lb: false,
    rb: false,
  },
  money: {
    mm: false,
    ml: false,
    mr: false,
  },
};

const btnStatus = {
  work: false,
  love: false,
  money: false,
};

export default function Fortune() {
  const [lightStatus, setLightStatus] = useImmer(initLightStatus);
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();

  Object.keys(lightStatus).map((item) => {
    if (Object.values(lightStatus[item]).every((value) => value == true)) {
      btnStatus[item] = true;
    }
  });

  function handleLightClick(type, key) {
    setLightStatus((draft) => {
      Object.keys(lightStatus).map((item) => {
        if (item === type) {
          draft[type][key] = !draft[type][key];
        } else {
          draft[item] = initLightStatus[item];
          btnStatus[item] = false;
        }
      });
      return draft;
    });
  }
  async function handleFortuneButtonClick(type) {
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/functions/fortunes/${type}/result`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestData);
  }

  return (
    <Wrap className="m-2 rounded-md">
      <ApiResultDialog
        onOpenChange={clearApiMsg}
        title="結果"
        content={apiMsg}
      />
      <section className="text-center">
        <div className="mb-2 border border-b-2 border-primary p-2">
          <h3>占卜</h3>
          <p>找找燈在哪裡，點完燈才能進行占卜～</p>
        </div>

        <div className="grid h-96 grid-cols-1 gap-x-3 gap-y-2 sm:h-60 sm:grid-cols-3">
          <FortuneItem status={btnStatus.love}>
            <FortuneItemBg
              src="/fortune/bg-love.png"
              alt="Love, a fortune type"
            />
            <FortuneItemLight
              className={cn("left-2 top-2 hover:border-red-300", {
                "bg-red-300": lightStatus.love.lt,
              })}
              onClick={() => handleLightClick("love", "lt")}
            />
            <FortuneItemLight
              className={cn("bottom-2 left-2 hover:border-red-300", {
                "bg-red-300": lightStatus.love.lb,
              })}
              onClick={() => handleLightClick("love", "lb")}
            />
            <FortuneItemLight
              className={cn("right-2 top-2 hover:border-red-300", {
                "bg-red-300": lightStatus.love.rt,
              })}
              onClick={() => handleLightClick("love", "rt")}
            />

            <FortuneItemLight
              className={cn("bottom-2 right-2 hover:border-red-300", {
                "bg-red-300": lightStatus.love.rb,
              })}
              onClick={() => handleLightClick("love", "rb")}
            />
            <FortuneButton
              src={"/fortune/btn-love.webp"}
              show={btnStatus.love}
              onClick={() => handleFortuneButtonClick("love")}
            />
          </FortuneItem>

          <FortuneItem status={btnStatus.work}>
            <FortuneItemBg
              src="/fortune/bg-work.png"
              alt="Work, a fortune type"
            />
            <FortuneItemLight
              className={cn(
                "left-1/2 top-2 -translate-x-1/2 hover:border-[#485b74]",
                {
                  "bg-[#485b74]": lightStatus.work.mt,
                },
              )}
              onClick={() => handleLightClick("work", "mt")}
            />
            <FortuneItemLight
              className={cn("bottom-2 left-2 hover:border-[#485b74]", {
                "bg-[#485b74]": lightStatus.work.lb,
              })}
              onClick={() => handleLightClick("work", "lb")}
            />
            <FortuneItemLight
              className={cn("bottom-2 right-2 hover:border-[#485b74]", {
                "bg-[#485b74]": lightStatus.work.rb,
              })}
              onClick={() => handleLightClick("work", "rb")}
            />
            <FortuneButton
              src={"/fortune/btn-work.webp"}
              show={btnStatus.work}
              onClick={() => handleFortuneButtonClick("work")}
            />
          </FortuneItem>

          <FortuneItem status={btnStatus.money}>
            <FortuneItemBg
              src="/fortune/bg-money.png"
              alt="Money, a fortune type"
            />
            <FortuneItemLight
              className={cn(
                "bottom-5 left-1/2 -translate-x-1/2 hover:border-yellow-300",
                {
                  "bg-yellow-300": lightStatus.money.mm,
                },
              )}
              onClick={() => handleLightClick("money", "mm")}
            />
            <FortuneItemLight
              className={cn(
                "bottom-5 left-[calc(50%+30px)] -translate-x-1/2 hover:border-yellow-300",
                {
                  "bg-yellow-300": lightStatus.money.mr,
                },
              )}
              onClick={() => handleLightClick("money", "mr")}
            />
            <FortuneItemLight
              className={cn(
                "bottom-5 left-[calc(50%-30px)] -translate-x-1/2 hover:border-yellow-300",
                {
                  "bg-yellow-300": lightStatus.money.ml,
                },
              )}
              onClick={() => handleLightClick("money", "ml")}
            />
            <FortuneButton
              src={"/fortune/btn-money.webp"}
              show={btnStatus.money}
              onClick={() => handleFortuneButtonClick("money")}
            />
          </FortuneItem>
        </div>
      </section>
    </Wrap>
  );
}
