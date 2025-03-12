type ErrorMessageProps = {
  children: string;
};

/**
 * @name ErrorMessage
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 */
export default function ErrorMessage({ children }: ErrorMessageProps) {
  const textStyle = `_input-message is-error`;
  return <span className={textStyle}>{children}</span>;
}
