// import { adminURI } from "@constants/env";
import { fakeURI } from "@constants/env";
import { axiosBasicInstance } from "@services";

// fake GET
export const getFakeData = (index: number) => axiosBasicInstance.get(`/todos/${index}`, { baseURL: fakeURI });

export const getFakeData2 = (id: number) => axiosBasicInstance.get(`/albums/${id}/photos`, { baseURL: fakeURI });

export const postFakeData1 = (title: string, body: string, userId: number) => axiosBasicInstance.post(`https://jsonplaceholder.typicode.com/posts`, {
  title,
  body,
  userId,
});

// GET
export const getAirlinesListData = () => axiosBasicInstance.get("/airlines");

// GET with param
export const getAirlineData = (id: string) => axiosBasicInstance.get(`/airlines/${id}`);
// export const getAirlineData = (id: string) => axiosBasicInstance.get(`/airlines/${id}`, { baseURL: adminURI });

// GET with multiple params
export const getPassengerListData = ({
                                       page = 1,
                                       size = 10,
                                     }: {
  page: number,
  size: number,
}) => axiosBasicInstance.get(`/passenger?page=${page}&size=${size}`);

// POST
export const postAirlineData = ({
                                  _id, name, country, logo, slogan, head_quarters, website, established,
                                }: {
  _id: string,
  name: string,
  country: string,
  logo: string,
  slogan: string,
  head_quarters: string,
  website: string,
  established: string,
}) => axiosBasicInstance.post("/airlines", {
  _id, name, country, logo, slogan, head_quarters, website, established,
});