import Image from "next/image";
import { Spinner } from "@common";
import "@styles/spinner.css";

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-grayscaleF">
        <div className="_flex-center">
          <Image
            src={Spinner}
            alt="로딩 스피너"
            width={56}
            height={56}
            className="_spinner"
          />
        </div>
      </div>
    </>
  );
}
