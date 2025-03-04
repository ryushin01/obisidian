import axios from "axios";
import { appURI } from "@constants/env";

/**
 * @name axiosBasicInstance
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description       Axios Instance의 기본형으로, 공통 또는 사용 빈도가 높은 config 옵션 값 적용
 * @baseURL           요청에 사용될 서버 URL 옵션
 * @withCredentials   요청 headers 안에 cookie 포함 가능 처리 옵션
 */
export const axiosBasicInstance = axios.create({
  baseURL: appURI,
  withCredentials: true,
});

// 요청 인터셉터
axiosBasicInstance.interceptors.request.use(
  function(config) {
    // 요청 전 작업: 토큰 주입 등
    return config;
  },
  function(error) {
    // 요청 오류 시 작업
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosBasicInstance.interceptors.response.use(
  function(response) {
    // 정상 응답(200대 Status Code) 시 작업
    return response;
  },
  function(error) {
    // 응답 오류 시 작업
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // Bad Request: 클라이언트가 올바르지 못한 요청을 보낸 경우
        case 400:
          console.log("Bad Request: 클라이언트가 올바르지 못한 요청을 보낸 경우");
          // 이행되지 않은 Promise 반환으로 Promise Chaining 단절
          return new Promise(() => {
          });
        // Unauthorized: 인증되지 않은 사용자가 접근한 경우
        case 401:
          console.log("Unauthorized: 인증되지 않은 사용자가 접근한 경우");
          return new Promise(() => {
          });
        // Forbidden: 클라이언트가 콘텐츠에 접근할 권한을 가지고 있지 않을 경우
        case 403:
          console.log("Forbidden: 클라이언트가 콘텐츠에 접근할 권한을 가지고 있지 않을 경우");
          return new Promise(() => {
          });
        // No Acceptable: HTTP headers의 content-type이 부적절한 경우
        case 406:
          console.log("No Acceptable: HTTP headers의 content-type이 부적절한 경우");
          return new Promise(() => {
          });
        // Request Timeout: 요청에 응답하는 시간이 오래 걸리는 경우
        case 408:
          console.log("Request Timeout: 요청에 응답하는 시간이 오래 걸리는 경우");
          return new Promise(() => {
          });
        // Too Many Requests: 사용자가 지정된 시간에 불필요하게 많은 요청을 보낸 경우
        case 429:
          console.log("Too Many Requests: 사용자가 지정된 시간에 불필요하게 많은 요청을 보낸 경우");
          return new Promise(() => {
          });
        // Internal Server Error: 서버 오류
        case 500:
          console.log("Internal Server Error: 서버 오류");
          return new Promise(() => {
          });
        default:
          return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);