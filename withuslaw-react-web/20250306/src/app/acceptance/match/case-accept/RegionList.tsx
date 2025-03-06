import React, { useEffect, useRef } from "react";
import { Checkbox } from "@components/button";
import { getIsSelectedSgg } from "@app/acceptance/match/case-accept/getIsSelectedSgg";

type RegionListProps = {
  majorRegionList: string[];
  onSelectMajorRegion: (majorRegion: TSido) => void;
  selectedMajorRegion: string | null;
  subRegionList: TSgg[];
  selectedRegions: any;
  onCheckboxChange: (args: TSgg) => void;
};

export default function RegionList({
  majorRegionList,
  onSelectMajorRegion,
  selectedMajorRegion,
  subRegionList,
  selectedRegions,
  onCheckboxChange,
}: RegionListProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // 스크롤을 상단으로 이동
  const onScrollToTop = (): void => {
    if (targetRef.current) {
      targetRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onScrollToTop();
    }, 0);

    return () => clearTimeout(timer);
  }, [subRegionList]);

  // useEffect(() => {
  //   onScrollToTop();
  // }, [subRegionList]);

  // const regionRef = {
  //   0: useMoveScroll(),
  //   1: useMoveScroll(),
  // };

  // const { onMoveToScroll } = useMoveScroll();

  // useEffect(() => {
  //   onMoveToScroll();

  //   Object.values(regionRef).forEach((ref: any) => {
  //     if (ref.element.current != null) {
  //       ref.element.current.scrollIntoView({
  //         block: "start",
  //       });
  //     }
  //   });
  // }, [onMoveToScroll]);

  return (
    <>
      {/* 시/도 */}
      <div className="flex flex-col gap-2 overflow-y-scroll pb-[185px]">
        {majorRegionList?.map((majorRegion: TSido) => (
          <label
            key={`${majorRegion.sido.sidoCd}`}
            htmlFor={`${majorRegion.sido}`}
            className={`_flex-center min-w-[80px] px-3 py-1 border text-[15px] leading-6 text-center rounded-lg ${
              selectedMajorRegion === majorRegion.sido.sidoCd
                ? "border-[#9F9793] text-[white] bg-[#9F9793] font-bold"
                : "border-transparent text-[#a3a3a3] font-semibold"
            }`}
            // ref={
            //   selectedMajorRegion === majorRegion.sido.sidoCd
            //     ? regionRef[0]?.element
            //     : null
            // }
            onClick={() => {
              onSelectMajorRegion(majorRegion.sido);
            }}
          >
            <input
              type="checkbox"
              className="peer appearance-none focus:outline-none"
              id={`${majorRegion.sido.sidoCd}`}
            />
            {majorRegion.sido.sidoNmCvt}
          </label>
        ))}
      </div>

      {/* 서브 지역 */}
      <div
        ref={targetRef}
        className="flex flex-1 flex-col gap-2 overflow-y-scroll pb-[185px]"
      >
        {!!subRegionList &&
          subRegionList
            .map((subRegion) => (
              <div
                // ref={
                //   getIsSelectedSgg({
                //     selectedRegionListData: selectedRegions,
                //     target: subRegion,
                //   })
                //     ? regionRef[1].element
                //     : null
                // }
                className="px-3 py-1"
                key={`${subRegion.sidoCd}${subRegion.sggNm}`}
              >
                <div className="flex items-center">
                  <Checkbox
                    size="Small"
                    id={`${subRegion.sidoCd}${subRegion.sggNm}`}
                    checked={getIsSelectedSgg({
                      selectedRegionListData: selectedRegions,
                      target: subRegion,
                    })}
                    onChange={() => {
                      onCheckboxChange({
                        sidoNm: subRegion.sidoNm,
                        sidoNmCvt: subRegion.sidoNmCvt,
                        sidoCd: subRegion.sidoCd,
                        sggNm: subRegion.sggNm,
                        sggCd: subRegion.sggCd,
                      });
                    }}
                  />

                  <label
                    htmlFor={`${subRegion.sidoCd}${subRegion.sggNm}`}
                    className={`mt-1 ml-1 h-[26px] text-[15px] font-semibold ${
                      getIsSelectedSgg({
                        selectedRegionListData: selectedRegions,
                        target: subRegion,
                      })
                        ? "text-[#545454]"
                        : "text-[#a3a3a3]"
                    }`}
                  >
                    {subRegion.sggNm}
                  </label>
                </div>
              </div>
            ))
            .reverse()}
      </div>
    </>
  );
}
