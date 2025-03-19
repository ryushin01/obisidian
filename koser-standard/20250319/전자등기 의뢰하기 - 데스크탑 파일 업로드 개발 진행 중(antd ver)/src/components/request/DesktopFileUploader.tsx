import { useState } from "react";
import { PlusWhiteIcon } from "@icons20";
import { DatePicker, Typography } from "@components/common";
import { Form, Label } from "@components/form";
import { Button } from "@components/button";
import { useDatePicker } from "@hooks";
import type { UploadProps } from "antd";
import { Upload, message, List } from "antd";
import FileIndicator from "./FileIndicator";
import "@styles/file-uploader.css";
import Image from "next/image";

export default function DesktopFileUploader() {
  const [fileList, setFileList] = useState([]);
  const { Dragger } = Upload;
  const { ...datePickerProps } = useDatePicker();

  // const handleChange = (info) => {
  //   setFileList((prev) => [...prev, info.file]);
  // };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    accept: ".jpg, .png, .pdf",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // 업로드 URL
    maxCount: 10, // 최대 업로드 파일 갯수
    listType: "text", // 업로드된 파일 목록의 표시 형식을 설정합니다.  'text' | 'picture' | 'picture-card'

    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },

    // onChange: handleChange,

    beforeUpload: () => false, // 자동 업로드 방지
  };

  return (
    <div className="_desktop-file-uploader-wrapper">
      <FileIndicator />

      <Form
        onSubmit={() => console.log("submit")}
        legendText="파일 업로드 양식"
        isHiddenLegend={true}
        onChange={() => console.log("change")}
        className="_desktop-file-upload-form"
      >
        <div className="_desktop-file-uploader">
          <Dragger {...props}>
            <Typography kind="title-large" className="text-koser-grayscale-90">이곳에 파일을 끌어다 놓거나, 파일 선택 버튼으로
              업로드하세요.</Typography>
            <Button
              shape="solid"
              size="md"
              color="main60"
              icon={
                <Image
                  src={PlusWhiteIcon}
                  alt="파일 추가 아이콘"
                  width={20}
                  height={20}
                />
              }
              iconPosition="right"
            >
              파일 선택
            </Button>
          </Dragger>


          {/*<Upload {...props}>*/}
          {/*  <button type="button">업로드</button>*/}
          {/*</Upload>*/}

          {/*<List*/}
          {/*  bordered*/}
          {/*  dataSource={fileList}*/}
          {/*  renderItem={(item) => (*/}
          {/*    <List.Item>*/}
          {/*      {item.name} - {Math.round(item.size / 1024)} KB{" "}*/}
          {/*    </List.Item>*/}
          {/*  )}*/}
          {/*/>*/}
        </div>

        <div className="_datepicker-wrapper">
          <Label
            htmlFor="mobile-execution-date"
            required={true}
            labelText="대출실행일"
          />
          <DatePicker id="mobile-execution-date" {...datePickerProps} />
        </div>

        <div className="_button-wrap">
          <Button
            shape="solid"
            size="lg"
            color="grayscale"
            onClick={() => console.log("목록")}>
            목록
          </Button>

          <Button
            shape="solid"
            size="lg"
            color="main100"
            onClick={() => console.log("제출하기")}>
            제출하기
          </Button>
        </div>
      </Form>
    </div>
  );
}