import React, { Children, ReactNode } from "react";

export default function InputGroup({ children }: { children: ReactNode }) {
  const childrenArray = Children.toArray(children);
  return (
    <div className="flex gap-x-2 w-full">
      <div className="basis-5/12">{childrenArray[0]}</div>
      <div className="basis-7/12">{childrenArray[1]}</div>
    </div>
  );
}
