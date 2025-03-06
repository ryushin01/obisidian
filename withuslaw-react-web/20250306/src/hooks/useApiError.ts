import { useCallback } from "react";
import { redirect } from "next/navigation";

export interface ICustomError {
  error: string;
  statusCode: string;
  message: string;
  code: string;
}

export interface IValidationError extends ICustomError {
  validationErrorInfo: { [key: string]: string };
}

export type TCustomErrorResponse = {
  method: string;
  timestamp: number;
  statusCode: string;
  path: string;
  error: ICustomError;
};

// 506 중복로그인 처리
const useApiError = () => {
  const handleError = useCallback(() => {
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "DUPLICATE_LOGIN",
    });
  }, []);
  return { handleError } as const;
};

export default useApiError;
