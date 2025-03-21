type Depth2DataProps = {
  data: Depth2DataDetailProps;
}

type Depth2DataDetailProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostDepth2 = ({ data }: Depth2DataProps) => {

  return (
    <>
      <span>{data?.title}</span>
      <span>{data?.body}</span>
    </>
  );
};

export default PostDepth2;
