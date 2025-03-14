import { CustomErrorBoundary } from "@components/error-boundary";
import { getFakeData1 } from "@services/main";
import FakeDetail from "./components/FakeDetail";

export default async function AsyncErrorBoundaryPage() {
  const response = await getFakeData1(1);

  console.log(response?.data);

  try {
    return (
      <CustomErrorBoundary
        element={<FakeDetail fakeDetailData={response?.data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}
