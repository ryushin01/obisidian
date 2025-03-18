import { ResponsiveSwiper, Typography } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { Button } from "@components/button";
import { Modal } from "@components/modal";
import { useDisclosure } from "@hooks";
import { ResponsiveType } from "@types";
import Detail from "./detail";
import "@styles/responsive-table.css";

export default function ListTable({ isMobile }: ResponsiveType) {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useDisclosure();

  // TODO: 등기자료 버튼 클릭 시 해당 의뢰번호(rqstNo) 기준으로 데이터 페칭 > 데이터 페칭 완료 시 Detail 컴포넌트로 주입하고 모달 팝업 오픈

  return (
    <>
      <div className="_responsive-table-inner-wrapper _has-thead">
        <table className="_responsive-table _col-5-type">
          <caption className="_hidden-table-caption">전자등기 의뢰목록 미배정 표</caption>
          <thead>
          <tr>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>의뢰번호</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>대출실행일</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>의뢰일시</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>진행상태</Typography>
            </th>
            <th>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} isBold={true}>등기자료</Typography>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">접수완료 [5583,
                5584]</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              {/* NOTE: 보완필요 케이스는 _supplement 클래스까지 넣어서 더블 클래스 필요 */}
              <Typography kind={isMobile ? "body-medium" : "title-medium"}
                          className="_status _supplement">보완필요</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
            </td>
          </tr>
          <tr>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2410140001</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2025-3-10</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"}>2024-12-17 15:30:15</Typography>
            </td>
            <td>
              <Typography kind={isMobile ? "body-medium" : "title-medium"} className="_status">등기의뢰</Typography>
            </td>
            <td>
            <span className="_table-button-wrapper">
              <Button
                shape="solid"
                size="sm"
                color="main60"
                onClick={openModal}>
                등기자료
              </Button>
            </span>
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
              <Detail />
            </GridItem>
          </Grid>
        </Modal>
      }
    </>
  );
}