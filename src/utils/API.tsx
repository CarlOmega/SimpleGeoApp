import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const URL =  "https://maps.googleapis.com/maps/api/place";

const API = axios.create({
  baseURL: URL,
  responseType: "json",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

API.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // Can add adition auth headers here
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
})

API.interceptors.response.use((response: AxiosResponse) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request.url);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  return Promise.reject(error);
});

export default API;

const NEARBY_SEARCH = '/nearbysearch/json';

export const NearbyAPI = {
  read: (params: any): Promise<AxiosResponse> => {
    return API.get(NEARBY_SEARCH, {params:{key: "AIzaSyAo3VRAcsLnTkYGnpZ7v5105CFsl-38RvY", type: "cafe", ...params}});
  }
}