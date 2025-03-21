import { CustomErrorBoundary } from "@components/error-boundary";
import { getUsersData } from "@services/main";
import GetDepth1 from "./GetDepth1";

export default async function Page() {
  try {
    const data = await getUsersData();

    return (
      <CustomErrorBoundary
        element={<GetDepth1 data={data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}