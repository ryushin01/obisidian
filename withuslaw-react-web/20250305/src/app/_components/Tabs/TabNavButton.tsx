"use client";

type Props = {
  title: string;
  id: string;
  count: number;
  activeId: string;
  onClick: (id: string) => void;
};

export default function TabNavButton({
  title,
  count,
  id,
  activeId,
  onClick,
}: Props) {
  return (
    <li className="basis-1/4">
      <button
        type="button"
        onClick={() => onClick(id)}
        className={`p-2.5 rounded-2xl w-full ${
          activeId === id && "bg-kos-white"
        }`}
      >
        <p className="text-left text-xs">{title}</p>
        <p className="text-right text-xs font-bold mt-2">{count}건</p>
      </button>
    </li>
  );
}
