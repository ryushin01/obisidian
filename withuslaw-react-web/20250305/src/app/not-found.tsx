"use client";

import { useGoHome } from "@hooks";

export default function NotFound() {
  const goHome = useGoHome();

  return (
    <main className="min-h-screen _flex-center flex-col text-center">
      <section className="flex flex-col w-full px-[10%]">
        <h1 className="text-[32px]">404 Error</h1>
        <p className="mt-9 mb-[60px] text-base">
          페이지를 찾을 수 없습니다. <br />
          홈으로 이동해 주세요.
        </p>
        <button
          type="button"
          onClick={goHome}
          className="block w-full py-4 rounded-xl bg-kos-orange-500 text-kos-white text-base no-underline"
        >
          홈으로
        </button>
      </section>
    </main>
  );
}
