import { Error } from "@components/error-boundary";
import { FallbackProps } from "react-error-boundary";

/**
 * @name Fallback
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
const Fallback = ({ error }: FallbackProps) => {
  const status = error.response?.status || "500";
  console.log(status);

  return (
    <Error />
  );
};

export default Fallback;
