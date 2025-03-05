import { CustomErrorBoundary } from "@components/error-boundary";
import { getFakeData } from "@services/main";
import FakeDetail from "./components/FakeDetail";

export default async function AsyncErrorBoundaryPage() {
  const response = await getFakeData();

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
