declare global {
  interface Window {
    nextjsFunc: (params: TParam) => void;
    webkit: {
      messageHandlers: {
        flutterFunc: {
          postMessage: (parameter: string) => void;
        };
      };
    };
  }
}

export type TNumberKeyObj = {
  [key: number]: any;
};

export type TStringKeyObj = {
  [key: string]: any;
};
