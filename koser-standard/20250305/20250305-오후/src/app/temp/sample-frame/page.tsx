"use client";

import Image from "next/image";
import { Frame } from "@components/common";
import { Image1, Image2, Image3 } from "@images";

export default function SampleFrame() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-80">
        <Frame>
          <Image src={Image1} alt="1번 이미지" />
        </Frame>
      </div>

      <Frame aspectRatio="video">
        <Image src={Image2} alt="2번 이미지" />
      </Frame>

      <Frame aspectRatio="square">
        <Image src={Image3} alt="3번 이미지" />
      </Frame>
    </div>
  );
}
