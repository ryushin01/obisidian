"use client";

import { AccountLayer } from "@components/common";
import { Drawer } from "@components/drawer";
import { useDisclosure } from "@hooks";
import { isBrowser, isMobile } from "react-device-detect";

export default function SampleDrawer() {
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
    <div>
      <button type="button" className="absolute top-1/2 left-1/2" onClick={isBrowser ? openDropdown : openDrawer}>드롭다운
        또는 드로어 열기
      </button>

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
