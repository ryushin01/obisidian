"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { ToastNotice, ToastFail, ToastSuccess } from "@icons";
import { toastState } from "@stores";
import { useAtomValue } from "jotai";

export default function ToastModal() {
  const toastVars = useAtomValue(toastState);

  const icon =
    toastVars.status === "success"
      ? ToastSuccess
      : toastVars.status === "notice"
      ? ToastNotice
      : toastVars.status === "error"
      ? ToastFail
      : null;

  const msgs = toastVars.msg.split("\n");

  return (
    <>
      {createPortal(
        toastVars.isOpen && (
          <section
            className={`fixed flex justify-center w-full px-4 z-[999999999] ${
              toastVars.dim
                ? "bg-kos-dim-60 h-full items-end pb-[98px]"
                : "bottom-[98px]"
            }`}
          >
            <div className="flex w-fit items-center gap-4 border-box p-3 bg-kos-dim-60 rounded-xl">
              <span className="w-6 h-6">
                <Image src={icon} alt="toast icon" />
              </span>
              <div className="text-kos-white text-[15px]">
                {msgs?.map((msg, idx) => {
                  return <div key={idx}>{msg}</div>;
                })}
              </div>
            </div>
          </section>
        ),
        document.body
      )}
    </>
  );
}
