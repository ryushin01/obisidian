export default function TableTest() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <table className="_responsive-table _col-5-type">
          <caption>5컬럼 테이블</caption>
          <thead>
          <tr>
            <th>의뢰번호</th>
            <th>대출실행일</th>
            <th>의뢰일시</th>
            <th>진행상태</th>
            <th>등기자료</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span>2410140001</span>
            </td>
            <td>
              <span>2024-12-25</span>
            </td>
            <td>
              <span>2024-12-17 15:30:15</span>
            </td>
            <td>
              <span>등기의뢰</span>
            </td>
            <td>
              <span>버튼</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>2410140001</span>
            </td>
            <td>
              <span>2024-12-25</span>
            </td>
            <td>
              <span>2024-12-17 15:30:15</span>
            </td>
            <td>
              <span>등기의뢰</span>
            </td>
            <td>
              <span>버튼</span>
            </td>
          </tr>
          </tbody>
        </table>

        <table className="_responsive-table _col-6-type">
          <caption>6컬럼 테이블</caption>
          <thead>
          <tr>
            <th>No</th>
            <th>의뢰번호</th>
            <th>채무자</th>
            <th>등기접수상태</th>
            <th>등기접수번호</th>
            <th>법무대리인</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span>99</span>
            </td>
            <td>
              <span>2410140001</span>
            </td>
            <td>
              <span>오정학</span>
            </td>
            <td>
              <span>완료</span>
            </td>
            <td>
              <span>123456</span>
            </td>
            <td>
              <span>
                {/*<span>홍길동 법무법인</span> <span className="_line-breaking">(02-123-4567)</span>*/}
                홍길동 법무법인 (02-123-4567)
              </span>
            </td>
          </tr>
          </tbody>
        </table>

        <table className="_responsive-table _col-8-type">
          <caption>8컬럼 테이블</caption>
          <thead>
          <tr>
            <th>No</th>
            <th>의뢰번호</th>
            <th>의뢰일</th>
            <th>대출실행일</th>
            <th>진행상태</th>
            <th>채무자</th>
            <th>등기자료</th>
            <th>등기접수증</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span>99</span>
            </td>
            <td>
              <span>2410140001</span>
            </td>
            <td>
              <span>2024-12-25</span>
            </td>
            <td>
              <span>2024-12-17</span>
            </td>
            <td>
              <span>배정완료</span>
            </td>
            <td>
              <span>오정학</span>
            </td>
            <td>
              <span>등기자료 버튼</span>
            </td>
            <td>
              <span>등기접수증 버튼</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </>
  )
    ;
}
