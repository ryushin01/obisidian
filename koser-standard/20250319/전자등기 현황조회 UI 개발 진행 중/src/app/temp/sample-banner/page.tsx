"use client";

import { Banner } from "@components/common";

export default function BannerComponet() {
  return (
    <Banner name="성북신협" totalcount={100} inprogress={80} application={20} />
  );
}
