type FakeDetailProps = {
  fakeDetailData: FakeDetailDataProps;
}

type FakeDetailDataProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: fakeDetailRatingProps[];
}

type fakeDetailRatingProps = {
  rate: number;
  count: number;
}

const FakeDetail = ({ fakeDetailData }: FakeDetailProps) => {
  const { id, title, price, description, category, rating }: FakeDetailDataProps = fakeDetailData;
  console.log(rating);

  return (
    <div className="_flex-center flex-1 flex-col gap-5 text-center">
      <span>{id}</span>
      <span>{title}</span>
      <span>{price}</span>
      <span>{description}</span>
      <span>{category}</span>
      {/*<span>{rating}</span>*/}
    </div>
  );
};

export default FakeDetail;
