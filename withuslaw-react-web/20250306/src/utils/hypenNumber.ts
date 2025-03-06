function hypenNumber(phone: string) {
  return phone?.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
function hypenTrregNumber(num: string) {
  return num?.replace(/^(\d{4})(\d{3})(\d+)$/, `$1-$2-$3`);
}
export { hypenNumber, hypenTrregNumber };
