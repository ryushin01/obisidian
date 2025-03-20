"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FI_REQUEST } from "@constants/path";
import { FileAttachmentIcon, AlertCircleIcon, CheckCircleIcon } from "@icons36";
import { Grid, GridItem } from "@components/layout";
import { Typography } from "@components/common";
import { Button } from "@components/button";
import { useResponsive } from "@hooks";
import "@styles/banner.css";

type BannerProps = {
  name: string;
  totalcount: number;
  inprogress: number;
  application: number;
};

/**
 * @name Banner
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} name         - user 이름을 정의합니다.
 * @property {number} totalcount   - 오늘 실행 건수를 정의합니다.
 * @property {number} inprogress   - 진행중인 건수를 정의합니다.
 * @property {number} application  - 접수완료 건수를 정의합니다.
 */

/* TODO : 실제 사용할때 props 받아서 적용하기 */
export default function Banner({
                                 name,
                                 totalcount,
                                 inprogress,
                                 application,
                               }: BannerProps) {
  const router = useRouter();
  const [isMobile] = useResponsive();

  return (
    <section className="_banner-container">
      <Grid>
        <GridItem desktop={5} tablet={12} mobile={12}>
          <div className="_banner-left-content">
            <div className="_banner-text">
              <Typography kind={isMobile ? "headline-small" : "headline-large"}>
                <b>{name}</b>님,
              </Typography>
              <Typography kind={isMobile ? "headline-small" : "headline-large"}>
                {" "}
                좋은 하루 보내세요!
              </Typography>
            </div>
            <GridItem desktop={5} tablet={8} mobile={6}>
              <div className="_banner-button">
                <Button
                  size={isMobile ? "sm" : "md"}
                  shape="solid"
                  color="main5"
                  onClick={() => router.push(FI_REQUEST)}
                >
                  전자등기 의뢰하기
                </Button>
              </div>
            </GridItem>
          </div>
        </GridItem>
        <GridItem desktop={7} tablet={12} mobile={12}>
          <div className="_banner-right-content">
            <div
              className={`_todays-counts  after:absolute after:top-0 after:left-0 ${
                isMobile ? "after:w-4/5" : "after:w-full"
              } after:h-full after:rounded-2xl after:bg-koser-grayscale-100 after:opacity-10`}
            >
              <div className="_todays-image">
                <Image
                  src={FileAttachmentIcon}
                  width={32}
                  height={32}
                  alt="문서 아이콘"
                />
              </div>
              <div className="_content-text">
                <Typography kind={isMobile ? "title-small" : "title-medium"}>
                  오늘 실행 건수
                </Typography>
                <Typography kind={isMobile ? "title-large" : "headline-medium"}>
                  {totalcount}
                  <Typography kind={isMobile ? "title-small" : "title-medium"}>
                    건
                  </Typography>
                </Typography>
              </div>
            </div>

            <div
              className={`_each-counts after:absolute after:top-0 after:left-0 ${
                isMobile ? "after:w-4/5" : "after:w-full"
              } after:h-full after:rounded-2xl after:bg-koser-grayscale-100 after:opacity-10`}
            >
              <div className="_notice-image">
                <Image
                  src={AlertCircleIcon}
                  width={32}
                  height={32}
                  alt="알림 아이콘"
                />
              </div>
              <div className="_content-text">
                <Typography kind={isMobile ? "title-small" : "title-medium"}>
                  진행중
                </Typography>
                <Typography kind={isMobile ? "title-large" : "headline-medium"}>
                  {inprogress}
                  <Typography kind={isMobile ? "title-small" : "title-medium"}>
                    건
                  </Typography>
                </Typography>
              </div>
              <div className="_check-image">
                <Image
                  src={CheckCircleIcon}
                  width={32}
                  height={32}
                  alt="체크 아이콘"
                />
              </div>
              <div className="_content-text">
                <Typography kind={isMobile ? "title-small" : "title-medium"}>
                  접수완료
                </Typography>
                <Typography kind={isMobile ? "title-large" : "headline-medium"}>
                  {application}
                  <Typography kind={isMobile ? "title-small" : "title-medium"}>
                    건
                  </Typography>
                </Typography>
              </div>
            </div>
          </div>
        </GridItem>
      </Grid>
    </section>
  );
}
