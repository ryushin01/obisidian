import loading from "@json/loading.json";
import Lottie from "lottie-react";


export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-grayscaleF">
        <div className="w-1/2 h-1/2">
          <Lottie animationData={loading} />
        </div>
      </div>
    </>
  );
}