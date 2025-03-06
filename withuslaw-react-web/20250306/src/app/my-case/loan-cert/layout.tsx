import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col grow w-full h-full px-4 pt-6 pb-4">
      {children}
    </div>
  );
}
