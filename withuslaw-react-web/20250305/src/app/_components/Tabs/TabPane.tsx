import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  className: string;
};

export default function TabPane({ children, className }: TProps) {
  return <section className={className}>{children}</section>;
}
