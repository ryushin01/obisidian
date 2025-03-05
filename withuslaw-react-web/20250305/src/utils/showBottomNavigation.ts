export default function showBottomNavigation(type: boolean) {
  const stringifyType = String(type);

  if (process.env.NEXT_PUBLIC_APP_MODE !== "local") {
    setTimeout(() => {
      // @ts-ignore
      window.flutter_inappwebview.callHandler("flutterFunc", {
        mode: "BOTTOM",
        data: {
          type: stringifyType,
        },
      });
    }, 300);
  }
}
