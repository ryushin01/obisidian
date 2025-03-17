import { MouseEvent, useCallback, useRef, useState } from "react";
import { Form } from "@components/form";
import MobileFileList from "./mobile-file-list";
import Webcam from "react-webcam";

export type ImageListProps = {
  id: number;
  src: string;
}

export default function MobileFileUploader() {
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
  };

  return (
    <Form
      onSubmit={() => console.log("submit")}
      legendText="파일 업로드 양식"
      isHiddenLegend={true}
      onChange={() => console.log("change")}
    >
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
        screenshotQuality={1}
        videoConstraints={videoConstraints}
      />


      <MobileFileList
        capture={capture}
        imageList={imageList}
        setImageList={setImageList}
      />
      {/*<ImageList imageList={imageList}*/}
      {/*           setImageList={setImageList}*/}
      {/*/>*/}
    </Form>
  );
}