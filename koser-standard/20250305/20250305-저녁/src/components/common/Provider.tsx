"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * @name Provider
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description - 이 컴포넌트는 TanStack Query v5 기준으로 개발되었습니다.
 *              - 해당 컴포넌트는 반드시 클라이언트 컴포넌트이어야 합니다.
 *              - import 시 객체 타입은 에러를 발생합니다. 즉, Barrel Export Pattern을 사용할 수 없습니다.
 */
export default function Provider({
                                   children,
                                 }: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    // 1. App 전체에서 TanStack Query를 사용할 수 있게 QueryClientProvider로 래핑합니다.
    // 2. 각종 상태를 저장하고, 부가 기능을 제공하는 queryClient를 Providers 주입합니다.
    <QueryClientProvider client={queryClient}>
      {children}

      {/* 3. TanStack Query 전용 개발자 도구를 추가합니다. 이 도구는 기본적으로 개발 환경에서 노출, 프로덕션 환경에서 미노출됩니다. 또한, initialIsOpen 값을 true로 주면 개발자 도구가 열린 상태로 화면이 렌더링 됩니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
