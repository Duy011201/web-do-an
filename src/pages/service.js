import setting from "../setting.js";
import axios from "axios";

// Auth
export const LOGIN = user => {
  return axios.post(setting.BASE_URL + setting.URL_API.LOGIN, user);
};


export const REGISTER = newData => {
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
export const UPDATE_AUTH_BY_ID = updateData => {
  return axios.post(
    `${setting.BASE_URL + setting.URL_API.UPDATE_AUTH_BY_ID}`,
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
export const GET_PROFILE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_PROFILE_BY_ID}?id=${id}`
  );
};
export const UPDATE_PROFILE_BY_ID =updateData =>{
  return axios.post(
      `${setting.BASE_URL + setting.URL_API.UPDATE_PROFILE_BY_ID}`,
      updateData
  );
};
// export const CREATE_USER = newData => {
//   return axios.post(
//     `${setting.BASE_URL}${setting.URL_API.CREATE_USER}`,
//     newData
//   );
// };

// export const GET_ALL_USER = () => {
//   return axios.get(setting.BASE_URL + setting.URL_API.GET_ALL_USER);
// };

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

//User
export const GET_ALL_USER = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_USER);
}

export const CREATE_USER = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_USER}`,
    newData
  );
};

export const UPDATE_USER_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_USER_BY_ID,
    updateData
  );
};

export const DELETE_USER_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_USER_BY_ID}?id=${id}`
  );
};


// Roles
export const GET_ALL_ROLE = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_ROLE);
};

export const CREATE_ROLE = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_ROLE}`,
    newData
  );
};

export const UPDATE_ROLE_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_ROLE_BY_ID,
    updateData
  );
};

export const DELETE_ROLE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_ROLE_BY_ID}?id=${id}`
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

// Promotion
export const GET_ALL_PROMOTION = () => {
  return axios.post(setting.BASE_URL + setting.URL_API.GET_ALL_PROMOTION);
};

export const GET_PROMOTION_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_PROMOTION_BY_ID}?id=${id}`
  );
};

export const UPDATE_PROMOTION_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_PROMOTION_BY_ID,
    updateData
  );
};

export const CREATE_PROMOTION = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_PROMOTION}`,
    newData
  );
};

export const DELETE_PROMOTION_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_PROMOTION_BY_ID}?id=${id}`
  );
};

// INVOICE
export const GET_ALL_INVOICE = () => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_INVOICE
  );
};

export const GET_INVOICE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_INVOICE_BY_ID}?id=${id}`
  );
};

export const UPDATE_INVOICE_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_INVOICE_BY_ID,
    updateData
  );
};

export const CREATE_INVOICE = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_INVOICE}`,
    newData
  );
};

export const DELETE_INVOICE_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_INVOICE_BY_ID}?id=${id}`
  );
};

// INVOICE Details
export const GET_ALL_INVOICE_DETAIL = body => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.GET_ALL_INVOICE_DETAIL,
    body
  );
};

export const GET_INVOICE_DETAIL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.GET_INVOICE_DETAIL_BY_ID}?id=${id}`
  );
};

export const UPDATE_INVOICE_DETAIL_BY_ID = updateData => {
  return axios.post(
    setting.BASE_URL + setting.URL_API.UPDATE_INVOICE_DETAIL_BY_ID,
    updateData
  );
};

export const CREATE_INVOICE_DETAIL = newData => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.CREATE_INVOICE_DETAIL}`,
    newData
  );
};

export const DELETE_INVOICE_DETAIL_BY_ID = id => {
  return axios.post(
    `${setting.BASE_URL}${setting.URL_API.DELETE_INVOICE_DETAIL_BY_ID}?id=${id}`
  );
};

