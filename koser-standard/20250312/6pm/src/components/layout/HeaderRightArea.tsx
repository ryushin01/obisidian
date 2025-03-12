"use client";

import Image from "next/image";
import { EmblemWithText } from "@logos";
import { AccountLayer } from "@components/common";
import { Form, SearchInput } from "@components/form";
import { Drawer } from "@components/drawer";
import { useDisclosure } from "@hooks";
import { isBrowser, isMobile } from "react-device-detect";

/**
 * @name HeaderRightArea
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function HeaderRightArea() {
  const {
    isOpen: isDropdownOpen,
    open: openDropdown,
    close: closeDropdown,
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useDisclosure();

  return (
    <div className="_header-right-area">
      {/* NOTE: 금융기관(신협) */}
      <Form
        onSubmit={() => console.log("submit")}
        onChange={() => console.log("change")}
        legendText="의뢰번호 검색"
        isHiddenLegend={true}
      >
        <SearchInput
          name="search"
          shape="xl"
        />
      </Form>

      <button
        type="button"
        onClick={isBrowser ? openDropdown : openDrawer}
      >
        <Image src={EmblemWithText} alt="성북신협 로고" width={96} height={32} />
      </button>

      {/* NOTE: 법무대리인 */}
      {/*<div>홍길동 법무법인</div>*/}

      {/* NOTE: 관리자 */}
      {/*<div>관리자</div>*/}

      {(isBrowser && isDropdownOpen) &&
        <AccountLayer
          onClose={closeDropdown}
        />
      }

      {(isMobile && isDrawerOpen) &&
        <Drawer
          onClose={closeDrawer} />
      }
    </div>
  );
}