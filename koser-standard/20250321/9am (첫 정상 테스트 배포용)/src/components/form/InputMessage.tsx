import { Typography } from "@components/common";

type InputMessageProps = {
  children: string;
};

/**
 * @name InputMessage
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 */
export default function InputMessage({ children }: InputMessageProps) {
  const textStyle = `_input-message`;
  return (
    <Typography kind="caption-large" className={textStyle}>
      {children}
    </Typography>
  );
}
