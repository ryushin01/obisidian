import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { DeleteIcon, DownArrow } from "@icons";

type TRegionItem = {
  selectedRegions: TSgg[];
  setShowCommision: Dispatch<SetStateAction<boolean>>;
  onRegionDelete?: (args: TSgg) => void;
};

export default function RegionSelectedItem({
                                             selectedRegions,
                                             setShowCommision,
                                             onRegionDelete
                                           }: TRegionItem) {
  return (
    <ul className="pr-5 overflow-x-auto top-[calc(100vh-162px)] flex gap-2">
      {!!selectedRegions &&
        selectedRegions.map((selectedRegion) => (
          <li
            key={`${selectedRegion.sidoCd}${selectedRegion.sggNm}`}
            className="flex items-center shrink-0 max-w-max px-2.5 py-2 text-sm font-semibold text-gray-700 bg-[#f6f6f6] rounded-xl"
          >
            <span
              onClick={() => {
                setShowCommision(true);
                // @ts-ignore
                window.flutter_inappwebview.callHandler("flutterFunc", {
                  mode: "BOTTOM",
                  data: {
                    type: "false"
                  }
                });
              }}
            >
              {selectedRegion?.sidoNmCvt}{" "}
              {selectedRegion?.sggNm === null ? "전체" : selectedRegion.sggNm}
            </span>
            {onRegionDelete ? (
              <span
                className="ml-1"
                onClick={() =>
                  onRegionDelete({
                    sidoNm: selectedRegion.sidoNm,
                    sidoNmCvt: selectedRegion.sidoNmCvt,
                    sidoCd: selectedRegion.sidoCd,
                    sggNm: selectedRegion.sggNm,
                    sggCd: selectedRegion.sggCd
                  })
                }
              >
                <Image src={DeleteIcon} alt="삭제 아이콘" width={24} />
              </span>
            ) : (
              <span
                className="ml-1"
                onClick={() => {
                  setShowCommision(true);
                  // @ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    mode: "BOTTOM",
                    data: {
                      type: "false"
                    }
                  });
                }}
              >
                <Image src={DownArrow} alt="필터 화살표 아이콘" width={24} />
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}
