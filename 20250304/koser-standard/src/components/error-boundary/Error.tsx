"use client";

import { useRouter } from "next/navigation";
import { useErrorBoundary } from "react-error-boundary";

/**
 * @name Error
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description react-error-boundary 사용 시 클라이언트 컴포넌트이어야 합니다.
 */
const Error = () => {
  const router = useRouter();
  const { resetBoundary } = useErrorBoundary();

  const goToHomePage = () => router.push("/");

  return (
    <div className="_flex-center flex-col">
      <p>일시적인 오류가 발생했습니다.</p>
      <button type="button" onClick={resetBoundary}>새로고침</button>
      <button type="button" onClick={goToHomePage}>홈으로 이동하기</button>
    </div>
  );
};

export default Error;