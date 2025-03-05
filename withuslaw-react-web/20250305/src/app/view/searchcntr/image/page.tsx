"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CloseIconWhite, WooriCameraTransparent } from "@icons";
import { ATTC_FIL_CD, WK_CD } from "@constants";
import { Typography } from "@components";
import { CtaButton } from "@components/button";
import { WooriFooter, WooriHeader } from "@components/woori-layout";
import { membAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import PaySuccess from "@app/my-case/PaySuccess";

interface TreqList {
  loanNo: string;
  wkCd: string;
  attcFilCd: string;
}

interface TAdmin extends TreqList {
  bankCd: string;
}

interface TMembAtom {
  [key: string]: string;
}

type TEstbsList = {
  isrnGbCd: string;
  rrcpCnfmReqYn: string;
  rrcpSbmtYn: string;
  mvhhdCnfmReqYn: string;
  mvhhdSbmtYn: string;
  rvsnCntrctChrgTrgtYn: string;
  rtalSbmtYn: string;
  adminReqList: TreqListList[];
};

type TreqListList = {
  reqGbCd: string;
  reqGbNm: string;
  procGbCd: string;
  procGbNm: string;
  seq: number;
};

type ImageList = {
  seq: number;
  ocrCd: string;
};

type TMutateArgs = {
  attcFilCd: string;
  saveImgData: ImageList[];
};

/**
 * 서류 확인요청 여부 Y | N
 * rrcpCnfmReqYn 주민등록등본 확인요청
 * mvhhdCnfmReqYn 전입세대열람원 확인요청
 * rvsnCntrctChrgTrgtYn 수정임대차계약서 확인요청
 **/

/**
 * 서류 제출 여부 Y | N
 * rrcpSbmtYn 주민등록등본 제출여부
 * mvhhdSbmtYn 전입세대열람원 제출여부
 * rtalSbmtYn 수정임대차계약서 제출여부
 **/

/**
 * procGbCd - 관리자 상태코드
 * 00 요청
 * 01 확인중
 * 02 반려
 * 03 승인
 * 99 영업점 제출
 */

export default function ImagePage() {
  const router = useRouter();
  const callToast = useSetAtom(toastState);
  const mdlTknParams = useSearchParams();
  const mdlTkn = mdlTknParams.get("mdl_tkn");
  const loanNo = mdlTknParams.get("loan_no");
  const [formData] = useState(new FormData());
  const [membList] = useAtom<TMembAtom>(membAtom);
  const [mvhhdImages, setMvhhdImages] = useState<File[]>([]);
  const [rrcpImages, setRrcpImages] = useState<File[]>([]);
  const [rtalImages, setRtalImages] = useState<File[]>([]);

  // kcb 본인인증 결과 API
  const { data: kcbResultData, mutate: getKcbResult } = useMutation({
    mutationKey: ["auth-searchpopupkcbres"],
    mutationFn: () =>
      fetch(`https://apidev.kosapp.co.kr/api/auth/searchpopupkcbres`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mdlTkn: mdlTkn }),
      })
        .then((res) => res.json())
        .then((res) => res.data),

    onSuccess(res) {
      if (
        (membList && membList.dbtrNm !== res?.membNm) ||
        (membList && membList.dbtrHpno !== res?.hpNo)
      ) {
        callToast({
          msg: "차주만 이미지 등록이 가능합니다.",
          status: "notice",
        });
        setTimeout(() => {
          router.push(`/view/searchcntr/${membList && membList.loanNo}`);
        }, 1500);
      }
    },
  });

  let attcFilCd;
  let saveImgData;

  // 이미지 저장 API
  const { data: test, mutate: saveImg } = useMutation({
    mutationKey: ["img-saveimages"],
    mutationFn: (formData: any) =>
      fetch(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/saveimages`, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => res.data),

    onSuccess(res) {
      attcFilCd = res?.attcFilCd;
      saveImgData = res?.saveImgData;
      adminReq({ attcFilCd, saveImgData });
    },
    onError() {
      callToast({
        msg: "이미지 등록이 실패하였습니다.",
        status: "error",
      });
    },
  });

  // 관리자 요청 API
  const { mutate: adminReq } = useMutation({
    mutationKey: ["rgstr-wkimgrsltadminreq"],
    mutationFn: ({ attcFilCd, saveImgData }: TMutateArgs): Promise<TAdmin> =>
      fetch(
        `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/view/wkimgrsltadminreq`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loanNo: membList.loanNo,
            wkCd: WK_CD["IMAGE_BIZ"],
            attcFilCd: attcFilCd,
            saveImgData: saveImgData,
            // cphnNo: kcbResultData?.hpNo,
            cphnNo: membList.dbtrHpno,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess(res) {
      callToast({
        msg: "이미지 등록이 완료되었습니다.",
        status: "success",
      });
    },
  });

  // 설정서류 리스트 API
  const { data: estbsData, mutate: getEstbsList } = useMutation({
    mutationKey: ["view-searchestbsdoc"],
    mutationFn: (): Promise<TEstbsList[] | any> =>
      fetch(
        `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/view/checkestbs/${
          membList && membList.loanNo
        }`,
        {
          method: "get",
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const handleAddImages = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageFunction: Function
  ) => {
    if (!event.target.files) {
      return;
    }
    const imageList = event.target.files;

    if (imageList) {
      // let totalImagesCount = 0;
      let previewImages: File[] = [];

      for (let i = 0; i < imageList.length; i++) {
        previewImages.push(imageList[i]);
      }

      setImageFunction((prevImages: File[]) => {
        return [...previewImages, ...prevImages];
      });
    }
  };

  /** 이미지 삭제 */
  const handleDeleteImage = (listIndex: number, imageIndex: number) => {
    const { setImages } = imageLists[listIndex];
    setImages((prevImages: File[]) =>
      prevImages.filter((_, i) => i !== imageIndex)
    );
  };
  // body에 보낼 formData 생성
  const createFormData = (imageList: File[], attcFilCd: string) => {
    const formData = new FormData();

    formData.append(
      "req",
      JSON.stringify({
        loanNo: `${membList.loanNo}`,
        attcFilCd,
        wkCd: WK_CD["IMAGE_BIZ"],
        // cphnNo: kcbResultData?.hpNo,
        cphnNo: membList.dbtrHpno,
      })
    );

    if (imageList.length > 0) {
      imageList.forEach((file) => {
        console.log("#### file name:" + file.name);
        formData.append("multipartFiles", file);
      });
    }

    return formData;
  };

  /** 폼 등록 */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const { field, images, attcFilCd } of imageLists) {
      const procGbCd = estbsData?.adminReqList?.find(
        (data: TreqListList) => data.reqGbCd === attcFilCd
      )?.procGbCd;

      const isSubmitted =
        ((membList?.[field] === "N" || membList?.[field] === null) &&
          images.length !== 0) ||
        procGbCd === "02";

      if (isSubmitted) {
        console.log("################# images ", images);
        const formData = createFormData(images, attcFilCd);

        await saveImg(formData); // saveImg의 결과를 기다림
      }
    }

    setTimeout(() => {
      router.push(`/view/cover/${membList.loanNo}`);
    }, 2000);
  };

  // useEffect(() => {
  //   getKcbResult();
  // }, [getKcbResult]);

  useEffect(() => {
    getEstbsList();
  }, [membList, getEstbsList]);

  const filteredImageLists = () => {
    if (!estbsData || typeof estbsData !== "object") {
      console.log("estbsData가 아직 로드되지 않았거나 잘못된 형식입니다.");
      return [];
    }

    const isrnGbCd = estbsData?.isrnGbCd || estbsData?.data?.isrnGbCd;
    if (!isrnGbCd) {
      console.log("isrnGbCd가 존재하지 않습니다.");
      return [];
    }

    if (!imageLists || imageLists.length === 0) {
      console.log("imageLists가 비어 있습니다.");
      return [];
    }

    if (isrnGbCd === "FA") {
      // FA = 주민등록등본 / 전입세대열람원 노출
      return imageLists.filter(
        (item) =>
          item.attcFilCd === ATTC_FIL_CD["A"] ||
          item.attcFilCd === ATTC_FIL_CD["B"]
      );
    } else if (isrnGbCd === "DB") {
      // DB = 주민등록등본 / 수정임대차계약서 노출
      return imageLists.filter(
        (item) =>
          item.attcFilCd === ATTC_FIL_CD["A"] ||
          item.attcFilCd === ATTC_FIL_CD["C"]
      );
    }

    console.log("필터링 조건에 맞는 데이터가 없습니다.");
    return imageLists;
  };

  const imageLists = [
    {
      name: "주민등록등본",
      field: "rrcpSbmtYn",
      attcFilCd: ATTC_FIL_CD["A"],
      images: rrcpImages,
      setImages: setRrcpImages,
      isShow: estbsData?.rrcpCnfmReqYn === "Y",
    },
    {
      name: "전입세대확인서",
      field: "mvhhdSbmtYn",
      attcFilCd: ATTC_FIL_CD["B"],
      images: mvhhdImages,
      setImages: setMvhhdImages,
      isShow: estbsData?.mvhhdCnfmReqYn === "Y",
    },
    {
      name: "임대차수정계약서",
      field: "rtalSbmtYn",
      attcFilCd: ATTC_FIL_CD["C"],
      images: rtalImages,
      setImages: setRtalImages,
      isShow: estbsData?.rvsnCntrctChrgTrgtYn === "Y",
    },
  ];

  console.log(imageLists);
  console.log(estbsData);

  return (
    <>
      <WooriHeader />
      <form
        className="flex flex-1 flex-col justify-between pb-8 px-4"
        method="post"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <div>
          <div>
            <Typography
              type={Typography.TypographyType.H3}
              className="py-6"
              color="text-kos-gray-800"
            >
              {membList?.dbtrNm}님,
              <br />
              {estbsData?.rrcpCnfmReqYn !== "Y" &&
              estbsData?.mvhhdCnfmReqYn !== "Y" &&
              estbsData?.rvsnCntrctChrgTrgtYn !== "Y"
                ? "제출 대상 서류가 없습니다. 영업점에 문의 부탁드립니다."
                : "발급 받은 서류를 사진 촬영 후 제출해 주세요."}
            </Typography>
          </div>
          {filteredImageLists().map(
            (
              { name, field, images, setImages, attcFilCd, isShow },
              listIndex
            ) => (
              <div key={field} className={isShow ? "block" : "hidden"}>
                <div className={`transition-all ease-in-out mb-6 py-2`}>
                  <Typography
                    className="mb-4"
                    color={"text-kos-gray-800"}
                    type={Typography.TypographyType.B1}
                  >
                    {attcFilCd === "A" &&
                      estbsData.rrcpCnfmReqYn === "Y" &&
                      imageLists[0]?.name}

                    {attcFilCd === "B" &&
                      estbsData.mvhhdCnfmReqYn === "Y" &&
                      imageLists[1]?.name}

                    {attcFilCd === "C" &&
                      estbsData.rvsnCntrctChrgTrgtYn === "Y" &&
                      imageLists[2]?.name}
                  </Typography>

                  {estbsData?.adminReqList.find(
                    (data: TreqListList) => data.reqGbCd === attcFilCd
                  )?.procGbCd !== "00" &&
                  estbsData?.adminReqList.find(
                    (data: TreqListList) => data.reqGbCd === attcFilCd
                  )?.procGbCd !== "01" ? (
                    <div className="flex overflow-x-auto">
                      {/* 조건에 따라 각 항목의 이미지 추가 버튼 표시 여부 */}
                      {attcFilCd === "A" &&
                        (estbsData.rrcpSbmtYn === null ||
                          estbsData.rrcpSbmtYn === "N") &&
                        estbsData.rrcpCnfmReqYn === "Y" && (
                          <label
                            htmlFor={field}
                            className={`${
                              images.length === 10 && "pr-0 mr-0"
                            } w-[103px] h-[103px] z-[2] sticky left-0 top-0 bg-kos-white mr-6 shrink-0`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple={true}
                              name={field}
                              id={field}
                              onChange={(event) => {
                                handleAddImages(event, setImages);
                              }}
                            />
                            <Image
                              src={WooriCameraTransparent}
                              alt="toast icon"
                            />
                          </label>
                        )}
                      {attcFilCd === "B" &&
                        (estbsData.mvhhdSbmtYn === null ||
                          estbsData.mvhhdSbmtYn === "N") &&
                        estbsData.mvhhdCnfmReqYn === "Y" && (
                          <label
                            htmlFor={field}
                            className={`${
                              images.length === 10 && "pr-0 mr-0"
                            } w-[103px] h-[103px] z-[2] sticky left-0 top-0 bg-kos-white mr-6 shrink-0`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple={true}
                              name={field}
                              id={field}
                              onChange={(event) => {
                                handleAddImages(event, setImages);
                              }}
                            />
                            <Image
                              src={WooriCameraTransparent}
                              alt="toast icon"
                            />
                          </label>
                        )}
                      {attcFilCd === "C" &&
                        (estbsData.rtalSbmtYn === null ||
                          estbsData.rtalSbmtYn === "N") &&
                        estbsData.rvsnCntrctChrgTrgtYn === "Y" && (
                          <label
                            htmlFor={field}
                            className={`${
                              images.length === 10 && "pr-0 mr-0"
                            } w-[103px] h-[103px] z-[2] sticky left-0 top-0 bg-kos-white mr-6 shrink-0`}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              multiple={true}
                              name={field}
                              id={field}
                              onChange={(event) => {
                                handleAddImages(event, setImages);
                              }}
                            />
                            <Image
                              src={WooriCameraTransparent}
                              alt="toast icon"
                            />
                          </label>
                        )}
                      <div className="flex">
                        {images?.map((image, id) => (
                          <div
                            key={id}
                            className="relative w-[103px] h-[103px] mr-6 shrink-0 rounded overflow-hidden"
                          >
                            <Image
                              src={URL.createObjectURL(image)}
                              referrerPolicy="no-referrer"
                              alt={`${image}-${id}`}
                              width={101}
                              height={101}
                              className="w-full h-full object-cover border border-kos-gray-40 rounded"
                            />
                            <Image
                              src={CloseIconWhite}
                              alt="삭제 아이콘"
                              width={18}
                              height={18}
                              className="absolute top-[6px] right-[6px] rounded"
                              onClick={() => {
                                handleDeleteImage(listIndex, id);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    (estbsData.rrcpCnfmReqYn === "Y" ||
                      estbsData.mvhhdCnfmReqYn === "Y" ||
                      estbsData.rvsnCntrctChrgTrgtYn === "Y") &&
                    estbsData?.adminReqList.find(
                      (data: TreqListList) => data.reqGbCd === attcFilCd
                    )?.procGbCd !== "02" && (
                      <div className="min-h-[103px]">
                        {attcFilCd === "A" &&
                          estbsData.rrcpSbmtYn === "Y" &&
                          estbsData.rrcpCnfmReqYn === "Y" && (
                            <PaySuccess text="서류제출완료" />
                          )}
                        {attcFilCd === "B" &&
                          estbsData.mvhhdSbmtYn === "Y" &&
                          estbsData.mvhhdCnfmReqYn === "Y" && (
                            <PaySuccess text="서류제출완료" />
                          )}
                        {attcFilCd === "C" &&
                          estbsData.rtalSbmtYn === "Y" &&
                          estbsData.rvsnCntrctChrgTrgtYn === "Y" && (
                            <PaySuccess text="서류제출완료" />
                          )}
                      </div>
                    )
                  )}
                </div>

                {/* 만약 Y거나 00,01번일 경우 버튼 숨기기 */}
                {/*{membList?.[field] !== "Y" ||*/}
                {/*estbsData?.adminReqList.find(*/}
                {/*  (data: TreqListList) => data.reqGbCd === attcFilCd*/}
                {/*)?.procGbCd === "02" ||*/}
                {/*estbsData?.adminReqList.find(*/}
                {/*  (data: TreqListList) => data.reqGbCd === attcFilCd*/}
                {/*)?.procGbCd === "" ? (*/}
                {/*  <div className="w-full flex p-4 bg-kos-white">*/}
                {/*    <CtaButton type="submit" size="XLarge" state="On">*/}
                {/*      등록 완료*/}
                {/*    </CtaButton>*/}
                {/*  </div>*/}
                {/*) : null}*/}
              </div>
            )
          )}
        </div>
        <div>
          {estbsData?.rrcpCnfmReqYn !== "Y" &&
          estbsData?.mvhhdCnfmReqYn !== "Y" &&
          estbsData?.rvsnCntrctChrgTrgtYn !== "Y" ? null : (
            <div className="w-full flex py-6 bg-kos-white">
              {/* 주민등록등본(rrcpImages), 전입세대열람서(mvhhdImages), 수정임대차계약서(rtalImages) 중 이미지 1개라도 추가 시 비활성화 조건 해제 */}
              <CtaButton
                type="submit"
                size="XLarge"
                state="Woori"
                disabled={
                  rrcpImages.length === 0 &&
                  mvhhdImages.length === 0 &&
                  rtalImages.length === 0
                }
              >
                제출하기
              </CtaButton>
            </div>
          )}

          <WooriFooter />
        </div>
      </form>
    </>
  );
}
