"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Header, Typography } from "@/app/_components";
import { CtaButton } from "@/app/_components/button";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { membAtom, toastState } from "@/app/_store";
import { useRouter } from "next/navigation";
import { CloseIcon, CameraTransparent } from "public/icon";
import { ATTC_FIL_CD, WK_CD } from "@/app/Constants";

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
  reqGbCd: string;
  procGbCd: string;
};

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
  const [formData] = useState(new FormData());
  const [membList] = useAtom<TMembAtom>(membAtom);
  const [mvhhdImages, setMvhhdImages] = useState<string[]>([]);
  const [rrcpImages, setRrcpImages] = useState<string[]>([]);
  const [rtalImages, setRtalImages] = useState<string[]>([]);
  const imageLists = [
    {
      name: "전입세대 열람원",
      field: "mvhhdSbmtYn",
      attcFilCd: ATTC_FIL_CD["A"],
      images: mvhhdImages,
      setImages: setMvhhdImages,
    },
    {
      name: "주민등록등본",
      field: "rrcpSbmtYn",
      attcFilCd: ATTC_FIL_CD["B"],
      images: rrcpImages,
      setImages: setRrcpImages,
    },
    {
      name: "수정임대차 계약서",
      field: "rtalSbmtYn",
      attcFilCd: ATTC_FIL_CD["C"],
      images: rtalImages,
      setImages: setRtalImages,
    },
  ];

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

  // 이미지 저장 API
  const { mutate: saveImg } = useMutation({
    mutationKey: ["img-saveimages"],
    mutationFn: (formData: any) =>
      fetch(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/saveimages`, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  // 관리자 요청 API
  const { mutate: adminReq } = useMutation({
    mutationKey: ["rgstr-wkimgrsltadminreq"],
    mutationFn: (attcFilCd: string): Promise<TAdmin> =>
      fetch(`https://appwooridev.kosapp.co.kr/api/view/wkimgrsltadminreq`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loanNo: membList.loanNo,
          wkCd: WK_CD["IMAGE_BIZ"],
          attcFilCd: attcFilCd,
          cphnNo: kcbResultData?.hpNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  // 설정서류 리스트 API
  const { data: estbsData, mutate: getEstbsList } = useMutation({
    mutationKey: ["view-searchestbsdoc"],
    mutationFn: (): Promise<TEstbsList[] | any> =>
      fetch(
        `https://appwooridev.kosapp.co.kr/api/view/searchestbsdoc/${membList.loanNo}`,
        {
          method: "get",
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
  });

  /** 이미지 추가 */
  const handleAddImages = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageFunction: Function
  ) => {
    if (!event.target.files) {
      return;
    }
    const imageLists = event.target.files;

    if (imageLists) {
      // let totalImagesCount = 0;
      let previewImages: string[] = [];

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        const binaryData = imageLists[i];
        previewImages.push(currentImageUrl);
        formData.append(`multipartFiles`, binaryData);
        // totalImagesCount++;

        // 이미지 상태 업데이트
        // if (totalImagesCount > 9) {
        //   previewImages = previewImages.slice(0, 10);
        //   callToast({
        //     msg: "최대 10개까지 업로드 가능합니다.",
        //     status: "notice",
        //   });
        // }
      }

      setImageFunction((prevImages: string[]) => {
        return [...previewImages, ...prevImages];
      });
    }
  };

  /** 이미지 삭제 */
  const handleDeleteImage = (listIndex: number, imageIndex: number) => {
    const { setImages } = imageLists[listIndex];
    setImages((prevImages: string[]) =>
      prevImages.filter((_, i) => i !== imageIndex)
    );
  };

  // body에 보낼 formData 생성
  const createFormData = (imageList: string[], attcFilCd: string) => {
    const formData = new FormData();

    formData.append(
      "req",
      JSON.stringify({
        loanNo: `${membList.loanNo}`,
        attcFilCd,
        wkCd: WK_CD["IMAGE_BIZ"],
      })
    );

    if (imageList.length > 0) {
      imageList.forEach((image: string) => {
        const binaryData = new Blob([image]);
        formData.append("multipartFiles", binaryData);
      });
    } else {
      formData.append("multipartFiles", new Blob([]));
    }

    return formData;
  };

  /** 폼 등록 */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const { field, images, attcFilCd } of imageLists) {
      const procGbCd = estbsData?.find(
        (data: TEstbsList) => data.reqGbCd === attcFilCd
      )?.procGbCd;

      const isSubmitted =
        (membList?.[field] === "N" && images.length !== 0) || procGbCd === "02";

      if (isSubmitted) {
        const formData = createFormData(images, attcFilCd);
        adminReq(attcFilCd);
        await saveImg(formData);
      }
    }

    callToast({
      msg: "이미지 등록이 완료되었습니다.",
      status: "success",
    });

    setTimeout(() => {
      router.push(`/view/searchcntr/${membList.loanNo}`);
    }, 2000);
  };

  useEffect(() => {
    getKcbResult();
  }, [getKcbResult]);

  useEffect(() => {
    getEstbsList();
  }, [membList, getEstbsList]);

  return (
    <>
      <Header title="설정 서류 등록" isBackButton={false} />
      <form
        className="p-4"
        method="post"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <ul>
          <li>
            <Typography
              color={"text-kos-brown-500"}
              type={Typography.TypographyType.H3}
              className="break-keep"
            >
              제출 여부
            </Typography>
          </li>

          {imageLists.map(
            ({ name, field, images, setImages, attcFilCd }, listIndex) => (
              <div key={field}>
                {membList?.[field] === "N" && (
                  <li className={`transition-all ease-in-out mt-4 py-2`}>
                    <Typography
                      color={"text-kos-gray-600"}
                      type={Typography.TypographyType.B2}
                    >
                      {name}
                    </Typography>
                    {estbsData?.find(
                      (data: TEstbsList) => data.reqGbCd === attcFilCd
                    )?.procGbCd !== "02" ? (
                      <Typography
                        className="mt-3"
                        color={"text-kos-brown-500"}
                        type={Typography.TypographyType.H5}
                      >
                        관리자 승인 대기 중입니다.
                      </Typography>
                    ) : (
                      <div className="flex mt-3 overflow-x-auto">
                        <label
                          htmlFor={field}
                          className={`${
                            images.length === 10 && "pr-0 mr-0"
                          } w-[84px] h-[76px] z-[2] sticky left-0 top-0 bg-kos-white pr-2 mr-2 shrink-0`}
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
                          <Image src={CameraTransparent} alt="toast icon" />
                        </label>
                        <div className="flex">
                          {images?.map((image, id) => (
                            <div
                              key={id}
                              className="relative w-[76px] h-[76px] mr-2 shrink-0 rounded-xl overflow-hidden"
                            >
                              <Image
                                src={image}
                                referrerPolicy="no-referrer"
                                alt={`${image}-${id}`}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                              <Image
                                src={CloseIcon}
                                alt="delete icon"
                                width={30}
                                height={30}
                                className="absolute top-0 right-[-5px]"
                                onClick={() => {
                                  handleDeleteImage(listIndex, id);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                )}

                {/* 만약 Y거나 00,01번일 경우 버튼 숨기기 */}
                {membList?.[field] === "Y" ||
                  (estbsData?.find(
                    (data: TEstbsList) => data.reqGbCd === attcFilCd
                  )?.procGbCd === "02" && (
                    <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
                      <CtaButton type="submit" size="XLarge" state="On">
                        등록 완료
                      </CtaButton>
                    </div>
                  ))}
              </div>
            )
          )}
        </ul>
      </form>
    </>
  );
}
