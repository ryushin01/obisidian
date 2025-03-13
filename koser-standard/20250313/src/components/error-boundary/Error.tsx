"use client";

import { useRouter } from "next/navigation";

type ErrorProps = {
  onReset?: () => void;
}

/**
 * @name Error
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description react-error-boundary 사용 시 클라이언트 컴포넌트이어야 합니다.
 * @property {function} onReset   - 에러 초기화 함수
 */
const Error = ({ onReset }: ErrorProps) => {
  const router = useRouter();

  // TODO: 새로고침 실패 시 토스트 노출?

  return (
    <div className="_flex-center flex-col">
      <p>일시적인 오류가 발생했습니다.</p>
      <button type="button" onClick={onReset}>새로고침</button>
      <button type="button" onClick={() => router.push("/")}>홈으로 이동하기</button>
    </div>
  );
};

export default Error;