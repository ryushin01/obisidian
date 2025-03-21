// 금융기관
export const FI = "financial";

// 관리자
export const AD = "admin";

// 법무대리인
export const LA = "lawyer";

export const HOME = "home";

export const NOTICE = "notice";

export const REQUEST_LIST = "request-list";

export const REQUEST = "request";

export const STATUS_INQUIRY = "status-inquiry";

export const ASSIGN = "assign";

export const REGISTRATION = "registration";

export const MEMBER = "member";

// 금융기관 > 홈
export const FI_HOME_PATH = `/${FI}/${HOME}`;

// 금융기관 > 공지사항
export const FI_NOTICE_PATH = `/${FI}/${HOME}/${NOTICE}`;

// 금융기관 > 의뢰목록
export const FI_REQUEST_LIST = `/${FI}/${REQUEST_LIST}`;

// 금융기관 > 전자등기 의뢰
export const FI_REQUEST = `/${FI}/${REQUEST_LIST}/${REQUEST}`;

// 금융기관 > 현황조회
export const FI_STATUS_INQUIRY = `/${FI}/${STATUS_INQUIRY}`;

// 괸리자 > 배정관리
export const AD_ASSIGN = `/${AD}/${ASSIGN}`;

// 괸리자 > 등기관리
export const AD_REGISTRATION = `/${AD}/${REGISTRATION}`;

// 괸리자 > 회원관리
export const AD_MEMBER = `/${AD}/${MEMBER}`;

// 괸리자 > 공지관리
export const AD_NOTICE = `/${AD}/${NOTICE}`;