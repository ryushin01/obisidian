import Image from "next/image";
import { LeftArrowIcon, RightArrowIcon } from "@icons24";
import { Frame } from "@components/common";
import { isBrowser } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@styles/responsive-swiper.css";
import { Image1, Image2, Image3, Image4 } from "@images";

type ResponsiveSwiperProps = {
  className?: string;
}

/**
 * @name ResponsiveSwiper
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 */
export default function ResponsiveSwiper({
                                           className = "",
                                         }: ResponsiveSwiperProps) {
  return (
    <div className="_responsive-swiper-wrapper">
      <Swiper
        className={`_responsive-swiper ${className}`}
        // 사용 모듈 정의
        modules={[Controller, Navigation, Pagination]}
        // swiper-wrapper 태그 정의
        wrapperTag="ul"
        // 한 번에 노출할 슬라이드 개수 정의
        slidesPerView={"auto"}
        // 페이지네이션
        pagination={{
          type: isBrowser ? "fraction" : "progressbar",
        }}
        navigation={{
          prevEl: "._btn-prev",
          nextEl: "._btn-next",
        }}
        onSlideChange={() => console.log("slide change")}
      >
        {/* map method */}
        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          <Frame>
            <Image src={Image4} alt="1번 이미지" />
          </Frame>
        </SwiperSlide>

        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          <Frame>
            <Image src={Image4} alt="2번 이미지" />
          </Frame>
        </SwiperSlide>

        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          <Frame>
            <Image src={Image4} alt="3번 이미지" />
          </Frame>
        </SwiperSlide>

        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          <Frame>
            <Image src={Image4} alt="4번 이미지" />
          </Frame>
        </SwiperSlide>
      </Swiper>

      <button type="button" className="_btn-prev" aria-label="이전 슬라이드 보기">
        <Image src={LeftArrowIcon} alt="좌측 화살표 아이콘" width={24} height={24} />
      </button>
      <button type="button" className="_btn-next" aria-label="다음 슬라이드 보기">
        <Image src={RightArrowIcon} alt="우측 화살표 아이콘" width={24} height={24} />
      </button>
    </div>
  );
}
