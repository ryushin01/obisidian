function getKoreaDate() {
  const now = new Date();
  const koreaTimeOffset = 9 * 60; // 한국은 UTC+9
  const localTimeOffset = now.getTimezoneOffset();
  const koreaTime = new Date(now.getTime() + (koreaTimeOffset + localTimeOffset) * 60000);

  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreaTime.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

function checkIsToday(date: string) {
  const today = getKoreaDate();
  const targetDate = date.replaceAll("-", ""); // Assuming the input date is in YYYY-MM-DD format

  return today === targetDate;
}

function getCompareWithToday(date: string | undefined): "past" | "same" | "future" | "" {
  if (date === undefined) return "";
  
  const today = getKoreaDate();
  const todayInt = parseInt(today);
  const dateInt = parseInt(date.replaceAll("-", "")); // Assuming the input date is in YYYY-MM-DD format

  if (dateInt < todayInt) return "past";
  if (dateInt === todayInt) return "same";
  if (dateInt > todayInt) return "future";
  return "";
}


function getDay(date: string | Date) {
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  let formatDate;
  if (typeof date === "string" && date.length === 8) {
    formatDate = new Date(stringToDate(date));
    return dayList[formatDate.getDay()];
  }
  formatDate = typeof date === "string" ? new Date(date) : date;

  return dayList[formatDate.getDay()];
}

/* input : 20231223('-'없는 string) */
function stringToDate(date: string) {
  const formateDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
    6,
    8
  )}`;
  return new Date(formateDate);
}

function formatStringToDate(date: string, sign: string) {
  return `${date.slice(0, 4)}${sign}${date.slice(4, 6)}${sign}${date.slice(
    6,
    8
  )}`;
}

export {
  checkIsToday,
  getDay,
  stringToDate,
  getCompareWithToday,
  formatStringToDate,
};
