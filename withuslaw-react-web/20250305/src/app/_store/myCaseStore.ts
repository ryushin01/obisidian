import { atom } from "jotai";

type TArgs = {
  action: "save" | "saveWithPrevCount" | "initData" | "scrollData";
  key: "progCntrInfo" | "doneCntrInfo";
  value: TMyCaseData;
};

const initInfo = {
  cntrCount: 0,
  cntrList: [],
  newPopup: false,
};
const initData = {
  pageData: {
    currPageNum: 1,
    last: true,
    pageSize: 10,
    totalElements: 0,
    totalPageNum: 0,
  },
  progCntrInfo: initInfo,
  doneCntrInfo: initInfo,
  fillInfo: {
    bfAvail: false,
    endDate: "",
    erAvail: false,
    esAvail: false,
    startDate: "",
  },
};

/**
 *
 */

const myCaseAtom = atom<TMyCaseData>(initData);
const myCaseState = atom(
  (get) => get(myCaseAtom),
  (get, set, args: TArgs) => {
    const { action, key, value } = args;
    const prevState = get(myCaseAtom);

    if (action === "save") {
      set(myCaseAtom, { ...value });
    }
    if (action === "saveWithPrevCount") {
      const newInfo = value[key].cntrList ?? [];
      const key2 = key === 'progCntrInfo' ? 'doneCntrInfo' : 'progCntrInfo';
      const cntrList2 = (prevState[key2].cntrCount) 
                      ? [...prevState[key2].cntrList]
                      : [];
      const cntrCount2 = prevState[key2].cntrCount | 0;
      const newPopup2 = prevState[key2].newPopup ?? false;

      set(myCaseAtom, {
        ...value,
        [key]: { cntrList: [...newInfo], cntrCount: prevState[key].cntrCount, newPopup: value[key].newPopup },
        [key2] : { cntrList: cntrList2, cntrCount: cntrCount2, newPopup: newPopup2},
        fillInfo: prevState.fillInfo,
      });
    }
    if (action === "initData") {
      set(myCaseAtom, { ...value, [key]: initInfo });
      return;
    }
    if (action === "scrollData") {
      if (
        prevState[key].cntrList[prevState[key].cntrList.length - 1]?.date ===
        value[key].cntrList[0]?.date
      ) {
        const combineDate = value[key].cntrList[0]?.date;
        const combineData = [
          ...prevState[key].cntrList[prevState[key].cntrList.length - 1]
            ?.cntrDataList,
          ...value[key].cntrList[0]?.cntrDataList,
        ];
        set(myCaseAtom, {
          ...prevState,
          [key]: {
            cntrList: [
              ...prevState[key].cntrList.slice(
                0,
                prevState[key].cntrList.length - 1
              ),
              {
                date: combineDate,
                cntrDataList: combineData,
              },
              ...value[key].cntrList.slice(1),
            ],
            cntrCount: prevState[key].cntrCount,
            newPopup: value[key].newPopup,
          },
          pageData: value.pageData,
        });
        return;
      }
      set(myCaseAtom, {
        ...prevState,
        [key]: {
          cntrList: [...prevState[key].cntrList, ...value[key].cntrList],
          cntrCount: prevState[key].cntrCount,
          newPopup: value[key].newPopup,
        },
        pageData: value.pageData,
      });
    }
  }
);

export { myCaseState };
