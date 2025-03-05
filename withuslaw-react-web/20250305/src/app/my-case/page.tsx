"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AddDocumentIcon,
  CalendarOrangeIcon,
  CheckBoxSmallOn,
  ExclamationMarkWithGrayBg,
  FilterIcon,
  FilterOrangeIcon,
  ResetBlackIcon,
  WooriBankLogoIcon,
} from "@icons";
import { CntrGb, RGSTR_GB_CD, RGSTR_TEXT } from "@constants";
import { Alert, CaseList, Loading, SearchBar, Typography } from "@components";
import {
  useDisclosure,
  useFetchApi,
  useFlutterBridgeFunc,
  useListInfiniteScroll,
  usePulltoRefresh,
} from "@hooks";
import { toggleDimmedBottomNavigation } from "@utils";
import { useNoFilterMyCaseData } from "@libs";
import {
  authAtom,
  keywordStore,
  myCaseCntrGbStore,
  myCaseFilterStore,
  myCaseState,
  routerAtom,
} from "@stores";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import FilterBottomSheet from "@app/my-case/FilterBottomSheet";
import ListContainer from "@app/my-case/ListContainer";

type TNoFilterBody = {
  bizNo: string;
  pageNum: number;
  pageSize: number;
};

export type TFilterBody = {
  startDate: string;
  endDate: string;
  regType: RGSTR_GB_CD | "ALL";
};

function getKey(activeTab: CntrGb) {
  return activeTab === CntrGb.PROG ? "progCntrInfo" : "doneCntrInfo";
}

/**
 * lndHndgSlfDsc 대출 취급 주체 구분 코드
 * 1 은행지점
 * 2 모집인(SR)
 **/

