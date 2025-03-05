import React, { useState } from "react";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { TextButton } from "@components/button";
import { toastState } from "@stores";
import { useSetAtom } from "jotai";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type TProps = {
  SaveTime: () => void;
  setIsShow: any;
  clientForm: TEstimateSaveForm;
  setSelectedHourIndex: any;
  setSelectedMinuteIndex: any;
};

export default function SchdlTime({
  SaveTime,
  setIsShow,
  clientForm,
  setSelectedHourIndex,
  setSelectedMinuteIndex,
}: TProps) {
  const callToast = useSetAtom(toastState);
  const Hours = Array.from({ length: 24 }, (_, index) => index.toString());
  const Minutes = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0")
  );
  const NowHours = new Date().getHours();
  const NowMinutes = new Date().getMinutes();
  const [hourSwipers, setHourSwiper] = useState<SwiperCore | any>(NowHours);
  const [minuteSwiper, setMinuteSwiper] = useState<SwiperCore | any>(
    NowMinutes
  );

  /** 시 값 받아오기 */
  const handleTimeSlideChange = (
    swiper: any,
    setIndexFunction: Function,
    type: string
  ) => {
    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    const slideIndex = activeSlide?.getAttribute("data-swiper-slide-index");

    setIndexFunction(slideIndex);
  };

  console.log(minuteSwiper.activeIndex);

  return (
    <div className="relative z-[5] bg-kos-white w-[calc(100vw-140px)] p-3 rounded-lg shadow-[0px_0px_8px_4px_whitesmoke] mt-3">
      <div className="relative flex w-full h-[150px] overflow-hidden margin-[1rem auto 0] after:absolute after:rounded-lg after:top-[40%] after:w-full after:h-[30px] after:bg-gray-100 ">
        {/* 시 스와이퍼 */}
        <Swiper
          initialSlide={NowHours}
          onSwiper={setHourSwiper}
          onInit={(swiper) => {
            if (clientForm.schdTm === "") {
              swiper.slideTo(NowHours, 0, false);
            } else {
              swiper.slideTo(
                parseInt(clientForm?.schdTm?.slice(0, 2)),
                0,
                false
              );
              swiper.update();
            }
          }}
          onSlideChange={(hoursSwiper) => {
            handleTimeSlideChange(hoursSwiper, setSelectedHourIndex, "Hours");

            if (
              hoursSwiper.realIndex < NowHours &&
              hoursSwiper.realIndex !== 0
            ) {
              callToast({
                msg: "이전의 시간은 선택할 수 없습니다.",
                status: "notice",
              });
              return hoursSwiper.slideTo(NowHours, 500, false);
            }
          }}
          direction={"vertical"}
          slidesPerView={5}
          loop={true}
          className="schdlSwiper hoursSwiper h-full flex-1"
          centeredSlides={true}
          centeredSlidesBounds={true}
          threshold={15}
        >
          {Hours.map((hours, i) => {
            return (
              <SwiperSlide key={`hours-${i}`}>
                <div className={`_flex-center h-full `}>
                  <Typography
                    className="schdlText"
                    color={"text-kos-gray-500"}
                    type={TypographyType.H4}
                  >
                    {hours}
                  </Typography>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* 분 스와이퍼 */}
        <Swiper
          initialSlide={
            minuteSwiper.activeIndex ? minuteSwiper.activeIndex : NowMinutes
          }
          // initialSlide={NowMinutes === 0 ? 0 : NowMinutes}
          onSwiper={setMinuteSwiper}
          onSlideChange={(minuteSwiper) => {
            handleTimeSlideChange(
              minuteSwiper,
              setSelectedMinuteIndex,
              "Minute"
            );

            // 현재 시 + 현재 분 가져와서 현재 시간에서 분보다 작으면 선택안됨.
            if (
              hourSwipers.realIndex === NowHours &&
              minuteSwiper.realIndex < NowMinutes
            ) {
              callToast({
                msg: "이전의 시간은 선택할 수 없습니다.",
                status: "notice",
              });
              return minuteSwiper.slideTo(NowMinutes, 500, false);
            }
          }}
          onInit={(swiper) => {
            if (clientForm?.schdTm === "") {
              swiper.slideTo(NowMinutes === 0 ? 0 : NowMinutes, 0, false);
            } else {
              swiper.slideTo(
                parseInt(clientForm?.schdTm?.slice(3, 5)) + 1,
                0,
                false
              );
              swiper.update();
            }
          }}
          direction={"vertical"}
          slidesPerView={5}
          loop={true}
          centeredSlides={true}
          centeredSlidesBounds={true}
          className="schdlSwiper minuteSwiper h-full flex-1"
        >
          {Minutes.map((minutes, i) => {
            return (
              <SwiperSlide key={`minutes-${i}`}>
                <div className={`_flex-center h-full`}>
                  <Typography
                    className="schdlText"
                    color={"text-kos-gray-500"}
                    type={TypographyType.H4}
                  >
                    {minutes}
                  </Typography>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* 완료 버튼 */}
      <div className="flex mt-3 pt-3 justify-end border-t border-t-gray-200">
        <TextButton
          size="Small"
          state={true}
          onClick={() => {
            setIsShow(false);
            SaveTime();
          }}
        >
          완료
        </TextButton>
      </div>
    </div>
  );
}
