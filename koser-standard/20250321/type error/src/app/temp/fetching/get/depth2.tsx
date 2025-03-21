type Depth2DataProps = {
  data: Depth2DataDetailProps;
}

type Depth2DataDetailProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Depth2 = ({ data }: Depth2DataProps) => {

  return (
    <>
      <span>{data?.title}</span>
    </>
  );
};

export default Depth2;
