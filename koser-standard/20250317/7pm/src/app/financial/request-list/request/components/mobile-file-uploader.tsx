import { MouseEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { PlusMainIcon } from "@icons20";
import { CameraIcon } from "@icons50";
import { Typography } from "@components/common";
import { Form, Label } from "@components/form";
import { useDisclosure } from "@hooks";
// import MobileFileListItem from "./mobile-file-list-item";
import Webcam from "react-webcam";
import "@styles/file-uploader.css";

export type ImageListProps = {
  id: number;
  src: string;
}

export default function MobileFileUploader() {
  const {
    isOpen: isCameraOpen,
    open: openCamera,
    close: closeCamera,
  } = useDisclosure();

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

  return (
    <Form
      onSubmit={() => console.log("submit")}
      legendText="파일 업로드 양식"
      isHiddenLegend={true}
      onChange={() => console.log("change")}
    >
      <ul className="_mobile-file-list">
        <li>
          <button
            type="button"
            onClick={openCamera}
            className="_take-picture-button"
          >
            <Image src={PlusMainIcon} alt="사진 촬영 더하기 아이콘" width={20} height={20} />
            <Typography kind="body-medium" isBold={true} className="text-koser-main-100">사진 촬영</Typography>
          </button>
        </li>
        {/*<MobileFileListItem*/}
        {/*  imageList={imageList}*/}
        {/*  setImageList={setImageList}*/}
        {/*/>*/}
      </ul>

      {isCameraOpen &&
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
            // onClick={capture}
            onClick={() => console.log("찰칵!")}
          >
            <Image src={CameraIcon} alt="사진 촬영 카메라 아이콘" width={50} height={50} />
          </button>
        </div>
      }

      {/*<ImageList imageList={imageList}*/}
      {/*           setImageList={setImageList}*/}
      {/*/>*/}
    </Form>
  );
}