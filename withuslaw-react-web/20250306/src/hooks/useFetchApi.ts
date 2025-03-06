"use client";

import { useRouter } from "next/navigation";
import { authAtom } from "@stores";
import { useAtomValue } from "jotai";

// 커스텀 에러 타입 정의
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(`${message} : ${status}`);
    this.name = "ApiError";
  }
}

export default function useFetchApi() {
  const authInfo = useAtomValue(authAtom);
  const router = useRouter();

  const fetchApi = async ({
    url,
    method,
    body,
  }: {
    url: string;
    method: "get" | "post";
    body?: any;
  }) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInfo.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(response);
      throw new ApiError(response.status, "API ERROR");
    }

    return response;
  };

  return { fetchApi };
}
