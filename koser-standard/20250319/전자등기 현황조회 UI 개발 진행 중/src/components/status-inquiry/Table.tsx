import { ResponsiveSwiper, Typography } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { Button } from "@components/button";
import { Modal } from "@components/modal";
import { useDisclosure } from "@hooks";
import { ResponsiveType } from "@types";
// import Detail from "./Detail";
import "@styles/responsive-table.css";
import Detail from "@components/request-list/Detail";

export default function Table({ isMobile }: ResponsiveType) {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useDisclosure();

  // TODO: 등기자료 / 등기접수증 버튼 클릭 시 해당 의뢰번호(rqstNo) 기준으로 데이터 페칭 > 데이터 페칭 완료 시 Detail 컴포넌트로 주입하고 모달 팝업 오픈

  return (
    <>
      <div className="_responsive-table-inner-wrapper _has-thead">
        <table className="_responsive-table _col-7-type">
          <caption className="_hidden-table-caption">전자등기 현황조회 표</caption>
          <thead>
          <tr>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>의뢰번호</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>의뢰일</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>대출실행일</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>진행상태</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>채무자</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>등기자료</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>등기접수증</Typography>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              {/* NOTE: 보완필요 케이스는 _supplement 클래스까지 넣어서 더블 클래스 필요 */}
              <Typography kind={isMobile ? "body-medium" : "title-medium"}
                          className="_status _supplement">보완필요</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">대출실행</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">접수완료 [1235]</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">접수완료 [55384,
                55385]</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-03-19</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>채무자</Typography>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </td>
            <td>
              <Button
                shape="solid"
                size="sm"
                color="bluegray"
                onClick={openModal}>
                등기접수증
              </Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      {isModalOpen &&
        <Modal title="등기자료" onClose={closeModal}>
          <Grid>
            <GridItem desktop={5} tablet={6} mobile={12}>
              <ResponsiveSwiper isMobile={isMobile} />
            </GridItem>
            <GridItem desktop={7} tablet={6} mobile={12}>
              <Detail isMobile={isMobile} />
            </GridItem>
          </Grid>
        </Modal>
      }
    </>
  );
}