import { CustomErrorBoundary } from "@components/error-boundary";
import { getUsersData } from "@services/main";
import PostDepth1 from "./PostDepth1";

export default async function Page() {
  try {
    const data = await getUsersData();

    return (
      <CustomErrorBoundary
        element={<PostDepth1 data={data} />}
      />
    );
  } catch (error) {
    console.log(error);
  }
}