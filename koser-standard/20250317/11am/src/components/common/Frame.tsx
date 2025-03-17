import { ReactNode } from "react";
import "@styles/frame.css";

type FrameProps = {
  aspectRatio?: "square" | "video" | "inherit";
  children: ReactNode;
}

/**
 * @name Frame
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {string} aspectRatio   - 이미지 프레임 비율(기본값: 부모 높이) > 1:1 비율(square) / 16:9 비율(video) / 부모 높이 상속(inherit)
 */
export default function Frame({ aspectRatio = "inherit", children }: FrameProps) {
  return (
    <span className={`_frame 
    ${aspectRatio === "inherit"
      ? "h-full"
      : aspectRatio === "square"
        ? "aspect-square"
        : "aspect-video"
    }`}>
      {children}
    </span>
  );
}