import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://tata-connect-lb-70240230.us-east-1.elb.amazonaws.com:8800/api/",
  withCredentials: true,
});
