import { CustomErrorBoundary } from "@components/error-boundary";
import { getUsersData } from "@services/main";
import Detail from "./detail";

export default async function Page() {
  try {
    const data = await getUsersData();

    return (
      <CustomErrorBoundary
        element={<Detail list={data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}