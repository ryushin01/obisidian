"use client";

import { useEffect, useState } from "react";

export type TLocalItem = {
    value: string;
    expiry: number;
};

export default function useLocalStorageExpire(
  {
    key,
    time,
    maxLength = 99999,
  } : { 
    key: string,
    time: number,
    maxLength?: number
  }) {
  const [isStorageExist, setIsStorageExist] = useState(false);

  const getItem = () => {
    if (isStorageExist) {
      removeExpireItem();
      const item = localStorage.getItem(key);
      if (!!item) {
        const itemObj = JSON.parse(item);
        if (itemObj instanceof Array)
           return itemObj.map((obj: TLocalItem) => obj.value);
        else
           return itemObj.value
      }
    }
    return [];
  };

  const getItems = () => {
    if (isStorageExist) {
      const item = localStorage.getItem(key);
      if (!!item) return JSON.parse(item);
    }
    return [];    
  }

  const setItem = ({
    isInit = false,
    type,
    value,
  }: {
    isInit?: boolean;
    type?: "array" | "string" | "object";
    value?: string;
  }) => {
    const now = new Date();
    const item = {value : value, expiry: now.getTime() + time};

    if (isInit && !!type) {
      // storage 생성
      if (type === "string" && !!value) 
        return localStorage.setItem(key, JSON.stringify(item));
      if (type === "array")
        return localStorage.setItem(key, JSON.stringify([]));
    }

    if (typeof getItems() === "string" && !!value)
      return localStorage.setItem(key, JSON.stringify(item));

    const prevItems = getItems();
    if (Array.isArray(prevItems) && !!value) {
      if (prevItems.length === 0)
        return localStorage.setItem(key, JSON.stringify([item]));
      if (!!prevItems) {
        const prevValues = prevItems.map((obj: TLocalItem) => obj.value);
        if (prevValues.includes(value)) return;

        localStorage.setItem(key, JSON.stringify([...prevItems, item]));
        if (maxLength < prevItems.length) localStorage.setItem(key, JSON.stringify([...prevItems].slice(maxLength*-1)));
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
    const prevItems = getItems();
    if (!!prevItems) {
      const filteredItem = prevItems.filter((prev: TLocalItem) => prev.value !== value);
      localStorage.setItem(key, JSON.stringify(filteredItem));
    }
  };

  const removeStorage = () => localStorage.removeItem(key);

  const removeExpireItem = () => {
    if (isStorageExist) {
      const item = localStorage.getItem(key);
      if (!!item) {
        const now = new Date();
        const itemObj = JSON.parse(item);
        const filteredItem = itemObj.filter((obj: TLocalItem) => obj.expiry > now.getTime());
        localStorage.setItem(key, JSON.stringify(filteredItem));
      }
    }
  }

  useEffect(() => {
    setIsStorageExist(localStorage.getItem(key) !== null);
  }, [setItem, removeStorage]);

  return { isStorageExist, getItem, setItem, removeItem, removeStorage };
}
