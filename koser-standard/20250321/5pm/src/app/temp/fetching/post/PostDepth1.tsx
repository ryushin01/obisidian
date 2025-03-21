"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Loading } from "@components/common";
import { postFakeData } from "@services/main";
import { useMutation } from "@tanstack/react-query";
import PostDepth2 from "./PostDepth2";

export type Depth1DataProps = {
  title: string;
  body: string;
  userId: number;
}

type Depth1ListProps = {
  data: Depth1ListItemDataProps[]
}

type Depth1ListItemDataProps = {
  id: number;
  name: string;
  email: string;
}

const PostDepth1 = ({ data }: Depth1ListProps) => {
  const [form, setForm] = useState<Depth1DataProps>({
    title: "",
    body: "",
    userId: 1,
  });

  const {
    data: postData,
    mutate: mutatePostData,
    isPending: postDataLoading,
  } = useMutation({
    mutationKey: ["sample-mutation"],
    mutationFn: async () => await postFakeData(form),
    onSuccess: () => console.log("🟢"),
    onError: () => console.log("🔴"),
  });

  const typingMonitor = (e: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutatePostData();
  };

  return (
    <>
      {postDataLoading && <Loading />}

      <section className="_flex-center gap-10 w-screen h-screen">
        <div className="flex flex-col">
          <PostDepth2 data={postData?.data} />

          <form onSubmit={handleSubmit} onChange={typingMonitor} className="flex flex-col">
            <input type="text" name="title" className="p-5 border-4 border-koser-main-80" />
            <input type="text" name="body" className="p-5 border-4 border-koser-main-80" />
            <button type="submit" className="p-5 border-4 border-koser-main-80">전송</button>
          </form>
        </div>

        <div>
          <ul>
            {data?.map((item) => {
              const { id, name, email } = item;

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
    </>
  );
};

export default PostDepth1;
