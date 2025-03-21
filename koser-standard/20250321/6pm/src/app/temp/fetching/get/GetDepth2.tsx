type Depth2DataProps = {
  data: Depth2DataDetailProps;
}

type Depth2DataDetailProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const GetDepth2 = ({ data }: Depth2DataProps) => {

  return (
    <>
      <span>{data?.title}</span>
    </>
  );
};

export default GetDepth2;
