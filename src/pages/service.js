import setting from "../setting.js";
import axios from "axios";

export const LOGIN = (user) => {
  return axios.post(setting.BASE_URL + setting.URL_API.LOGIN, user);
}

export const GET_ALL_PRODUCT = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_PRODUCT);
}

export const GET_ALL_COMMENT = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_COMMENT);
}
