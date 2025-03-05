"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage({ key, maxLength = 99999}: { key: string, maxLength?: number }) {
  const [isStorageExist, setIsStorageExist] = useState(false);

  const getItem = () => {
    if (isStorageExist) {
      const item = localStorage.getItem(key);
      if (!!item) return item.includes("[") ? JSON.parse(item) : item;
      return [];
    }
    return [];
  };

  const setItem = ({
    isInit = false,
    type,
    value,
  }: {
    isInit?: boolean;
    type?: "array" | "string" | "object";
    value?: string;
  }) => {
    if (isInit && !!type) {
      // storage 생성
      if (type === "string" && !!value) return localStorage.setItem(key, value);
      if (type === "array")
        return localStorage.setItem(key, JSON.stringify([]));
    }
    if (typeof getItem() === "string" && !!value)
      return localStorage.setItem(key, value);
    if (Array.isArray(getItem()) && !!value) {
      const prevItems = getItem();
      if (prevItems.length === 0)
        return localStorage.setItem(key, JSON.stringify([value]));
      if (!!prevItems) {
        if (prevItems.includes(value)) return;
        localStorage.setItem(key, JSON.stringify([...prevItems, value]));
        if (maxLength < getItem().length) localStorage.setItem(key, JSON.stringify([...getItem()].slice(maxLength*-1)));
        return;
      }
    }
  };

  const removeItem = ({
    type = "array",
    value,
  }: {
    type?: "string" | "array" | "object";
    value: string;
  }) => {
    if (type === "string") {
      removeStorage();
      return;
    }
    const prevItems = getItem();
    if (!!prevItems) {
      const filteredItem = prevItems.filter((prev: string) => prev !== value);
      localStorage.setItem(key, JSON.stringify(filteredItem));
    }
  };

  const removeStorage = () => localStorage.removeItem(key);

  useEffect(() => {
    setIsStorageExist(localStorage.getItem(key) !== null);
  }, [setItem, removeStorage]);

  return { isStorageExist, getItem, setItem, removeItem, removeStorage };
}
