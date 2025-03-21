import { CustomErrorBoundary } from "@components/error-boundary";
import { getUsersData } from "@services/main";
import Depth1 from "./depth1";

export default async function Page() {
  try {
    const data = await getUsersData();

    return (
      <CustomErrorBoundary
        element={<Depth1 list={data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}