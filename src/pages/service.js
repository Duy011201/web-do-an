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
    // {
    //   hoten: newData.username,
    //   email: newData.email,
    //   matKhau: newData.password,
    // }
  );
};
export const UPDATE_USER_BY_ID = updateData => {
  return axios.post(
    `${setting.BASE_URL + setting.URL_API.UPDATE_USER_BY_ID}`,
    {
      email: updateData.email,
      matKhau: updateData.password
    }
  );
};

export const CHECK_EMAIL = check => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.CHECK_EMAIL,
    check
  );
};

export const GET_ALL_USER = () => {
  return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_USER);
};

// Product
export const GET_ALL_PRODUCT = payload => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_PRODUCT,
    payload
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
