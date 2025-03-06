"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Typography } from "@components";
import { CtaButton } from "@components/button";
import { TypographyType } from "@components/typography/Constant";
import { ModalHeader, ModalLayout } from "@components/full-modal";
import { useFetchApi } from "@hooks";
import { toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { getIsSelectedSgg } from "@app/acceptance/match/case-accept/getIsSelectedSgg";
import RegionList from "@app/acceptance/match/case-accept/RegionList";
import RegionSelectedItem from "@app/acceptance/match/case-accept/RegionSelectedItem";

type TsggObj = {
  [key: string]: TSgg[];
};

type TRegionProps = {
  setShowCommision: Dispatch<SetStateAction<boolean>>;
  saveRegion: (key: TSgg[]) => void;
  activeSido: TSido;
  searchRegionData: TSgg[];
};

export default function RegionModal({
                                      saveRegion,
                                      setShowCommision,
                                      activeSido,
                                      searchRegionData
                                    }: TRegionProps) {
  const callToast = useSetAtom(toastState);
  const [selectedRegions, setSelectedRegions] =
    useState<TSgg[]>(searchRegionData);
  const [selectedMajorRegion, setSelectedMajorRegion] = useState<TSido>({
    sidoCd: "",
    sidoNmCvt: "",
    sidoNm: ""
  });
  const [subRegionsData, setSubRegionsData] = useState<TsggObj>({});
  const { fetchApi } = useFetchApi();

  // 시도 리스트 조회
  const { data: sidoData, mutate: getSidoData } = useMutation({
    mutationKey: [""],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/brnch/searchsidoinfolst`,
        method: "post"
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      let obj: TsggObj = {};
      for (const el of res) {
        obj[el.sido.sidoCd] = el.sggList;
      }
      setSubRegionsData(obj);
    },
    onError: (error) => {
      console.log("API Error", error);
    }
  });

  const handleMajorRegion = (majorRegion: TSido) => {
    setSelectedMajorRegion(majorRegion);
  };

  const handleCheckItems = ({ sidoCd, sggNm, sggCd }: TSgg) => {
    const isChecked = getIsSelectedSgg({
      selectedRegionListData: selectedRegions,
      target: { sggCd, sidoCd }
    });

    if (isChecked) {
      setSelectedRegions((checkedItems) =>
        checkedItems?.filter(
          (item) =>
            !getIsSelectedSgg({
              selectedRegionData: item,
              target: { sggCd, sidoCd }
            })
        )
      );
    } else {
      const updatedBody = [
        {
          sidoNm: selectedMajorRegion?.sidoNm,
          sidoNmCvt: selectedMajorRegion?.sidoNmCvt,
          sidoCd,
          sggNm,
          sggCd
        }
      ];
      const isSelectedEntire = sggNm === "전체" && sggCd === "00";

      if (selectedRegions?.length === 3) {
        // 전체를 클릭했을 때, 선택된 지역 리스트에 같은 시도가 있는 경우
        if (
          isSelectedEntire &&
          selectedRegions.some((el) => el.sidoCd === sidoCd)
        ) {
          setSelectedRegions((checkedItems) => {
            if (checkedItems && checkedItems.length > 0) {
              return checkedItems
                .filter((item) => item.sidoCd !== sidoCd)
                .concat(updatedBody);
            } else {
              return updatedBody;
            }
          });
          return null;
        }

        // 전체선택을 지우고, 같은 시도의 지역만 선택하고 싶은 경우
        if (
          !isSelectedEntire &&
          selectedRegions.some(
            (el) =>
              el.sidoCd === sidoCd && (el.sggCd === "00" || el.sggCd === null)
          )
        ) {
          setSelectedRegions((checkedItems) => {
            if (checkedItems && checkedItems.length > 0) {
              return checkedItems
                .filter((item) => item.sidoCd !== sidoCd)
                .concat(updatedBody);
            } else {
              return updatedBody;
            }
          });
          return null;
        }

        return callToast({
          msg: "최대 3개까지 선택 가능합니다.",
          status: "notice"
        });
      }

      if (isSelectedEntire) {
        setSelectedRegions((checkedItems) => {
          if (checkedItems && checkedItems.length > 0) {
            return checkedItems
              .filter((item) => item.sidoCd !== sidoCd)
              .concat(updatedBody);
          } else {
            return updatedBody;
          }
        });
      }

      setSelectedRegions((checkedItems) => {
        if (checkedItems && checkedItems.length > 0) {
          return checkedItems
            .filter((item) => {
              return !(
                item.sidoCd === sidoCd &&
                ((item.sggNm === "전체" && item.sggCd === "00") ||
                  (item.sggNm === null && item.sggCd === null))
              );
            })
            .concat(updatedBody);
        } else {
          return updatedBody;
        }
      });
    }
  };

  const handleDeleteItem = ({ sidoCd, sggNm }: TSgg) => {
    setSelectedRegions((checkedItems) =>
      checkedItems?.filter(
        (item) => !(item.sggNm === sggNm && item.sidoCd === sidoCd)
      )
    );
  };

  useEffect(() => {
    getSidoData();
  }, [getSidoData]);

  useEffect(() => {
    // TODO:: 추가할 때는 이 로직을 타야함.
    handleMajorRegion(activeSido);

    // TODO:: 지울 땐 이 로직을 타고
    if (selectedRegions && activeSido.sidoCd !== "") {
      return handleMajorRegion({
        sidoNm: selectedRegions[0]?.sidoNm,
        sidoNmCvt: selectedRegions[0]?.sidoNmCvt,
        sidoCd: selectedRegions[0]?.sidoCd
      });
    }

    return handleMajorRegion({ sidoNm: "", sidoNmCvt: "", sidoCd: "" });
  }, [activeSido, setSelectedRegions]);

  useEffect(() => {
    setSelectedRegions(searchRegionData);
  }, [searchRegionData]);

  return (
    <ModalLayout>
      <ModalHeader
        title="지역선택"
        onClick={() => {
          setSelectedRegions(searchRegionData);
          setShowCommision(false);
          // @ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            mode: "BOTTOM",
            data: {
              type: "true"
            }
          });
        }}
        showCloseBtn={searchRegionData?.length > 0}
      />

      <section
        className="bg-kos-white px-4 pt-6 pb-[13px] border border-t-1 border-[kos-gray-200] border-b-8 border-gray-200">
        <Typography color={"text-kos-gray-900"} type={TypographyType.H2}>
          등기업무를 진행할 지역을 선택해주세요
        </Typography>
        <p className="mt-1 pb-[13px] text-sm text-[#a3a3a3] font-semibold">
          *최대 3개 선택 가능
        </p>
        {!!selectedRegions && (
          <RegionSelectedItem
            selectedRegions={selectedRegions}
            setShowCommision={setShowCommision}
            onRegionDelete={handleDeleteItem}
          />
        )}
      </section>

      {/* 지역 선택 */}
      <section className="flex flex-1 px-4 pt-6">
        <div className="flex gap-2 w-full h-[calc(100vh-192px)]">
          <RegionList
            majorRegionList={sidoData}
            onSelectMajorRegion={handleMajorRegion}
            selectedMajorRegion={selectedMajorRegion?.sidoCd ?? ""}
            subRegionList={
              selectedMajorRegion
                ? subRegionsData[selectedMajorRegion.sidoCd]
                : []
            }
            selectedRegions={selectedRegions}
            onCheckboxChange={handleCheckItems}
          />
        </div>
      </section>

      {/* 선택 리스트 */}
      <section className="fixed bottom-0 w-full p-4 bg-kos-white">
        <div className="flex justify-center">
          <CtaButton
            size="XLarge"
            disabled={selectedRegions?.length === 0}
            state={"On"}
            onClick={() => {
              saveRegion(selectedRegions);
              if (selectedRegions.length > 0) {
                setShowCommision(false);
              }
              // @ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                mode: "BOTTOM",
                data: {
                  type: "true"
                }
              });
            }}
          >
            선택완료
          </CtaButton>
        </div>
      </section>
    </ModalLayout>
  );
}
