"use client";

import { Grid, GridItem } from "@components/layout";
import { ResponsiveSwiper } from "@components/common";
import { Modal } from "@components/modal";
import { useDisclosure } from "@hooks";
import RegistrationTable from "./registration-table";

export default function RequestListTable() {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useDisclosure();

  return (
    <>
      <button type="button" className="absolute top-1/2 left-1/2" onClick={openModal}>모달 열기</button>

      {isModalOpen &&
        <Modal title="등기자료" onClose={closeModal}>
          <Grid>
            <GridItem desktop={5} tablet={6} mobile={12}>
              <ResponsiveSwiper />
            </GridItem>
            <GridItem desktop={7} tablet={6} mobile={12}>
              {/* registration */}
              <RegistrationTable />
            </GridItem>
          </Grid>
        </Modal>
      }
    </>
  );
}