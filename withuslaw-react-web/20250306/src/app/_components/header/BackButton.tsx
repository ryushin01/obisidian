"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeaderBack } from "@icons";

function BackButton({
                      backPath,
                      backCallBack
                    }: {
  backPath?: string;
  backCallBack?: () => void;
}) {
  const router = useRouter();
  const back = () =>
    backCallBack ?? backCallBack
      ? backCallBack()
      : backPath && backPath !== ""
        ? router.push(backPath)
        : router.back();

  return (
    <button type="button" onClick={back} className="w-full h-full p-4">
      <Image src={HeaderBack} width={10} alt="뒤로 가기 아이콘" />
    </button>
  );
}

export default BackButton;
