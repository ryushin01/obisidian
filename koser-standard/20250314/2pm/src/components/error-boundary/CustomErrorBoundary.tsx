"use client";

import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Loading } from "@components/common";
import { Fallback } from "@components/error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type CustomErrorBoundaryProps = {
  element: ReactNode;
}

/**
 * @name CustomErrorBoundary
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description - 이 컴포넌트는 에러가 발생한 부분에서 에러 메시지와 같은 Fallback UI를 표현합니다.
 *              - 이 방식은 렌더링 과정 자체에서 발생하는 에러를 캐치하기 때문에 비동기 통신에서 발생하는 에러는 캐치할 수 없습니다.
 *              - 이 방식을 '서스펜스에 에러 바운더리를 씌워서 로딩 처리'한다고 합니다.
 *              - react-error-boundary 사용 시 클라이언트 컴포넌트이어야 합니다.
 */
const CustomErrorBoundary = ({ element }: CustomErrorBoundaryProps) => {
  const pathname = usePathname();
  // TanStack Query에서 제공하는 훅으로, 발생한 가장 가까운 에러를 초기화합니다.
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      // key 값 변경 시(유저가 에러가 발생한 상황에서 벗어날 수 있는 작업을 하면) Error Boundary가 Unmount 후 다시 Mount
      key={pathname}
      // 컴포넌트 형태로 Fallback UI 제공
      FallbackComponent={Fallback}
      // 에러 초기화 함수 전달
      onReset={reset}
    >
      {/* 자식인 element의 로딩이 완료될 때까지 fallback의 값인 Spinner 노출 */}
      <Suspense fallback={<Loading />}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
