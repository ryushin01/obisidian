"use client";

import { ChangeEvent, forwardRef, KeyboardEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseWithCircle, Magnifying } from "@icons";

type TProps = {
  placeholder?: string;
  value?: string;
  href?: string;
  as?: "Link" | "input";
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: any;
  removeValue?: () => void;
};

const SearchBar = forwardRef<HTMLInputElement, TProps>(
  (
    {
      placeholder,
      value,
      href,
      as = "input",
      handleChange,
      handleKeyDown,
      removeValue,
    },
    ref
  ) => {
    const isValidValue = !!value && value !== "";
    return (
      <div className="w-full border border-kos-gray-500 border-1 flex justify-between pl-4 pr-2 py-2 rounded-xl">
        <div className="grow flex gap-2 items-center">
          <Image src={Magnifying} alt="검색 아이콘" />
          {as === "Link" ? (
            <Link
              className={`w-full grow border-none outline-none ${
                isValidValue
                  ? "text-kos-gray-800 font-semibold"
                  : "text-kos-gray-600"
              }`}
              href={href ?? ""}
            >
              {isValidValue ? value : placeholder}
            </Link>
          ) : (
            <input
              placeholder={placeholder}
              value={value}
              ref={ref}
              type="text"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full outline-none border-none placeholder:text-kos-gray-600"
            />
          )}
        </div>
        {isValidValue && (
          <button onClick={removeValue}>
            <Image src={CloseWithCircle} alt="close button" />
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar"; // displayName 설정
export default SearchBar;
