// import { MouseEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { PlusMainIcon } from "@icons20";
import { Typography } from "@components/common";
import { Form, Label } from "@components/form";
import { useDisclosure } from "@hooks";
// import Webcam from "react-webcam";
// import MobileFileListItem from "./mobile-file-list-item";
import Camera from "./camera";
import "@styles/file-uploader.css";

// export type ImageListProps = {
//   id: number;
//   src: string;
// }

export default function MobileFileUploader() {
  const {
    isOpen: isCameraOpen,
    open: openCamera,
    close: closeCamera,
  } = useDisclosure();

  // const webcamRef = useRef(null);
  // const [imageList, setImageList] = useState<ImageListProps[]>([]);
  // const updatedImageList = [...imageList];
  //
  // const capture = useCallback((event: MouseEvent) => {
  //   event.preventDefault();
  //
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   const imageSrc = webcamRef.current!.getScreenshot();
  //
  //   updatedImageList.push({
  //     id: imageList.length,
  //     src: imageSrc,
  //   });
  //
  //   setImageList(updatedImageList);
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [webcamRef, imageList]);
  //
  // const videoConstraints = {
  //   // facingMode: user(전면 카메라 제어) | environment(후면 카메라 제어)
  //   facingMode: "environment",
  // };

  return (
    <Form
      onSubmit={() => console.log("submit")}
      legendText="파일 업로드 양식"
      isHiddenLegend={true}
      onChange={() => console.log("change")}
    >
      {/*<Webcam*/}
      {/*  ref={webcamRef}*/}
      {/*  audio={false}*/}
      {/*  screenshotFormat="image/jpeg"*/}
      {/*  width="100%"*/}
      {/*  height="100%"*/}
      {/*  screenshotQuality={1}*/}
      {/*  videoConstraints={videoConstraints}*/}
      {/*/>*/}

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
        <Camera onClose={closeCamera} />
      }

      {/*<ImageList imageList={imageList}*/}
      {/*           setImageList={setImageList}*/}
      {/*/>*/}
    </Form>
  );
}