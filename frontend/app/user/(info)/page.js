"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useHttpClient } from "@/hooks/http-hook";
import { useState, useEffect, useCallback } from "react";
import { ApiResultDialog } from "@/components/shared/ApiResultDialog";
import UserDialog from "@/components/user/UserDialog";
export default function User() {
  const session = useSession();
  const token = session?.data?.user?.name;
  const { apiMsg, clearApiMsg, sendRequest } = useHttpClient();
  const [userData, setUserData] = useState({});

  const fetchUserDetail = useCallback(async () => {
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/users/myself`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseData = await sendRequest(requestData);
      setUserData(responseData.user);
    } catch (err) {
      // Handle error if needed
    }
  }, [token, sendRequest]);

  async function patchUserDetail(data) {
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/users/myself`,
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await sendRequest(requestData);
    fetchUserDetail();
  }

  async function getEmailCode(data) {
    const requestData = {
      url: `${process.env.NEXT_PUBLIC_API}/users/emailCode`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await sendRequest(requestData);
  }
  useEffect(() => {
    fetchUserDetail();
  }, [sendRequest, fetchUserDetail]);

  return (
    <>
      <ApiResultDialog
        onOpenChange={clearApiMsg}
        title="結果"
        content={apiMsg}
      />
      <div className="flex flex-col items-center justify-between p-2 sm:h-14 sm:flex-row ">
        <h3>會員資料</h3>
        <div className="flex gap-x-2">
          <UserDialog
            type="name"
            title="修改姓名"
            description=""
            onSubmit={patchUserDetail}
          ></UserDialog>
          <UserDialog
            type="email"
            title="修改Email"
            description="修改Email時需輸入密碼驗證身份"
            onSubmit={patchUserDetail}
            getEmailCode={getEmailCode}
          ></UserDialog>
          <UserDialog
            type="password"
            title="修改密碼"
            description="修改密碼時需輸入舊密碼"
            onSubmit={patchUserDetail}
          ></UserDialog>
          {/* <button className="rounded-md border bg-primary p-2 hover:border-primary hover:bg-white">
            修改密碼
          </button> */}
        </div>
      </div>

      <div className="flex items-stretch gap-x-4 p-2">
        <div className="relative aspect-square w-32">
          <Image
            src={"/cat-box.gif"}
            fill
            alt={"user avatar"}
            priority
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col justify-center gap-y-1">
          <p>姓名:{userData?.name}</p>
          <p>權限:{userData?.role}</p>
          <p>Email:{userData?.email}</p>
        </div>
      </div>
    </>
  );
}
