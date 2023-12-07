import setting from "../setting.js";
import axios from "axios";

// Auth
export const LOGIN = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.LOGIN, user);
};

export const CREATE_USER = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_USER}`,
    newData
  );
};

export const GET_ALL_USER = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_USER);
};

// Product
export const GET_ALL_PRODUCT = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_PRODUCT);
};

// Comment
export const GET_ALL_COMMENT = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_COMMENT);
};

export const GET_COMMENT_BY_ID = id => {
  return axios.get(
    `${setting.BASE_URL}${setting.URL_API.GET_COMMENT_BY_ID}?id=${id}`
  );
};

export const UPDATE_COMMENT_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_COMMENT_BY_ID,
    updateData
  );
};

export const CREATE_COMMENT = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.UPDATE_COMMENT_BY_ID}`,
    newData
  );
};

export const DELETE_COMMENT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_COMMENT_BY_ID}?id=${id}`
  );
};
