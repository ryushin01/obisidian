"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TCommonParam = {
  [key: string]: string;
};

type TValue = {
  mode: string;
  data: any;
  code: string;
};

export default function useFlutterBridgeFunc() {
  const [value, setValue] = useState<TValue>({
    mode: "",
    data: null,
    code: "",
  });
  const router = useRouter();

  const nextjsFunc = (props: string) => {
    const json = JSON.parse(props) as TCommonParam;
    const mode = json["mode"];
    const data = json["data"];
    if (mode === "LOGIN") {
      console.debug("=========flutter LOGIN=========");
      setValue({
        mode: "LOGIN",
        data: data ?? {},
        code: "",
      });
    }

    if (mode === "IMAGE") {
      console.debug("=========flutter IMAGE=========");
      setValue({
        mode: "IMAGE",
        data: data,
        code: "",
      });
    }

    if (mode === "ROUTER") {
      console.debug("=========flutter IMAGE=========");
      router.replace(data);
    }

    if (mode === "LOCATION") {
      setValue({
        mode: "LOCATION",
        data: data,
        code: "",
      });
    }
  };

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  return { nextjsFunc, value };
}
