"use client";

import { useRouter } from "next/navigation";
import { authAtom } from "@stores";
import { useAtomValue } from "jotai";

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
    try {
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
        throw new Error("API Error :" + response.status);
      }

      return response;
    } catch (err) {
      console.log("### ERROR :" + err);
      throw err;
    }
  };

  return { fetchApi };
}
