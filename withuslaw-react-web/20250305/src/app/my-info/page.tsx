"use client";

import Image from "next/image";
import { RightArrow } from "@icons";

export default function MyInfoPage() {
  const handleLogout = () => {
    // for flutter
    // @ts-ignore
    if (typeof flutterFunc == "object") {
      alert("1");
      console.log("flutterFunc.postMessage();");
      // @ts-ignore
      flutterFunc?.postMessage('{"mode":"pop"}');
    } else if (
      // @ts-ignore
      typeof webkit != "undefined" &&
      // @ts-ignore
      typeof webkit.messageHandlers.flutterFunc != "undefined"
    ) {
      alert("2");
      console.log("webkit.messageHandlers.flutterFunc.postMessage()");
      // @ts-ignore
      webkit.messageHandlers?.flutterFunc?.postMessage('{"mode":"pop"}');
    } else if (
      // @ts-ignore
      typeof Mobile != "undefined" &&
      // @ts-ignore
      typeof Mobile.flutterFunc.postMessage == "function"
    ) {
      alert("3");
      console.log("Mobile.flutterFunc()");
      // @ts-ignore
      Mobile?.flutterFunc?.postMessage('{"mode":"pop"}');
    } else {
      alert("4");
      console.log("window.webkit.messageHandlers.flutterFunc.postMessage()");
      window.webkit?.messageHandlers?.flutterFunc?.postMessage(
        '{"mode":"pop"}'
      );
    }
  };

  return (
    <div className="bg-kos-white w-full h-full">
      <div className="py-5 px-3 flex justify-between border-t-4 border-gray-200">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-bold">홍길동</p>
            <p className="text-sm text-gray-400">뱅클 사무소</p>
          </div>
        </div>
        <Image src={RightArrow} alt="right arrow icon" />
      </div>
      <ul className="px-3 flex flex-col py-5 border-t-4 border-gray-200 gap-4">
        <li className="flex justify-between">
          <p>직원 관리</p>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="information/cntr/001">상환금 수령용 계좌</a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <p>견적서 관리</p>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="view/searchcntr/22484494787">웹뷰 차주 정보</a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="view/searchcntr/22484494787/image">웹뷰 이미지 등록</a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="acceptance/match/add-info/profile">프로필 이미지 등록</a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="acceptance/match/add-info/rept/isrn">보험가입 증명서 등록</a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
        <li className="flex justify-between">
          <a href="/my-case/estm/info/schdl?loanNo=22483945723&isDDay=true">
            잔금일정 확인
          </a>
          <Image src={RightArrow} alt="right arrow icon" />
        </li>
      </ul>
      <div className="flex justify-center mt-24">
        <button
          className="bg-orange-500 px-4 py-2 rounded-full text-kos-white shadow-lg"
          onClick={handleLogout}
        >
          FlutterTest😎
        </button>
      </div>
    </div>
  );
}
