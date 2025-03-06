import React from "react";

export default function ModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="z-50 fixed top-0 w-screen h-[100dvh] bg-kos-white">
      {children}
    </div>
  );
}
