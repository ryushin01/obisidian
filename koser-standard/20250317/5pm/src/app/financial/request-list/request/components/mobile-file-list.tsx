import { Dispatch, MouseEvent, SetStateAction } from "react";
import Image from "next/image";
import { CancelWhiteIcon } from "@icons14";
import { PlusMainIcon } from "@icons20";
import { Typography } from "@components/common";
import { ImageListProps } from "./mobile-file-uploader";
import "@styles/file-uploader.css";

type MobileFileListProps = {
  imageList: ImageListProps[];
  setImageList: Dispatch<SetStateAction<ImageListProps[]>>;
  capture: (event: MouseEvent) => void;
}

export default function MobileFileList({ imageList, setImageList, capture }: MobileFileListProps) {

  const removeImageListItem = (id: number) => {
    setImageList(imageList.filter(item => item.id !== id));
  };

  return (
    <>
      <ul className="_mobile-file-list">
        <li>
          <button
            type="button"
            onClick={capture}
            className="_take-picture-button"
          >
            <Image src={PlusMainIcon} alt="사진 촬영 더하기 아이콘" width={20} height={20} />
            <Typography kind="body-medium" isBold={true} className="text-koser-main-100">사진 촬영</Typography>
          </button>
        </li>
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
      </ul>
    </>
  );
}


// import './ImageList.scss'
//
// const ImageList = (props) => {
//   const { imageList, setImageList } = props;
//
//   /**
//    * 이미지 목록 아이템 중 특정 아이템을 개별 삭제하기 위한 함수
//    * @param {number} id
//    * @returns {number} number1 + number2
//    */
//   const removeImageListItem = (id) => {
//     setImageList(imageList.filter(item => item.id !== id))
//   }
//
//   return (
//     <>
//       <ul className="image-list">
//       {imageList.map((item) => {
//           const { id, src }= item;
//           return (
//             <li key={id}>
//             <img src={src} alt={`${id + 1}번 임시 이미지`} />
//           <button
//           type="button"
//           aria-label="해당 이미지 삭제"
//           onClick={() => {removeImageListItem(id)}}
//         >X</button>
//           </li>
//         )
//         })}
//       </ul>
//       </>
//   );
// };
//
// export default ImageList;
