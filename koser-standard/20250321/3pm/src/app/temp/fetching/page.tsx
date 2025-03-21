import { CustomErrorBoundary } from "@components/error-boundary";
import { getFakeData } from "@services/main";
import Detail from "./detail";

export default async function AsyncErrorBoundaryPage() {
  const response = await getFakeData(1);

  console.log(response?.data);

  try {
    return (
      <CustomErrorBoundary
        element={<Detail fakeDetailData={response?.data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}
