import { useRouter } from "next/navigation";

export default function useGoHome() {
  const router = useRouter();

  return () => {
    router.push("/");

    // 로컬 테스트 환경에서는 플러터 미호출 제어
    if (process.env.NEXT_PUBLIC_APP_MODE !== "local") {
      // @ts-ignore
      window.flutter_inappwebview.callHandler("flutterFunc", {
        mode: "GO_HOME",
      });
    }
  };
}
