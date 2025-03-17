"use client";

import { Grid, GridItem } from "@components/layout";
import { PageIndicator, ResponsiveSwiper } from "@components/common";
import { Button } from "@components/button";
import { Modal } from "@components/modal";
import { useDisclosure, useResponsive } from "@hooks";
import RegistrationTable from "./registration-table";

export default function List() {
  // const {
  //   isOpen: isModalOpen,
  //   open: openModal,
  //   close: closeModal,
  // } = useDisclosure();

  const [isMobile] = useResponsive();

  return (
    <>
      <div className="mt-4 [&>div]:justify-end [&>div>div]:p-0">
        <Grid>
          <GridItem desktop={2} tablet={12} mobile={12}>
            <Button
              shape="solid"
              size="md"
              color="main100"
              onClick={() => console.log("전자등기 의뢰 페이지 이동")}>
              전자등기 의뢰하기
            </Button>
          </GridItem>
        </Grid>
      </div>

      <PageIndicator total={180} page={5} limit={isMobile ? 5 : 10} />


      {/*<button type="button" className="absolute top-1/2 left-1/2" onClick={openModal}>모달 열기</button>*/}

      {/*{isModalOpen &&*/}
      {/*  <Modal title="등기자료" onClose={closeModal}>*/}
      {/*    <Grid>*/}
      {/*      <GridItem desktop={5} tablet={6} mobile={12}>*/}
      {/*        <ResponsiveSwiper />*/}
      {/*      </GridItem>*/}
      {/*      <GridItem desktop={7} tablet={6} mobile={12}>*/}
      {/*        /!* registration *!/*/}
      {/*        <RegistrationTable />*/}
      {/*      </GridItem>*/}
      {/*    </Grid>*/}
      {/*  </Modal>*/}
      {/*}*/}
    </>
  );
}