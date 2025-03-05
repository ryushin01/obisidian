type TProps = {
  firstItem: string;
  secondItem?: string;
  className?: string;
};

export default function NameWithLoanNo({
  firstItem,
  secondItem,
  className,
}: TProps) {
  return (
    <div className={`flex items-center ${className} w-full`}>
      <span className="text-base font-semibold relative pr-2 mr-2 after:content-[''] after:block after:w-[1px] after:h-[13px] after:absolute after:top-1/2 after:right-0 after:-translate-y-1/2 after:bg-kos-gray-300">
        {firstItem}
      </span>
      <span className="text-base text-body text-gray-600">{secondItem}</span>
    </div>
  );
}
