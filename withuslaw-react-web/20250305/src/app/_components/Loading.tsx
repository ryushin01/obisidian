import React from "react";

/**
 * Loading 애니메이션
 */

export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 z-10000000">
        <span
          className="absolute top-1/2 left-1/2 block w-2 h-2 rounded-full"
          style={{
            animation: "loading 2s ease-in-out infinite normal",
          }}
        />
      </div>
      <style>
        {`
          @keyframes loading {
            0% {
              box-shadow: -24px -12px #f90,  -8px 0 #FFF8EE,  8px 0 #FFF8EE;
            }
            33% {
              box-shadow: -24px 0px #FFE2B8, -8px -12px #f90,  8px 0 #FFF8EE;
            }
            66% {
              box-shadow: -24px 0px #FFF8EE, -8px 0 #FFE2B8,  8px -12px #f90;
            }
            100% {
              box-shadow: -24px -12px #f90,  -8px 0 #FFF8EE,  8px 0 #FFE2B8;
            }
            
          }
        `}
      </style>
    </>
  );
}
