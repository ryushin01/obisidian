import { MouseEvent, ReactNode, useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { CameraIcon } from "@icons50";
import Webcam from "react-webcam";
import "@styles/camera.css";

export type ImageListProps = {
  id: number;
  src: string;
}

type CameraProps = {
  onClose: () => void;
}

export default function Camera({ onClose }: CameraProps) {
  const portal = document.getElementById("portal");

  const webcamRef = useRef(null);
  const [imageList, setImageList] = useState<ImageListProps[]>([]);
  const updatedImageList = [...imageList];

  const capture = useCallback((event: MouseEvent) => {
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const imageSrc = webcamRef.current!.getScreenshot();

    updatedImageList.push({
      id: imageList.length,
      src: imageSrc,
    });

    setImageList(updatedImageList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, imageList]);

  const videoConstraints = {
    // facingMode: user(전면 카메라 제어) | environment(후면 카메라 제어)
    facingMode: "environment",
    width: 768,
    height: 1280,
  };

  if (!portal) return null;

  return ReactDOM.createPortal(
    <div className="_camera">
      <div className="_camera-inner-wrapper">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
        />
      </div>

      <button
        type="button"
        aria-label="사진 촬영"
        onClick={() => console.log("찰칵!")}
      >
        <Image src={CameraIcon} alt="사진 촬영 카메라 아이콘" width={50} height={50} />
      </button>
    </div>,
    portal as Element,
  );
}