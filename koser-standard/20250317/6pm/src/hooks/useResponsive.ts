import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * @name useResponsive
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 */

export default function useResponsive(): [boolean] {
  const [isMobile, setIsMobile] = useState(false);
  const mobileResolution = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMobile(mobileResolution);
  }, [mobileResolution]);

  if (typeof window !== "undefined") {
    if (isMobile) {
      sessionStorage.setItem("isMobile", "true");
    } else {
      sessionStorage.setItem("isMobile", "");
    }
  }

  return [isMobile];
}
