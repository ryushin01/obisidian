import { useState } from "react";
import { DatePicker } from "@components/common";
import { Form, Label } from "@components/form";
import { Button } from "@components/button";
import { useDatePicker } from "@hooks";
import { Upload, List } from "antd";
import FileIndicator from "./FileIndicator";

export default function DesktopFileUploader() {
  const [fileList, setFileList] = useState([]);
  const { ...datePickerProps } = useDatePicker();

  const handleChange = (info) => {
    setFileList((prev) => [...prev, info.file]);
  };

  const props = {
    multiple: true,
    accept: ".jpg, .png, .pdf",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // 업로드 URL
    showUploadList: false, //업로드된 파일 목록을 표시할지 여부를 결정합니다. 기본값은 true
    listType: "text", // 업로드된 파일 목록의 표시 형식을 설정합니다.  'text' | 'picture' | 'picture-card'
    onChange: handleChange,
    //onRemove: handleRemove,
    // beforeUpload: (file) => {
    //   const isLt2M = file.size / 1024 / 1024 < 2; // 2MB 이하
    //   if (!isLt2M) {
    //     message.error("파일 크기는 2MB 이하이어야 합니다.");
    //   }
    //   return isLt2M;
    //},
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
          <Upload {...props}>
            <button type="button">업로드</button>
          </Upload>

          <List
            bordered
            dataSource={fileList}
            renderItem={(item) => (
              <List.Item>
                {item.name} - {Math.round(item.size / 1024)} KB{" "}
              </List.Item>
            )}
          />
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