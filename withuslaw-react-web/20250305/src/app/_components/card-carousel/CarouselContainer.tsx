"use client";

import { ForwardedRef, LegacyRef, forwardRef, memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type TProps = {
  children: any;
  onMove?: (currentSlide: number) => void;
  allData: any;
  currentSlide: number;
};

function CarouselContainer(
  { children, onMove, allData, currentSlide }: TProps,
  ref: ForwardedRef<LegacyRef<Carousel>>
) {
  return (
    <Carousel
      //  @ts-ignore
      ref={ref}
      className={`${
        allData.length > 0 && "relative z-10 [&>ul>li:first-child]:pl-4"
      } [&>ul]:transform-style-flat [&>ul>li]:transform-style-flat [&>ul>li]:pl-4 [&>ul>li:first-child]:pl-0 [&>ul>li:last-child]:pr-4`}
      partialVisible={true}
      swipeable={true}
      ssr={true}
      responsive={{
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: allData.length > 1 ? 30 : 0, // 아이템이 2개 이상일 때만 적용
        },
      }}
      arrows={false}
      customTransition="transform 300ms ease-in-out"
      afterChange={(previousSlide, { currentSlide }) => {
        !!onMove && onMove(currentSlide);
      }}
      // 현재 슬라이드 유지
      goToSlide={currentSlide}
    >
      {children}
    </Carousel>
  );
}

// export default forwardRef<LegacyRef<Carousel>, TProps>(CarouselContainer);
export default memo(forwardRef<LegacyRef<Carousel>, TProps>(CarouselContainer));
