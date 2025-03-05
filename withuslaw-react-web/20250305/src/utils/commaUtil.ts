// 금액 콤마 함수

export default function commaUtil(num: number | null | undefined) {
  if (num == null) {
    return "";
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
