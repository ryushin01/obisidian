import { Dispatch, useState } from "react";
import Image from "next/image";
import {
  ArrowBackDoubleIcon,
  ArrowBackIcon,
  ArrowForwardDoubleIcon,
  ArrowForwardIcon,
} from "@icons";
import "@styles/pagination.css";

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  setPage: Dispatch<React.SetStateAction<number>>;
};

/**
 * @name Pagination
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {number} total        - 총 데이터 개수 정의합니다.
 * @property {number} page         - 현재 페이지를 정의합니다.
 * @property {number} limit        - 한페이지에 표시할 데이터 개수를 정의합니다.
 * @property {number} pageCount    - 한번에 표시할 페이지 개수를 정의합니다.(기본값 : 10개, 모바일 : 5개 )
 * @property {function} setPage    - 페이지를 변화시킬 set함수를 정의합니다.
 */

export default function Pagination({
                                     total,
                                     page,
                                     limit,
                                     pageCount,
                                     setPage,
                                   }: PaginationProps) {
  const [blockNum, setBlockNum] = useState(0);
  const pageLimit = pageCount;
  const blockArea = blockNum * pageLimit; // 각 페이지에서 첫 페이지네이션의 위치 계산
  const allPageNum = Math.ceil(total / limit); // 총 페이지네이션 갯수

  // 새로운 배열 생성 함수
  const createArray = (n: number) => {
    const newArr = new Array(n);
    for (let i = 0; i < n; i++) {
      newArr[i] = i;
    }
    return newArr;
  };
  const reArray = createArray(allPageNum); // 페이지네이션 재배열

  // 현재 페이지의 이전 페이지로 이동하는 버튼 이벤트 핸들러
  const goToPrevPage = () => {
    if (page <= 1) {
      return;
    } else if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n) => n - 1);
    }
    setPage((n) => n - 1);
  };

  // 첫번째 페이지로 이동하는 버튼 이벤트 핸들러
  const goToFirstPage = () => {
    if (page <= 1) {
      return;
    } else {
      setPage(1); // 첫 번째 페이지로 이동
      setBlockNum(0); // 첫 번째 블록으로 이동
    }
  };

  // 현재 페이지의 다음 페이지 이동하는 버튼 이벤트 핸들러
  const goToNextPage = () => {
    if (page >= allPageNum) {
      return;
    } else if (pageLimit * (blockNum + 1) < page + 1) {
      setBlockNum((n) => n + 1);
    }
    setPage((n) => n + 1);
  };

  // 마지막 페이지로 이동하는 버튼 이벤트 핸들러
  const goToLastPage = () => {
    if (page >= allPageNum) {
      return;
    } else {
      setPage(allPageNum); // 마지막 페이지로 이동
      setBlockNum(Math.floor((allPageNum - 1) / pageLimit)); // 마지막 블록으로 이동
    }
  };

  return (
    <section className="mt-8">
      <div className="_flex-center gap-x-1">
        <button
          className="_pagination-button"
          onClick={() => {
            goToFirstPage();
          }}
          disabled={page === 1}
        >
          <Image
            src={ArrowBackDoubleIcon}
            width={16}
            height={16}
            alt={"첫번째페이지 호출 아이콘"}
          />
        </button>
        <button
          className="_pagination-button"
          onClick={() => {
            goToPrevPage();
          }}
          disabled={page === 1}
        >
          <Image
            src={ArrowBackIcon}
            width={16}
            height={16}
            alt={"이전페이지 호출 아이콘"}
          />
        </button>
        {reArray.slice(blockArea, pageLimit + blockArea).map((n) => (
          <button
            className="_page-button"
            key={n + 1}
            onClick={() => setPage(n + 1)}
            aria-current={page === n + 1 && "page"}
          >
            {n + 1}
          </button>
        ))}
        <button
          className="_pagination-button"
          onClick={() => {
            goToNextPage();
          }}
          disabled={page === allPageNum}
        >
          <Image
            src={ArrowForwardIcon}
            width={16}
            height={16}
            alt={"다음페이지 호출 아이콘"}
          />
        </button>
        <button
          className="_pagination-button"
          onClick={() => {
            goToLastPage();
          }}
          disabled={page === allPageNum}
        >
          <Image
            src={ArrowForwardDoubleIcon}
            width={16}
            height={16}
            alt={"마지막페이지 호출 아이콘"}
          />
        </button>
      </div>
    </section>
  );
}
