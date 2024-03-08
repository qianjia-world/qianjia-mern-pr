"use client";
import { useForm } from "react-hook-form";
import { useHttpClient } from "@/hooks/http-hook";
import Wrap from "@/components/shared/Wrap";
import { ApiResultDialog } from "@/components/shared/ApiResultDialog";
import Image from "next/image";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();

  async function submitRegister(data) {
    // const requestData = {
    //   url: `${process.env.NEXT_PUBLIC_API}/users/login`,
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const responseData = await sendRequest(requestData);
    // console.log(responseData);
    // if (responseData?.token) {
    //   localStorage.setItem("token", responseData.token);
    // }
  }
  return (
    <Wrap className="">
      <ApiResultDialog
        onOpenChange={clearApiMsg}
        title="結果"
        content={apiMsg}
      />
      <section className="m-2 flex min-h-page flex-col rounded-xl border-2 border-white bg-primary ">
        <h3 className="mx-auto my-2 rounded-xl bg-white px-2 py-1">註冊</h3>
        <form className="grid sm:grid-cols-2" onSubmit={handleSubmit(register)}>
          <div className="relative m-4 flex min-h-24 flex-col justify-stretch">
            <Image
              src={"/cat-box.gif"}
              fill
              alt={"user avatar"}
              priority
              className="rounded-md object-cover "
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <input
              type="number"
              className="h-0 w-0 rounded-xl focus-visible:outline-primary"
              defaultValue={1}
              {...register("avatar")}
            />
          </div>
          <div className="flex flex-1 flex-col justify-stretch gap-y-2 p-2">
            <div className="">
              <label className="inline-block rounded-md">
                Name<span className="text-lg text-red-600">*</span>
              </label>
              <input
                type="text"
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("name")}
              />
            </div>

            <div className="">
              <label className="mb-1 inline-block rounded-md">
                Email<span className="text-lg text-red-600">*</span>
                <button
                  className="rounded-md border-2 border-primary bg-white p-2 hover:border-white hover:bg-primary"
                  type="button"
                >
                  取得驗證碼
                </button>
              </label>
              <input
                type="email"
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("email")}
              />
            </div>

            <div className="">
              <label className="inline-block rounded-md">
                Email 驗證碼<span className="text-lg text-red-600">*</span>
              </label>
              <input
                type="text"
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("code")}
              />
            </div>

            <div className="">
              <label className="inline-block rounded-md">
                Password<span className="text-lg text-red-600">*</span>
              </label>
              <input
                type="password"
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("password")}
              />
            </div>

            <div className="">
              <label className="inline-block rounded-md">
                Confirm Password<span className="text-lg text-red-600">*</span>
              </label>
              <input
                type="password"
                className="h-10 w-full rounded-md focus-visible:outline-primary"
                defaultValue=""
                {...register("confirm_password")}
              />
            </div>

            <div className="mx-auto mt-auto">
              <input
                type="submit"
                value="送出"
                className="cursor-pointer rounded-xl border-2 border-primary bg-white px-4 py-2 hover:border-white hover:bg-primary"
              />
            </div>
          </div>
        </form>
      </section>
    </Wrap>
  );
}
