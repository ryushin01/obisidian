import Image from "next/image";
import { EmblemWithText } from "@logos";
import { LogoutIcon } from "@icons14";
import { MenuIcon } from "@icons24";
import { DownArrowIcon, UpArrowIcon } from "@icons32";
import { AccountLayer } from "@components/common";
import { Button, IconButton } from "@components/button";
import { Form, SearchInput } from "@components/form";
import { Drawer } from "@components/drawer";
import { useDisclosure, useResponsive } from "@hooks";

/**
 * @name HeaderRightArea
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function HeaderRightArea() {
  const [isMobile] = useResponsive();

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

  // 임시 권한 구분 코드(1: 금융기관 / 2: 법무대리인 / 3: 관리자)
  const level: number = 3;

  return (
    <div className="_header-right-area">
      {/* NOTE: 금융기관(신협), 관리자 공통 */}
      {(level !== 2) && (
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
      )}

      {!isMobile && (
        <>
          {/* NOTE: 금융기관(신협) */}
          {level === 1 && (
            <>
              <button
                type="button"
                onClick={!isMobile ? openDropdown : openDrawer}
              >
                <Image src={EmblemWithText} alt="성북신협 로고" width={96} height={32} />
              </button>
            </>
          )}

          {/* NOTE: 법무대리인 */}
          {level === 2 && (
            <>
              <Button
                shape="none"
                size="md"
                color="grayscale"
                icon={
                  <Image
                    src={isDropdownOpen ? UpArrowIcon : DownArrowIcon}
                    alt={isDropdownOpen ? "위 화살표 아이콘" : "아래 화살표 아이콘"}
                    width={32}
                    height={32}
                  />
                }
                iconPosition="right"
                onClick={openDropdown}>
                홍길동 법무법인
              </Button>
            </>
          )}

          {/* NOTE: 관리자 */}
          {level === 3 && (
            <>
              <span>김뱅클</span>
              <div className="w-[103px]">
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
            </>
          )}
        </>
      )}

      {isMobile &&
        <IconButton
          size="md"
          onClick={openDrawer}
          icon={
            <Image
              src={MenuIcon}
              alt="메뉴 토글 아이콘"
              width={24}
              height={24}
            />
          }
        />
      }

      {(!isMobile && isDropdownOpen) &&
        <AccountLayer
          level={level}
          onClose={closeDropdown}
        />
      }

      {(isMobile && isDrawerOpen) &&
        <Drawer
          level={level}
          onClose={closeDrawer} />
      }
    </div>
  );
}