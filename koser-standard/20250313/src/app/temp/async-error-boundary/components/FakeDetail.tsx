type FakeDetailProps = {
  fakeDetailData: FakeDetailDataProps;
}

type FakeDetailDataProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const FakeDetail = ({ fakeDetailData }: FakeDetailProps) => {
  const {
    userId,
    id,
    // title,
    completed,
  }: FakeDetailDataProps = fakeDetailData;

  return (
    <>
      {!completed && (
        <div className="_flex-center flex-1 flex-col gap-5 text-center">
          <span>{userId}</span>
          <span>{id}</span>
          <span>{title}</span>
          {/*<span>{completed}</span>*/}
        </div>
      )}
    </>
  );
};

export default FakeDetail;
