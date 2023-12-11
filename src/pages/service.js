import setting from "../setting.js";
import axios from "axios";

// Auth
export const LOGIN = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.LOGIN, user);
};

// Product
export const GET_ALL_PRODUCT = payload => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_PRODUCT,
    payload
  );
};

export const GET_PRODUCT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_PRODUCT_BY_ID}?id=${id}`
  );
};

export const UPDATE_PRODUCT_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_PRODUCT_BY_ID,
    updateData
  );
};

export const CREATE_PRODUCT = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_PRODUCT}`,
    newData
  );
};

export const DELETE_PRODUCT_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_PRODUCT_BY_ID}?id=${id}`
  );
};

// Comment
export const GET_ALL_COMMENT = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_COMMENT);
};

export const GET_COMMENT_BY_ID = id => {
  return axios.post(
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

// Supplier
export const GET_ALL_SUPPlIER = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_SUPPlIER);
};

export const GET_SUPPlIER_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_SUPPlIER_BY_ID}?id=${id}`
  );
};

export const UPDATE_SUPPlIER_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_SUPPlIER_BY_ID,
    updateData
  );
};

export const CREATE_SUPPlIER = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_SUPPlIER}`,
    newData
  );
};

export const DELETE_SUPPlIER_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_SUPPlIER_BY_ID}?id=${id}`
  );
};

// Promtions
export const GET_ALL_PROMOTIONS = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_PROMOTIONS);
};