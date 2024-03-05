"use client";
import { useForm } from "react-hook-form";
import { useHttpClient } from "@/hooks/http-hook";
import Wrap from "@/components/shared/Wrap";
import { ApiResultDialog } from "@/components/shared/ApiResultDialog";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();

  async function login(data) {
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/users/login`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const responseData = await sendRequest(requestData);

    if (responseData?.token) {
      localStorage.setItem("token", responseData.token);
    }
  }
  return (
    <Wrap className="">
      <ApiResultDialog
        onOpenChange={clearApiMsg}
        title="結果"
        content={apiMsg}
      />
      <section className="m-2 flex min-h-page flex-col rounded-xl border-2 border-white bg-primary text-center">
        <h3 className="mx-auto my-2 rounded-xl bg-white px-2 py-1">登入</h3>
        <form
          className="flex flex-1 flex-col justify-stretch gap-y-2 p-2"
          onSubmit={handleSubmit(login)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <div className="">
            <label className="inline-block rounded-md">
              Email<span className="text-lg text-red-600">*</span>
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
              password<span className="text-lg text-red-600">*</span>
            </label>
            <input
              type="password"
              className="h-10 w-full rounded-md focus-visible:outline-primary"
              defaultValue=""
              {...register("password")}
            />
          </div>

          <div className="mx-auto mt-auto">
            <input
              type="submit"
              value="送出"
              className="cursor-pointer rounded-xl border-2 border-primary bg-white px-4 py-2 hover:border-white hover:bg-primary"
            />
          </div>
        </form>
      </section>
    </Wrap>
  );
}
