"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function LinkPage() {
  const searchParams = useSearchParams();
  const tpltcd = searchParams.get("tpltcd");
  const loanno = searchParams.get("loanno");
  const regtype = searchParams.get("regtype");
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const launchAppUrl = `kosapp://kosapp.com/?tpltcd=${tpltcd}&loanno=${
    loanno ?? ""
  }&regtype=${regtype ?? ""}`;

  const activatedDeepLink = () => {
    console.log(launchAppUrl);
    // 앱 스킴 호출
    location.href = launchAppUrl;

    // 2초 후 리디렉션 처리
    setTimeout(() => {
      if (isAndroid) {
        location.href =
          "https://play.google.com/store/apps/details?id=com.bankclear.nicekos";
      } else if (isIOS) {
        location.href = "https://apps.apple.com/";
      }
    }, 2000);
  };

  useEffect(() => {
    activatedDeepLink();
    console.log(launchAppUrl);
  }, []);

  return <></>;
}
