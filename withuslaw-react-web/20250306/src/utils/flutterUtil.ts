const flutterFunc = (args: Object) => {
  const flutterProps = JSON.stringify(args);
  // for flutter
  // @ts-ignore
  if (typeof flutterFunc == "object") {
    console.log("flutterFunc.postMessage();");
    // @ts-ignore
    flutterFunc?.postMessage(flutterProps);
    return;
  }
  if (
    // @ts-ignore
    typeof webkit != "undefined" &&
    // @ts-ignore
    typeof webkit.messageHandlers.flutterFunc != "undefined"
  ) {
    // android
    console.log("webkit.messageHandlers.flutterFunc.postMessage()");
    // @ts-ignore
    webkit.messageHandlers?.flutterFunc?.postMessage(flutterProps);
    return;
  }
  if (
    // @ts-ignore
    typeof Mobile != "undefined" &&
    // @ts-ignore
    typeof Mobile.flutterFunc == "function"
  ) {
    console.log("Mobile.flutterFunc()");
    // @ts-ignore
    Mobile?.flutterFunc(flutterProps);
    return;
  }

  console.log("window.webkit.messageHandlers.flutterFunc.postMessage()");
  window.webkit?.messageHandlers?.flutterFunc?.postMessage(flutterProps);
};

const phoneInquiry = () => {
  //@ts-ignore
  window.flutter_inappwebview.callHandler("flutterFunc", {
    // @ts-ignore
    mode: "PHONE_CALL",
    data: {
      phoneNo: "1877-2945",
    },
  });
};

export { flutterFunc, phoneInquiry };

/**
 * 페이지 이동
 * 홈 -> 사건 상세
 * 내 사건 -> 사건 상세
 * 내 사건 -> 사건 수임
 * 사건 수임 -> 견적서 작성
 * 상환금 수령용 계좌 -> 내 사건
 * 상환금 수령용 계좌 -> 내 정보 리스트
 * 사건 수임 -> 법무 수수료 안내용 계좌
 */
