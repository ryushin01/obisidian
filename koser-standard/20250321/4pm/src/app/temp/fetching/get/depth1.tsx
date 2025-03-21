"use client";

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
  // const {
  //   data: userInfoData,
  //   refetch: refetchUserInfoData,
  // } = useQuery({
  //   queryKey: ["user-info-query"],
  //   queryFn: async () => {
  //     const response = await getFakeData(1);
  //     return response?.data;
  //   },
  //   enabled: false,
  // });

  const {
    data: userInfoData,
    refetch: refetchUserInfoData,
  } = useQuery({
    queryKey: ["user-info-query"],
    queryFn: async () => await getFakeData(1),
    select: (response) => response.data,
    enabled: false,
  });

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
