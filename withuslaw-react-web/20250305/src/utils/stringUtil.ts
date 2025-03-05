/* c 가 한글일 경우 true 반환 */
function _isHangul(code: number /* code number */) {
  return 0xac00 <= code && code <= 0xd7a3;
}
function isCompleteHangul(searchWords: string) {
  for (var i = 0; i < searchWords.length; i++) {
    if (!_isHangul(searchWords.charCodeAt(i))) return false;
  }
  return true;
}

function isOnlyNumber(searchWords: string) {
  if (typeof parseInt(searchWords) === "number") {
    return true;
  } else {
    return false;
  }
}

export { isCompleteHangul, isOnlyNumber};
