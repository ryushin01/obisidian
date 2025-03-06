export default function toggleDimmedBottomNavigation(isDimmed: boolean) {
  const stringifyIsDimmed = String(isDimmed);

  if (process.env.NEXT_PUBLIC_APP_MODE !== "local") {
    setTimeout(() => {
      // @ts-ignore
      window.flutter_inappwebview.callHandler("flutterFunc", {
        mode: "BOTTOM_DIM",
        data: {
          isDimmed: stringifyIsDimmed,
        },
      });
    }, 300);
  }
}
