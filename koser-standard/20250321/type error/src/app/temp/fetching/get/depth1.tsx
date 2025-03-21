"use client";

import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFakeData } from "@services/main";
import Depth2 from "./depth2";

type Depth1ListProps = {
  list: Depth1ListItemDataProps[]
}

type Depth1ListItemDataProps = {
  id: number;
  name: string;
  email: string;
}

const Depth1 = ({ list }: Depth1ListProps) => {
  const [userId, setUserId] = useState<number | undefined>();

  const {
    data: userInfoData,
    refetch: refetchUserInfoData,
  } = useQuery({
    queryKey: ["user-info-query", userId],
    queryFn: async () => await getFakeData(userId!),
    select: (response) => response.data,
    enabled: false,
  });

  // const handleUserId = (index: number) => {
  //   setUserId(index);
  // };

  const handleUserId = (event: ChangeEvent) => {
    const { value } = event.target as HTMLSelectElement;
    setUserId(value);
  };

  return (
    <section className="_flex-center w-screen h-screen">
      <Depth2 data={userInfoData} />

      <button
        type="button"
        className="fixed bottom-0 left-0 py-10 px-20 bg-koser-main-80 text-koser-grayscale-0"
        onClick={() => refetchUserInfoData()}
      >
        GET
      </button>

      <select
        onChange={handleUserId}
        className="fixed bottom-[150px] left-0 py-8 px-20 border-4 border-koser-main-80"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <div>
        <ul>
          {list?.map((listItem) => {
            const { id, name, email } = listItem;

            return (
              <li key={id}>
                <span>{name}</span>
                <span>{email}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Depth1;
