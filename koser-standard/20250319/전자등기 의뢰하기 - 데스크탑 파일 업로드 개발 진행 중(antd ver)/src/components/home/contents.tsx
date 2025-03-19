"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { NarrowRightIcon } from "@icons20";
import { FI_NOTICE_PATH, FI_STATUS_INQUIRY } from "@constants/path";
import { Typography } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { Button } from "@components/button";
import { ResponsiveType } from "@types";
import RegistrationStratus from "./registrationStatus";
import Announcement from "./announcement";

export default function Contents({ isMobile }: ResponsiveType) {
  const router = useRouter();

  return (
    <Grid>
      <GridItem desktop={7} tablet={7} mobile={12}>
        <div className={`relative ${isMobile ? "pb-8" : ""}`}>
          <div className="m-2">
            <Typography
              kind={isMobile ? "title-large" : "headline-large"}
              isBold={true}
            >
              실시간 등기현황
            </Typography>
          </div>
          <RegistrationStratus />
          <div className="absolute top-0 right-0">
            <Button
              shape="none"
              size="sm"
              color="grayscale"
              icon={
                <Image
                  src={NarrowRightIcon.src}
                  alt="더보기 화살표"
                  width={20}
                  height={20}
                />
              }
              iconPosition="right"
              onClick={() => router.push(FI_STATUS_INQUIRY)}
              // disabled={true}
            >
              더보기
            </Button>
          </div>
        </div>
      </GridItem>
      <GridItem desktop={5} tablet={5} mobile={12}>
        <div className={`relative ${isMobile ? "pb-20" : ""}`}>
          <div className="m-2">
            <Typography
              kind={isMobile ? "title-large" : "headline-large"}
              isBold={true}
            >
              공지사항
            </Typography>
          </div>
          <Announcement />
          <div className="absolute top-0 right-0">
            <Button
              shape="none"
              size="sm"
              color="grayscale"
              icon={
                <Image
                  src={NarrowRightIcon.src}
                  alt="더보기 화살표"
                  width={20}
                  height={20}
                />
              }
              iconPosition="right"
              onClick={() => router.push(FI_NOTICE_PATH)}
              // disabled={true}
            >
              더보기
            </Button>
          </div>
        </div>
      </GridItem>
    </Grid>
  );
}