export default function MyCasePage() {
  const authInfo = useAtomValue(authAtom);
  const setRouter = useSetAtom(routerAtom);
  const { nextjsFunc } = useFlutterBridgeFunc();
  const { fetchApi } = useFetchApi();
  const [keyword, setKeyword] = useAtom(keywordStore);
  const [data, setData] = useAtom(myCaseState);
  const [activeTab, setActiveTab] = useAtom(myCaseCntrGbStore);
  const isProgFilterSearchShow =
    !!data.progCntrInfo.cntrList && data?.progCntrInfo?.cntrCount > 0;
  const isDoneFilterSearchShow =
    !!data.doneCntrInfo.cntrList && data?.doneCntrInfo?.cntrCount > 0;
  const { isOpen, open: openPopup } = useDisclosure();
  const {
    isOpen: IsOpenFilter,
    open: openFilter,
    close: closeFilter,
  } = useDisclosure();
  const {
    isOpen: isOpenNewProAlert,
    open: openNewProgPopUP,
    close: closeNewProgPopUP,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initNoFilterBody: TNoFilterBody = {
    // bizNo: "8888888888",
    bizNo: authInfo.bizNo,
    pageNum: 1,
    pageSize: 10,
  };
  const initFilterBody: TFilterBody = {
    startDate: "",
    endDate: "",
    regType: "",
  };
  const [filterBody, setFilterBody] = useAtom(myCaseFilterStore);
  const pageRouter = useAtomValue(routerAtom);

  const {
    rootRef,
    targetRef,
    isInterSecting,
    scrollPosition,
    setScrollPosition,
    setTargetDependency,
  } = useListInfiniteScroll();

  /* 계약정보 조회(필터 미적용) */
  const [noFilteredData, getNoFilteredData, isPending] = useNoFilterMyCaseData({
    onSuccess(res) {
      const key = getKey(activeTab);

      const { code, data } = res;
      if (code === "99") {
        openPopup();
        return;
      }

      if (code !== "00") {
        // alert("네트워크 에러 발생!!");
        return;
      }

      //신규 배정팝업 노출
      if (data?.progCntrInfo?.newPopup) {
        toggleDimmedBottomNavigation(true);
        openNewProgPopUP();
      }

      // 선택된 탭에 데이터가 없는 경우
      if (data[key]?.cntrCount === 0) {
        setData({ value: data, key, action: "initData" });
        return;
      }

      if (data[key]?.cntrCount === "") {
        setData({ value: data, key, action: "initData" });
        return;
      }

      if (data.pageData.currPageNum === 1) {
        setScrollPosition(0);
        setData({ value: data, key, action: "save" });
        return;
      }

      // scroll된 데이터인 경우
      setData({ value: data, key, action: "scrollData" });
    },
  });

  /* 계약정보 조회(필터 적용) */
  // const {  mutate: getFilteredData   } = useMutation({
  //   mutationKey: ["my-case", JSON.stringify(filterBody)],
  //   mutationFn: ({
  //     pageNum,
  //     body,
  //   }: {
  //     pageNum: number;
  //     body: TFilterBody;
  //   }): Promise<TMyCaseData> =>
  //     fetchApi({
  //       url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/cntr/searchCntrFilt`,
  //       method: "post",
  //       body: {
  //         ...initNoFilterBody,
  //         pageNum: pageNum,
  //         cntrGb: activeTab,
  //         fillterData: body,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => res.data),
  //   onSuccess(res, variables, context) {
  //     console.log("filter", res);
  //     const key = getKey(activeTab);

  //     // filtering된 결과가 없는 경우
  //     if (res[key].cntrCount === 0) {
  //       setData({ value: res, key, action: "saveWithPrevCount" });
  //       return;
  //     }

  //     if (res.pageData.currPageNum === 1) {
  //       setData({ value: res, key, action: "saveWithPrevCount" });
  //       return;
  //     }

  //     // scroll된 데이터인 경우
  //     setData({ value: res, key, action: "scrollData" });
  //   },
  //   onError(error) {
  //     console.log("error", error);
  //   }

  // });
  const { mutate: getFilteredData } = useMutation({
    mutationKey: ["my-case", JSON.stringify(filterBody)],
    mutationFn: async ({
      pageNum,
      body,
    }: {
      pageNum: number;
      body: TFilterBody;
    }): Promise<TData<TMyCaseData>> => {
      // setScrollPosition(pageNum === 1 ? 0 : rootRef.current?.scrollTop ?? 0);
      // 비동기 작업이 시작될 때 로딩 상태를 true로 설정
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrFilt`,
        method: "post",
        body: {
          ...initNoFilterBody,
          pageNum,
          cntrGb: activeTab,
          fillterData: body,
        },
      });

      // 비동기 작업이 완료되면 로딩 상태를 false로 설정
      setIsLoading(false);

      return response.json();
    },
    onSuccess(res, variables, context) {
      const key = getKey(activeTab);
      setKeyword({ type: "reset" });
      const { data } = res;

      //신규 배정팝업 노출
      if (data?.progCntrInfo?.newPopup) {
        toggleDimmedBottomNavigation(true);
        openNewProgPopUP();
      }

      // filtdering된 결과가 없는 경우
      if (data[key].cntrCount === 0) {
        setData({ value: data, key, action: "saveWithPrevCount" });
        return;
      }

      if (data.pageData.currPageNum === 1) {
        setData({ value: data, key, action: "saveWithPrevCount" });
        return;
      }

      // scroll된 데이터인 경우
      setData({ value: data, key, action: "scrollData" });
    },
    onError(error) {
      console.log("error", error);
    },
  });

  /* 계약정보 조회(자동완성 검색 조회) */
  const { mutate: getAutoTextData } = useMutation({
    mutationKey: ["my-case", keyword],
    mutationFn: (autoText: string): Promise<TMyCaseData> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrAutoText`,
        method: "post",
        body: {
          ...initNoFilterBody,
          cntrGb: activeTab,
          autoText: autoText,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess(res) {
      const key = getKey(activeTab);
      //신규 배정팝업 노출
      if (res?.progCntrInfo?.newPopup) {
        toggleDimmedBottomNavigation(true);
        openNewProgPopUP();
      }

      setData({ value: res, key, action: "saveWithPrevCount" });
    },
  });

  /* 필터링 초기화 */
  const onInitFilter = () => {
    setFilterBody(initFilterBody);
  };

  /* 리스트 재조회 */
  const onReLoad = () => {
    if (keyword !== "") return getAutoTextData(keyword);
    if (filterBody.regType !== "") {
      getFilteredData({ pageNum: 1, body: filterBody });
    } else {
      getNoFilteredData({
        pageNum: 1,
        pageSize: 10,
        cntrGb: activeTab,
        myCasePgYn: "Y",
      });
    }
  };

  useEffect(() => {
    onReLoad();
  }, [activeTab, getAutoTextData, getNoFilteredData]);

  useEffect(() => {
    if (keyword !== "") return getAutoTextData(keyword);
  }, [keyword]);

  // useEffect(() => {
  //   setTargetDependency(data);
  //   if (rootRef?.current) {
  //     rootRef.current.scrollTop = scrollPosition;
  //   }
  // }, [data]);

  useEffect(() => {
    // setScrollPosition(rootRef.current?.scrollTop ?? 0);
    if (data?.pageData.last) return;

    // if (!!data && isInterSecting) {
    // filterItems ? filterAPI : noFilterAPI
    const nextPageNum = data?.pageData.currPageNum
      ? data?.pageData.currPageNum + 1
      : 1;

    const args = {
      pageNum: nextPageNum,
      pageSize: 10,
      cntrGb: activeTab,
      myCasePgYn: "Y",
    };

    if (filterBody.regType !== "") {
      getFilteredData({ pageNum: nextPageNum, body: filterBody });
    } else {
      getNoFilteredData(args);

      // if (rootRef?.current) {
      //   rootRef.current.scrollTop = scrollPosition;
      // }
    }
    // }
    // }, [isInterSecting, data]);
  }, [data]);

  usePulltoRefresh(IsOpenFilter ? "" : rootRef, onReLoad);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  const [defaultTabIndex, setDefaultTabIndex] = useState(
    activeTab === "PROG" ? 0 : 1
  );

  const onChange = (index: any) => {
    const cntrGb = index === 0 ? CntrGb.PROG : CntrGb.DONE;
    setActiveTab(cntrGb);
    onInitFilter();
    setKeyword({ type: "reset" });
    getNoFilteredData({
      pageNum: 1,
      pageSize: 10,
      cntrGb,
      myCasePgYn: "Y",
    });

    setDefaultTabIndex(defaultTabIndex);
  };

  return (
    <main
      className={`w-full h-full flex flex-col grow ${
        process.env.NEXT_PUBLIC_APP_MODE === "local" ? "pb-20" : ""
      }`}
    >
      <Tabs
        className="grow flex-col"
        display={"flex"}
        defaultIndex={defaultTabIndex}
        onChange={onChange}
      >
        <TabList
          as="section"
          className="_header-next-sticky-area px-4 bg-kos-white"
          borderBottom={"1px solid #EAEAEA"}
        >
          <h2 className="sr-only">내 사건 탭 영역</h2>
          <Tab
            id="progTab"
            borderBottom={activeTab === CntrGb.PROG ? "2px solid #121212" : ""}
            boxSizing={"content-box"}
            textColor={activeTab === CntrGb.PROG ? "black" : "#A3A3A3"}
            fontWeight={"600"}
            className={`text-center basis-1/2 h-13 -tracking-[0.32px]`}
          >
            진행 사건 ({data?.progCntrInfo?.cntrCount ?? "0"})
          </Tab>
          <Tab
            id="doneTab"
            borderBottom={`${
              activeTab === CntrGb.DONE ? "2px solid #121212" : ""
            }`}
            boxSizing={"content-box"}
            textColor={`${activeTab === CntrGb.DONE ? "black" : "#A3A3A3"}`}
            fontWeight={"600"}
            className={`text-center basis-1/2 h-13 -tracking-[0.32px]`}
          >
            등기 확인중 ({data?.doneCntrInfo?.cntrCount ?? "0"})
          </Tab>
        </TabList>

        <section>
          <h2 className="sr-only">내 사건 검색 영역</h2>
          {activeTab === CntrGb.PROG && isProgFilterSearchShow && (
            <div className="py-2 px-4">
              <SearchBar
                as="Link"
                href={`/my-case/cntr/search?cntrGb=PROG`}
                placeholder="차주명 혹은 여신번호를 입력해주세요"
                value={keyword}
                removeValue={() => {
                  setKeyword({ type: "reset" });
                  getNoFilteredData({
                    pageNum: 1,
                    pageSize: 10,
                    cntrGb: activeTab,
                    myCasePgYn: "Y",
                  });
                }}
              />
            </div>
          )}
          {activeTab === CntrGb.DONE && isDoneFilterSearchShow && (
            <div className="py-2 px-4">
              <SearchBar
                as="Link"
                href={`/my-case/cntr/search?cntrGb=DONE`}
                placeholder="차주명 혹은 여신번호를 입력해주세요"
                value={keyword}
                removeValue={() => {
                  setKeyword({ type: "reset" });
                  getNoFilteredData({
                    pageNum: 1,
                    pageSize: 10,
                    cntrGb: activeTab,
                    myCasePgYn: "Y",
                  });
                }}
              />
            </div>
          )}

          {/* filter bar */}
          {(activeTab === CntrGb.PROG
            ? isProgFilterSearchShow
            : isDoneFilterSearchShow) && (
            <div className="flex w-full pb-3 px-4 relative border-b border-b-8 border-kos-gray-200">
              <div className="basis-4/5 flex gap-x-3 items-center overflow-x-scroll whitespace-nowrap">
                <button
                  type="button"
                  className={`rounded-lg flex items-center p-2 gap-1 shrink-0 border ${
                    filterBody.regType !== ""
                      ? "border-kos-yellow-100 bg-kos-yellow-100"
                      : "border-kos-gray-300 bg-transparent"
                  }`}
                  onClick={() => {
                    openFilter();
                  }}
                >
                  <Image
                    src={
                      filterBody.regType !== "" ? FilterOrangeIcon : FilterIcon
                    }
                    width={24}
                    alt="필터 아이콘"
                  />
                  <Typography
                    color={
                      filterBody.regType !== ""
                        ? "text-kos-orange-500"
                        : "text-kos-gray-700"
                    }
                    type={Typography.TypographyType.B4}
                  >
                    필터
                  </Typography>
                </button>
                {filterBody.regType !== "" && (
                  <>
                    <div
                      className={`shrink-0 p-2 flex gap-1 rounded-xl items-center border border-kos-transparent bg-kos-orange-50 text-kos-orange-500`}
                    >
                      <Image src={CheckBoxSmallOn} alt="체크 아이콘" />
                      <span className="font-semibold text-sm">
                        {filterBody.regType === "ALL"
                          ? "전체"
                          : RGSTR_TEXT[filterBody.regType]}
                      </span>
                    </div>
                    {filterBody.startDate !== "" &&
                      filterBody.endDate !== "" && (
                        <div
                          className={`_flex-center shrink-0 font-semibold text-sm rounded-xl p-2 border border-kos-transparent bg-kos-orange-50 text-kos-orange-500`}
                        >
                          <Image src={CalendarOrangeIcon} alt="달력 아이콘" />
                          {`${filterBody.startDate.slice(
                            4,
                            6
                          )}.${filterBody.startDate.slice(6, 8)}
                          - ${filterBody.endDate.slice(
                            4,
                            6
                          )}.${filterBody.endDate.slice(6, 8)}`}
                        </div>
                      )}
                  </>
                )}
              </div>
              {filterBody.regType !== "" && (
                <div className="basis-1/5 flex justify-end">
                  <button
                    onClick={() => {
                      onInitFilter();
                      getNoFilteredData({
                        pageNum: 1,
                        pageSize: 10,
                        cntrGb: activeTab,
                        myCasePgYn: "Y",
                      });
                    }}
                    className="flex items-center relative py-2 text-sm font-semibold text-kos-gray-700 before:content-[''] before:block before:w-5 before:h-10 before:absolute before:-left-5 before:bg-gradient-to-l before:from-white before:z-10"
                  >
                    초기화
                    <Image src={ResetBlackIcon} alt="초기화 아이콘" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
        <section className="flex flex-col grow h-full">
          <h2 className="sr-only">내 사건 목록 영역</h2>
          <div ref={rootRef} className="flex flex-col grow h-full">
            {(isPending || isLoading) && rootRef.current?.scrollTop === 0 ? (
              <Loading />
            ) : (
              <TabPanels
                className={`h-full${
                  (data?.progCntrInfo?.cntrCount === 0 ||
                    data?.progCntrInfo?.cntrList.length === 0) &&
                  (data?.doneCntrInfo?.cntrCount === 0 ||
                    data?.doneCntrInfo?.cntrList.length === 0)
                    ? "w-full flex grow  justify-center items-center"
                    : ""
                }`}
              >
                {" "}
                {activeTab === CntrGb.PROG && (
                  <TabPanel className="flex grow h-full" padding={"0"}>
                    <div className="flex flex-col grow w-full h-full gap-6 px-4 pt-6">
                      {activeTab === CntrGb.PROG &&
                        (data?.progCntrInfo?.cntrCount === 0 ? (
                          <div className="flex grow justify-center w-full h-full">
                            <div className="flex flex-col gap-y-3 items-center">
                              <Image src={AddDocumentIcon} alt="문서 아이콘" />
                              <p className="text-center">
                                진행중인 사건이 없습니다.
                                <br />
                                사건을 수임해보세요.
                              </p>
                              <button
                                onClick={() => {
                                  //@ts-ignore
                                  window.flutter_inappwebview.callHandler(
                                    "flutterFunc",
                                    {
                                      // @ts-ignore
                                      mode: "BOTTOM_TABVIEW_MOVE",
                                      data: {
                                        type: "2",
                                        url: "/acceptance/match/case-accept",
                                      },
                                    }
                                  );
                                }}
                                className="px-4 py-2 rounded-xl bg-kos-orange-500"
                              >
                                <Typography
                                  type={Typography.TypographyType.H5}
                                  color="text-kos-white"
                                >
                                  사건수임하기
                                </Typography>
                              </button>
                            </div>
                          </div>
                        ) : activeTab === CntrGb.PROG &&
                          data?.progCntrInfo?.cntrList != null &&
                          data?.progCntrInfo?.cntrList.length === 0 ? (
                          <div className="w-full h-full flex grow justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                              <Image
                                src={ExclamationMarkWithGrayBg}
                                alt="exclamation mark"
                                className="mb-3"
                              />
                              <Typography
                                type={Typography.TypographyType.H5}
                                color="text-kos-gray-800"
                              >
                                검색 결과 없음
                              </Typography>
                              <Typography
                                type={Typography.TypographyType.H5}
                                color="text-kos-gray-600"
                              >
                                필터를 삭제하고 다시 시도해주세요
                              </Typography>
                            </div>
                          </div>
                        ) : (
                          activeTab === CntrGb.PROG &&
                          data?.progCntrInfo?.cntrList.map((parent, i) => (
                            <ListContainer
                              ref={targetRef}
                              date={parent.date}
                              key={`${parent.date}${i}`}
                              className="bg-kos-white divide-y divide-kos-200"
                              id={parent.date}
                            >
                              {parent.cntrDataList.map((child, i) => (
                                <li key={child.loanNo}>
                                  <Link
                                    href={`/my-case/cntr/${child.loanNo}?regType=${child.rgstrGbCd}`}
                                    onClick={() =>
                                      setKeyword({ type: "reset" })
                                    }
                                    className="block"
                                  >
                                    {/* 개발 단계에서만 사용 */}
                                    <CaseList.CaseListItem
                                      key={child.loanNo}
                                      isNew={child.newCntrYn === "Y"}
                                      leftItem={
                                        <Image
                                          src={WooriBankLogoIcon}
                                          alt="우리은행 로고"
                                        />
                                      }
                                      statCd={`${child.statCd} ${child.statNm}`}
                                      rgstrGbCd={child.rgstrGbCd}
                                      contentsList={[
                                        <CaseList.Address
                                          key={child.loanNo}
                                          address={child.lndThngAddr}
                                        />,
                                        <CaseList.NameWithLoanNo
                                          key={child.loanNo}
                                          firstItem={child.dbtrNm}
                                          secondItem={child.loanNo}
                                        />,
                                      ]}
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ListContainer>
                          ))
                        ))}
                    </div>
                  </TabPanel>
                )}
                {activeTab === CntrGb.DONE && (
                  <TabPanel className="flex grow h-full" padding={"0"}>
                    <div className="flex flex-col grow w-full h-full gap-6 px-4 pt-6">
                      {activeTab === CntrGb.DONE &&
                      data?.doneCntrInfo?.cntrCount === 0 ? (
                        <div className="w-full h-full flex grow justify-center">
                          <Typography
                            type={Typography.TypographyType.H5}
                            color="text-kos-gray-600"
                          >
                            등기 확인중인 사건이 없습니다.
                          </Typography>
                        </div>
                      ) : activeTab === CntrGb.DONE &&
                        data?.doneCntrInfo?.cntrList != null &&
                        data?.doneCntrInfo?.cntrList.length === 0 ? (
                        <div className="w-full h-full flex grow justify-center items-center">
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              src={ExclamationMarkWithGrayBg}
                              alt="exclamation mark"
                              className="mb-3"
                            />
                            <Typography
                              type={Typography.TypographyType.H5}
                              color="text-kos-gray-800"
                            >
                              검색 결과 없음
                            </Typography>
                            <Typography
                              type={Typography.TypographyType.H5}
                              color="text-kos-gray-600"
                            >
                              필터를 삭제하고 다시 시도해주세요
                            </Typography>
                          </div>
                        </div>
                      ) : (
                        activeTab === CntrGb.DONE &&
                        data?.doneCntrInfo?.cntrList?.map((parent, i) => (
                          <ListContainer
                            ref={targetRef}
                            key={`${i}${parent.date}`}
                            date={parent.date}
                            className={"bg-kos-white divide-y divide-kos-200"}
                            id={parent.date}
                          >
                            {parent.cntrDataList.map((child) => (
                              <li key={child.loanNo}>
                                <Link
                                  href={`/my-case/cntr/${child.loanNo}?regType=${child.rgstrGbCd}`}
                                  key={child.loanNo}
                                  className="block"
                                >
                                  <CaseList.CaseListItem
                                    key={child.loanNo}
                                    statCd={`${child.statCd} ${child.statNm}`}
                                    rgstrGbCd={child.rgstrGbCd as string}
                                    leftItem={
                                      <Image
                                        src={WooriBankLogoIcon}
                                        alt="우리은행 로고"
                                      />
                                    }
                                    contentsList={[
                                      <CaseList.Address
                                        key={child.loanNo}
                                        address={child.lndThngAddr}
                                      />,
                                      <CaseList.NameWithLoanNo
                                        key={child.loanNo}
                                        firstItem={child.dbtrNm}
                                        secondItem={child.loanNo}
                                      />,
                                    ]}
                                  />
                                </Link>
                              </li>
                            ))}
                          </ListContainer>
                        ))
                      )}
                    </div>
                  </TabPanel>
                )}
              </TabPanels>
            )}
          </div>
        </section>
      </Tabs>

      <FilterBottomSheet
        isOpen={IsOpenFilter}
        close={closeFilter}
        setForm={setFilterBody}
        getFilteredData={getFilteredData}
        condition={data.fillInfo}
        filterBody={filterBody}
      />
      <Alert
        isOpen={isOpen}
        title={"상환금 수령용 계좌 등록이 필요합니다."}
        confirmText={"확인"}
        confirmCallBack={() => {
          // setRouter({ prevPage: "case" });
          // router.push("/information/cntr/001");
          pageRouter.prevPage === "case" ? "/my-case" : "/information/cntr/001";
        }}
        bodyText={
          "우리은행 사건 상환 업무 진행을 위해 상환금 수령용 계좌 등록 페이지로 이동합니다."
        }
      />
      {/* 신규 배정사건 팝업 */}
      <Alert
        isOpen={isOpenNewProAlert}
        title={
          <span>
            협약된 금융기관에서
            <br />
            신규 배정된 사건이 있습니다
          </span>
        }
        confirmText={"확인"}
        confirmCallBack={() => {
          toggleDimmedBottomNavigation(false);
          closeNewProgPopUP();
        }}
        bodyText={
          <span>
            목록에서 new 표시된 설정·말소등기 사건을
            <br />
            눌러 상세내용을 확인해주세요
          </span>
        }
      />
    </main>
  );
}
