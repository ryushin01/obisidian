import React from "react";

export default function NextStep({
  nextProgGbNm,
  nextProgNum,
}: {
  nextProgGbNm?: string;
  nextProgNum?: string;
}) {
  return (
    <div className="px-5 bg-kos-white rounded-2xl text-kos-gray-500 font-bold py-3">
      {nextProgGbNm}
    </div>
  );
}
