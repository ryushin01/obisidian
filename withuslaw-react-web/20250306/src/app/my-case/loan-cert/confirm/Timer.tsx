import { Typography } from "@components";

export default function Timer({
  time,
  color,
}: {
  time: number;
  color?: string;
}) {
  const minute = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div>
      <Typography
        type={Typography.TypographyType.B4}
        color={color ?? "text-kos-blue-500"}
      >
        {minute}:{seconds}
      </Typography>
    </div>
  );
}
