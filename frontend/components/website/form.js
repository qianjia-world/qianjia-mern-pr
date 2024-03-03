"use client";
import { useForm } from "react-hook-form";
import { useHttpClient } from "@/hooks/http-hook";
import { ApiResultDialog } from "../shared/ApiResultDialog";
import { a } from "@react-spring/web";
export default function Form() {
  const { register, handleSubmit } = useForm();

  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();
  const onSubmit = (data) => {
    console.log(data);
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/web/contact`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestData);
  };

  return (
    <>
      <ApiResultDialog
        onOpenChange={clearApiMsg}
        title="結果"
        content={apiMsg}
      />
      <div className="row-span-2 rounded-2xl border-2 border-primary bg-white">
        <div className="m-1 flex h-full w-full flex-col rounded-2xl bg-primary">
          <h3 className="mx-auto my-2 rounded-xl bg-white px-2 py-1">
            聯絡我們
          </h3>
          <form
            className="flex flex-1 flex-col justify-stretch gap-y-2 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <div className="">
              <label className="inline-block rounded-md">
                標題<span className="text-lg text-red-600">*</span>
              </label>
              <input
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("title")}
              />
            </div>

            <div className="">
              <label className="inline-block rounded-md">
                Email<span className="text-lg text-red-600">*</span>
              </label>
              <input
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("email")}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label className="inline-block rounded-md">
                content<span className="text-lg text-red-600">*</span>
              </label>
              <textarea
                className="flex-1 rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("content")}
              />
            </div>

            <div className="mx-auto mt-auto">
              <input
                type="submit"
                value="送出訊息"
                className="cursor-pointer rounded-xl border-2 border-primary bg-white p-2 hover:border-white hover:bg-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
