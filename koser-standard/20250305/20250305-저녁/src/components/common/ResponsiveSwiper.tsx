import { isBrowser } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@styles/responsive-swiper.css";

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
    <>
      <Swiper
        className={`_responsive-swiper ${className}`}
        // 사용 모듈 정의
        modules={[Controller, Navigation, Pagination]}
        // swiper-wrapper 태그 정의
        wrapperTag="ul"
        // 한 번에 노출할 슬라이드 개수 정의
        slidesPerView={"auto"}
        // 반응형 웹 중단점
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
        }}
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
          Slide 1
        </SwiperSlide>
        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          Slide 2
        </SwiperSlide>
        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          Slide 3
        </SwiperSlide>
        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          Slide 4
        </SwiperSlide>
        <SwiperSlide
          // swiper-slide 태그 정의
          tag="li"
        >
          Slide 5
        </SwiperSlide>

        <button type="button" className="_btn-prev">이전</button>
        <button type="button" className="_btn-next">다음</button>
      </Swiper>
    </>
  );
}
