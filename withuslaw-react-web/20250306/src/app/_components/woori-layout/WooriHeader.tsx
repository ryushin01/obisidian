import Image from "next/image";
import { WooriBankIcon } from "@icons";

export default function WooriHeader() {
  return (
    <header className="pt-4 pb-2 px-4 border-b border-solid border-kos-gray-200">
      <h1>
        <Image src={WooriBankIcon} alt="우리은행 로고" />
      </h1>
    </header>
  );
}
