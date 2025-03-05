// 날짜 콤마 함수
export default function formatDate(date: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(
    parseInt(date.slice(0, 4)),
    parseInt(date.slice(4, 6)) - 1,
    parseInt(date.slice(6, 8))
  );

  const formattedDate = `${parsedDate.getFullYear()}.${(
    parsedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${parsedDate.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}
