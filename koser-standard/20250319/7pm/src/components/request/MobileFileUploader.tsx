import { MouseEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { PlusMainIcon } from "@icons20";
import { CameraIcon } from "@icons50";
import { DatePicker, Typography } from "@components/common";
import { Button } from "@components/button";
import { Form, Label } from "@components/form";
import { useDatePicker, useDisclosure } from "@hooks";
import Webcam from "react-webcam";
import FileIndicator from "./FileIndicator";
import MobileFileListItem from "./MobileFileListItem";
import "@styles/file-uploader.css";

export type ImageListProps = {
  id: number;
  src: string;
}

export default function MobileFileUploader() {
  // const today = new Date();
  const { ...datePickerProps } = useDatePicker();

  const {
    isOpen: isCameraOpen,
    open: openCamera,
    close: closeCamera,
  } = useDisclosure();

  const {
    isOpen: isPreviewOpen,
    open: openPreview,
    close: closePreview,
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

    closeCamera();
    openPreview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, imageList]);

  // const phase2 = useCallback((event: MouseEvent) => {
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
  //   // closeCamera();
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [webcamRef, imageList]);

  const videoConstraints = {
    // facingMode: user(전면 카메라 제어) | environment(후면 카메라 제어)
    facingMode: "environment",
    width: 768,
    height: 1280,
  };

  console.log(imageList);

  return (
    <div className="_mobile-file-uploader-wrapper">
      <FileIndicator total={10} count={5} />

      <Form
        onSubmit={() => console.log("submit")}
        legendText="파일 업로드 양식"
        isHiddenLegend={true}
        onChange={() => console.log("change")}
        className="_mobile-file-upload-form"
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
          <MobileFileListItem imageList={imageList}
                              setImageList={setImageList}
          />
        </ul>

        <div className="_datepicker-wrapper">
          <Label
            htmlFor="desktop-execution-date"
            required={true}
            labelText="대출실행일"
          />
          <DatePicker
            id="desktop-execution-date"
            {...datePickerProps}
            // startDate={today}
          />
        </div>

        <div className="_button-wrap">
          <Button
            shape="solid"
            size="md"
            color="grayscale"
            onClick={() => console.log("목록")}>
            목록
          </Button>

          <Button
            shape="solid"
            size="md"
            color="main100"
            onClick={() => console.log("제출하기")}>
            제출하기
          </Button>
        </div>
      </Form>

      {(isCameraOpen || isPreviewOpen) &&
        <>
          <div className="_camera-backdrop"></div>
          <div className="_camera">
            <div className="_camera-inner-wrapper">
              {isCameraOpen &&
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={1}
                  videoConstraints={videoConstraints}
                />
              }

              {isPreviewOpen &&
                <Image src={imageList[0].src} alt="사진 촬영 카메라 아이콘" width={50} height={50} />
              }
            </div>

            {isCameraOpen &&
              <button
                type="button"
                aria-label="사진 촬영"
                onClick={capture}
              >
                <Image src={CameraIcon} alt="사진 촬영 카메라 아이콘" width={50} height={50} />
              </button>
            }

            {isPreviewOpen &&
              <div className="_button-wrap">
                <Button
                  shape="solid"
                  size="md"
                  color="grayscale"
                  onClick={() => {
                    closePreview();
                    openCamera();
                    // TODO: 이미지 배열 초기화 필요
                  }}>
                  다시 촬영
                </Button>

                <Button
                  shape="solid"
                  size="md"
                  color="main100"
                  onClick={() => {
                    closePreview();
                  }}>
                  사진 업로드하기
                </Button>
              </div>
            }
          </div>
        </>
      }
    </div>
  );
}