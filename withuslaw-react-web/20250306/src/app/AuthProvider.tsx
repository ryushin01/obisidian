"use client";

import React, {
  ChangeEvent,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loading } from "@components";
import { useFlutterBridgeFunc } from "@hooks";
import { authAtom } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

type TAuth = {
  membNo: string;
  membNm: string;
  reptMembNo: string;
  reptMembNm: string;
  bizNo: string;
  officeNm: string;
  profileImgPath: string;
  accessToken: string;
  refreshToken: string;
  permCd: string;
  dvceUnqNum: string;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authInfo, saveAuthInfo] = useAtom(authAtom);
  const [membNo, setMembNo] = useState("202309120001");
  const [updateComponent, setUpdateComponent] = useState(false);
  const { nextjsFunc, value } = useFlutterBridgeFunc();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["log-in"],
    queryFn: (): Promise<TAuth> =>
      fetch(
        // `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${membNo}&pwd=282011&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=PIN`,
        // `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${membNo}&pwd=123456&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=PIN`,
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/login?membNo=${membNo}&pwd=123456&fcmId=ZdadV1234GYH%26%25%24%23%24Ssdfgsdfgsd%21%24%24444423444&dvceUnqNum=System&method=BIO`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: false,
  });

  useEffect(() => {
    if (!!value.data && value.mode === "LOGIN") {
      saveAuthInfo(value.data as any);
      sessionStorage.setItem("flutter", `${value.mode} ${value.data}`);
    }
    if (!!data) {
      saveAuthInfo({
        ...data,
        isRept: data.permCd === "00" || data.permCd === "01",
      });
    }
  }, [value, data]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
    setUpdateComponent(!updateComponent);

    /iPhone/i.test(navigator?.userAgent)
      ? sessionStorage.setItem("isIos", "true")
      : sessionStorage.setItem("isIos", "");
  }, []);

  useEffect(() => {
    pathSpy();
  }, [pathname]);

  const pathSpy = () => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem("currentPath");

    if (!storage) {
      return;
    }

    storage.setItem("prevPath", prevPath!);
    storage.setItem("currentPath", globalThis?.location.pathname);
  };

  const mode = value.mode ?? "nothing";
  const flutterData = JSON.stringify(value.data);

  const authData =
    typeof window !== "undefined" && sessionStorage.getItem("auth");

  if (authInfo.bizNo && authInfo.bizNo !== "") {
    return <>{children}</>;
  }

  // 웹뷰 페이지일 경우 로그인 페이지 X
  if (
    pathname.includes("/view/cover") ||
    pathname.includes("/view/agreement") ||
    pathname.includes("/view/searchestm") ||
    pathname.includes("/view/searchcntr") ||
    pathname.includes("/view/link") ||
    pathname.includes("/terms/privacy") ||
    pathname.includes("/account/delete")
  ) {
    return <>{children}</>;
  }

  let isApp;

  if (typeof window !== "undefined") {
    if (/Android|iPhone/i.test(navigator?.userAgent)) {
      isApp = true;
    }
  }

  if (!authData && authData === null && updateComponent) {
    return (
      <Suspense fallback={<Loading />}>
        <div
          className={`${
            isApp ? "hidden" : "flex"
          } w-full h-full flex-col justify-center items-center px-4`}
        >
          <select
            className="w-full mb-2 p-4 bg-pink-50 border boder-2 border-b-kos-gray-200 rounded-xl"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setMembNo(e.currentTarget.value);
            }}
          >
            <option value="202309120001">
              202309120001✋🏼홍길동17 (대표, 승리)
            </option>
            <option value="202309120003">
              202309120003✋🏼홍삼동 (소속,승리)
            </option>
            <option value="202401310001">
              202401310001✋🏼원준패밀리 (X프론트 테스트용X)
            </option>
            <option value="202402200004">
              202402200004✋🏼원준패밀리 (X관리운영X)
            </option>
            <option value="202402190002">
              202402190002✋🏼원준패밀리 (X일반X)
            </option>
            <option value="202501100001">202501100001✋🏼송원</option>
            <option value="202501210009">202501210009✋🏼홍다인</option>
            <option value="202501020004">202501020004✋🏼박원준</option>
            <option value="202501220001">202501220001✋🏼송만물</option>
            <option value="202411220001">202411220001✋🏼홍금보</option>
            <option value="202303190008">202303190008✋🏼홍금빛</option>
            <option value="202303190007">2202303190007✋🏼홍금자</option>
            <option value="202411250006">202411250006✋🏼황혜미</option>
            <option value="202412120001">202412120001✋🏼권정아</option>
            <option value="202411220010">202411220010✋🏼박원준</option>
            <option value="202501220001">202501220001✋🏼김원준</option>
            <option value="202501020002">202501020002✋🏼정가은</option>
            <option value="202412230007">202412230007✋🏼송원섭5</option>
            <option value="202410080001">202410080001✋🏼GUEST</option>
            <option value="202404290001">202404290001✋🏼 테스트(대표)</option>
            <option value="202404290002">202404290002✋🏼 테스트(소속)</option>
            <option value="202407180001">202407180001✋🏼 이상협</option>
          </select>
          <button
            onClick={() => {
              refetch();
            }}
            style={{ lineBreak: "anywhere" }}
            className="bg-kos-orange-500 rounded-2xl text-kos-white px-6 py-3 w-full"
          >
            😶‍🌫️ {mode}
            <br />✨{flutterData}
          </button>
        </div>
      </Suspense>
    );
  }
  //  if(process.env.NEXT_PUBLIC_APP_MODE){
  //   if (!authData && authData === null && updateComponent) {
  //     return (
  //       <Suspense fallback={<Loading />}>
  //         <div className="w-full h-full flex flex-col justify-center items-center px-4">
  //           <select
  //             className="w-full mb-2 p-4 bg-pink-50 border boder-2 border-b-kos-gray-200 rounded-xl"
  //             onChange={(e: ChangeEvent<HTMLSelectElement>) => {
  //               setMembNo(e.currentTarget.value);
  //             }}
  //           >
  //             <option value="202309120001">
  //               202309120001✋🏼홍길동17 (대표, 승리)
  //             </option>
  //             <option value="202309120002">
  //               202309120002✋🏼홍육동 (소속,승리)
  //             </option>
  //             <option value="202309120003">
  //               202309120003✋🏼홍삼동 (소속,승리)
  //             </option>
  //             <option value="202309260001">
  //               202309260001✋🏼홍이동 (소속,승리)
  //             </option>
  //             <option value="202312050001">
  //               202312050001✋🏼노진구 (대표, 타이거)
  //             </option>
  //             <option value="202311200002">
  //               202311200002✋🏼최이슬 (소속, 타이거)
  //             </option>
  //             <option value="202401310001">
  //               202401310001✋🏼원준패밀리 (X프론트 테스트용X)
  //             </option>
  //             <option value="202402190002">
  //               202402190002✋🏼원준패밀리 (X관리운영X)
  //             </option>
  //                  <option value="202402190001">
  //             202402190001✋🏼원준패밀리 (X일반X)
  //             </option>
  //             <option value="202404040001">202401310001✋🏼 기획팀</option>
  //             <option value="202404290001">202404290001✋🏼 테스트(대표)</option>
  //             <option value="202404290002">202404290002✋🏼 테스트(소속)</option>
  //           </select>
  //           <button
  //             onClick={() => {
  //               refetch();
  //             }}
  //             style={{ lineBreak: "anywhere" }}
  //             className="bg-kos-orange-500 rounded-2xl text-white px-6 py-3 w-full"
  //           >
  //             😶‍🌫️ {mode}
  //             <br />✨{flutterData}
  //           </button>
  //         </div>
  //       </Suspense>
  //     );
  //   }
  //  }

  if (isLoading) {
    // 로딩이 끝난 후에는 아무것도 렌더링하지 않음
    return <Loading />;
  }

  return null;
}

export default AuthProvider;
