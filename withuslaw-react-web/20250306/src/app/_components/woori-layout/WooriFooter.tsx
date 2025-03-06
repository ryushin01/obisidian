import Image from "next/image";
import { KosLogoWithText } from "@icons";

export default function WooriFooter() {
  return (
    <footer className="flex flex-col items-center">
      <p className="text-xs leading-4 font-medium -tracking-[0.24px] text-kos-gray-700 text-center">
        서류 제출 화면은 (주)뱅크클리어에서 제공하며,
        <br />
        제출 완료 시 서류 이미지는 우리은행으로 전달됩니다.
      </p>

      <span className="mt-[5px] mb-[10px] text-xs leading-4 font-semibold -tracking-[0.24px] text-kos-gray-800">
        이용문의: (주)뱅크클리어 고객센터{" "}
        <a href="tel:02-1877-2495">1877-2495</a>
      </span>

      <div className="w-[58px]">
        <Image src={KosLogoWithText} alt="KOS 로고" />
      </div>
    </footer>
  );
}
