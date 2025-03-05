import React from "react";
import Image from "next/image";
import { CameraGray, CameraWhite } from "@icons";

type TProps = {
  onClick?: () => void;
  isProfile?: "Empty" | "Full";
  imgSeq: string;
};

/**
 * isProfile에 따라 카메라 아이콘 색 변경 및 DIM 처리
 */

export default function Profile({
  onClick,
  isProfile = "Empty",
  imgSeq,
}: TProps) {
  return (
    <>
      {isProfile === "Full" ? (
        <div className={``} onClick={onClick}>
          <div className="relative">
            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden after after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[rgba(18,_18,_18,_0.40)] after:z-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchview?imgSeq=${imgSeq}`}
                alt="profile img"
                unoptimized={true}
                width={80}
                height={80}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className=" flex justify-center items-center left-0 top-0 w-full h-full bg-no-repeat">
                <Image
                  src={CameraWhite}
                  alt="profile"
                  className="z-[1]"
                  style={{
                    position: "absolute",
                    translate: "-50% -50%",
                    left: "50%",
                    top: "50%",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[80px] h-[80px] bg-kos-gray-100 rounded-full overflow-hidden"
          onClick={onClick}
        >
          <span className="flex justify-center items-center left-0 top-0 w-full h-full bg-no-repeat">
            <Image src={CameraGray} alt="profile" />
          </span>
        </div>
      )}
    </>
  );
}
