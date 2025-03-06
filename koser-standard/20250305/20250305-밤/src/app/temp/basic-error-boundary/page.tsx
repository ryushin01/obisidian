import { CustomErrorBoundary } from "@components/error-boundary";

export default function BasicErrorBoundaryPage() {

  return (
    <CustomErrorBoundary element={<span>test</span>} />
  );
}
