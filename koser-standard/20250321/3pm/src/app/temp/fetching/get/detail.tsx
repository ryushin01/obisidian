"use client";

import { useQuery } from "@tanstack/react-query";
import { getFakeData } from "@services/main";

type ListDataProps = {
  list: ListItemDataProps[]
}

type ListItemDataProps = {
  id: number;
  name: string;
  email: string;
}

const Detail = ({ list }: ListDataProps) => {
  // const abcd = async (index: number) => {
  //   const response = await getFakeData(index);
  //   return response?.data;
  // };

  // const {
  //   data: userInfoData,
  //   refetch: refetchUserInfoData,
  // } = useQuery({
  //   queryKey: ["sample-query"],
  //   queryFn: (): Promise => abcd,
  //   enabled: false,
  // });

  // const {
  //   data: userInfoData,
  //   refetch: refetchUserInfoData,
  // } = useQuery({
  //   queryKey: ["sample-query", index],
  //   queryFn: async (index: number): Promise<TestProps> => {
  //     const response = await getFakeData(index);
  //     return response?.data;
  //   },
  //   enabled: false,
  // });

  const {
    data: userInfoData,
    refetch: refetchUserInfoData,
  } = useQuery({
    queryKey: ["sample-query"],
    queryFn: async () => await getFakeData(1),
    select: (response) => console.log(response),
    enabled: false,
  });

  console.log(userInfoData);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-0 left-0 py-10 px-20"
        // onClick={() => refetchUserInfoData}
        onClick={() => refetchUserInfoData()}
      >
        GET
      </button>

      <div>

      </div>

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
    </>
  );
};

export default Detail;
