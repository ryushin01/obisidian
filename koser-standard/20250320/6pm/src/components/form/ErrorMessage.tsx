import { Typography } from "@components/common";

type ErrorMessageProps = {
  children: string;
};

/**
 * @name ErrorMessage
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 */
export default function ErrorMessage({ children }: ErrorMessageProps) {
  const textStyle = `_input-message _error`;
  return (
    <Typography kind="caption-large" className={textStyle}>
      {children}
    </Typography>
  );
}
