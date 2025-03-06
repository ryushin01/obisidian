import { ReactNode } from "react";
import { Typography } from "@components";
import CurrencyFormat from "react-currency-format";

function PayGroupItem({
  label,
  payAmt,
  containerClassName,
  children,
  required,
}: {
  label: string;
  payAmt?: number;
  containerClassName?: string;
  children?: ReactNode;
  required?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3 ${containerClassName}`}>
      <div className="flex justify-between items-center">
        <Typography
          type={Typography.TypographyType.H5}
          color="text-kos-gray-800"
        >
          {label}
          {required && <span className="text-kos-red-500">*</span>}
        </Typography>
        {payAmt && (
          <Typography
            type={Typography.TypographyType.H2}
            color="text-kos-gray-800"
          >
            <CurrencyFormat
              decimalSeparator={"false"}
              value={payAmt}
              thousandSeparator={true}
              displayType="text"
            />
            원
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
}

export default PayGroupItem;
