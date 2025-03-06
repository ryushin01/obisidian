type Props = {
  bgColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  children: any;
};

export default function BorderBadge({
  size = "md",
  bgColor,
  textColor,
  children,
}: Props) {
  if (size === "sm") {
    const className = `font-semibold rounded-md flex items-center h-5 w-fit ${bgColor} px-1 py-0.5 text-xs ${textColor}`;
    return <div className={className}>{children}</div>;
  }
  return <div></div>;
}
