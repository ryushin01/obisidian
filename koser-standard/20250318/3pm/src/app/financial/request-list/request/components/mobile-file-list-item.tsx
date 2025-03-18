import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { CancelWhiteIcon } from "@icons14";
import { ImageListProps } from "./mobile-file-uploader";

type MobileFileListItemProps = {
  imageList: ImageListProps[];
  setImageList: Dispatch<SetStateAction<ImageListProps[]>>;
}

export default function MobileFileListItem({ imageList, setImageList }: MobileFileListItemProps) {

  const removeImageListItem = (id: number) => {
    setImageList(imageList.filter(item => item.id !== id));
  };

  return (
    <>
      {imageList?.map((item) => {
        const { id, src } = item;
        return (
          <li key={id}>
            <Image src={src} alt={`${id + 1}번 임시 이미지`} width={100} height={100} />
            <button
              type="button"
              aria-label="해당 이미지 삭제"
              onClick={() => {
                removeImageListItem(id);
              }}
              className="_delete-single-file-button"
            >
                <span>
                  <Image src={CancelWhiteIcon} alt="단일 이미지 삭제 아이콘" width={14} height={14} />
                </span>
            </button>
          </li>
        );
      })}
    </>
  );
}