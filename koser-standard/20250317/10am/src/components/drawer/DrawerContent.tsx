import Image from "next/image";
import { FinanceEmblemMedium } from "@logos";
import { LogoutIcon } from "@icons14";
import { CHANGE_PASSWORD_INPUT } from "@constants/input";
import { Typography } from "@components/common";
import { Button } from "@components/button";
import { Form, InputField } from "@components/form";
import { Modal } from "@components/modal";
import { useDisclosure } from "@hooks";

type DrawerContentProps = {
  level: number;
  onClose: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/**
 * @name DrawerContent
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function DrawerContent({ level, onClose, isModalOpen, openModal, closeModal }: DrawerContentProps) {
  console.log(onClose);


  // const {
  //   isOpen: isModalOpen,
  //   open: openModal,
  //   close: closeModal,
  // } = useDisclosure();

  return (
    <div className="_drawer-content">
      {/* NOTE: 금융기관(신협) 케이스에서만 노출 */}
      {level === 1 && (
        <div className="_drawer-content-inner-wrapper">
          <Image src={FinanceEmblemMedium} alt="신협 로고" width={48} height={48} />
          <Typography kind="body-large" isBold={true}>성북신협</Typography>
        </div>
      )}

      <div className="_drawer-content-inner-wrapper">
        {level !== 3 && (
          <Button
            shape="solid"
            size="sm"
            color="main5"
            onClick={openModal}>
            비밀번호 변경
          </Button>
        )}

        <Button
          shape="outline"
          size="sm"
          color="grayscale"
          icon={
            <Image
              src={LogoutIcon}
              alt="로그아웃 아이콘"
              width={14}
              height={14}
            />
          }
          iconPosition="right"
          onClick={() => console.log("로그아웃")}>
          로그아웃
        </Button>
      </div>

      {isModalOpen &&
        <Modal
          title="비밀번호 변경"
          onClose={closeModal}
          size="md"
        >
          <Form
            onSubmit={() => console.log("submit")}
            legendText="비밀번호 변경 양식"
            isHiddenLegend={true}
            onChange={() => console.log("change")}
          >

          </Form>
        </Modal>
      }
    </div>
  );
};
