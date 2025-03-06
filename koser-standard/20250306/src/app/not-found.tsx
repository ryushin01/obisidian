"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const goToPreviousPage = () => router.back();
  const goToHomePage = () => router.push("/");

  return (
    <section>
      <h1>404 Error</h1>
      <div>
        <button type="button" onClick={goToPreviousPage}>이전 페이지로 돌아가기</button>
        <button type="button" onClick={goToHomePage}>홈으로 이동하기</button>
      </div>
    </section>
  );
}
