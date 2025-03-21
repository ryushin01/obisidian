import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { CancelIcon } from "@icons18";
import { Typography } from "@components/common";
import { DesktopImageListProps } from "./DesktopFileUploader";

type DesktopFileListItemProps = {
  imageList: DesktopImageListProps[];
  setImageList?: Dispatch<SetStateAction<DesktopImageListProps[]>>;
}

export default function DesktopFileList({ imageList, setImageList }: DesktopFileListItemProps) {

  // const removeImageListItem = (uid: number) => {
  //   setImageList(imageList.filter(item => item.uid !== uid));
  // };

  console.log(imageList);

  return (
    <>
      {imageList.length > 0 &&
        <ul className="_desktop-file-list">
          {imageList?.map((item) => {
            const { uid, name, size } = item;
            return (
              <li key={uid}>
                <button
                  type="button"
                  aria-label="해당 이미지 삭제"
                  // onClick={() => {
                  //   removeImageListItem(uid);
                  // }}
                  className="_delete-single-file-button"
                >
                <span>
                  <Image src={CancelIcon} alt="단일 이미지 삭제 아이콘" width={18} height={18} />
                </span>
                </button>

                <Typography kind="title-small">
                  {name} - {Math.round(size / 1024)} KB
                </Typography>
              </li>
            );
          })}
        </ul>
      }
    </>
  );
}