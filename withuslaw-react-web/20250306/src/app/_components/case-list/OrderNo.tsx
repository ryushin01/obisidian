type TProps = {
  firstItem: string;
  secondItem?: string;
  className?: string;
};

export default function OrderNo({
  firstItem,
  secondItem,
  className,
}: TProps) {
  return (
    <div className={`flex items-center ${className} w-full`}>
      <p className="text-base text-body text-gray-600">{firstItem}</p>
      {/* <span className="mx-2" style={{ fontSize: "13px", color: "#E1E1E1" }}>
        |
      </span>
      <p className="text-base text-body text-gray-600">{secondItem}</p> */}
    </div>
  );
}