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
  return <span className={textStyle}>{children}</span>;
}
