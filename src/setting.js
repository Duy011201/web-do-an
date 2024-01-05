const ROLE_LOCAL = localStorage.getItem("role");

const LIST_ROLE = [
  {
    role: "",
    desc: "Người dùng chỉ xem",
  },
  {
    role: "user",
    desc: "Người dùng hệ thống",
  },
  {
    role: "employee",
    desc: "Nhân viên hệ thống",
  },
  {
    role: "admin",
    desc: "Quản lý hệ thống",
  },
];

const LIST_FILTER_PRODUCER = [
  { key: "apple", name: "Apple", isChecked: false },
  { key: "samsung", name: "Samsung", isChecked: false },
  { key: "oppo", name: "Oppo", isChecked: false },
  { key: "xiaomi", name: "Xiaomi", isChecked: false },
  { key: "realme", name: "Realme", isChecked: false },
];

const LIST_FILTER_PRICE = [
  { key: "<2", name: "Dưới 2 triệu", isChecked: false },
  { key: "2-4", name: "Từ 2 - 4 triêu", isChecked: false },
  { key: "4-7", name: "Từ 4 - 7 triêu", isChecked: false },
  { key: ">7", name: "Trên 7 triêu", isChecked: false },
];

const BASE_URL = "http://localhost:8080/api";
const URL_API = {
  LOGIN: "/login",
  GET_ALL_USER: "/login/all",
  GET_USER_BY_ID: "/login/user",
  UPDATE_AUTH_BY_ID: "/forgot/update",
  CREATE_REGISTER:"/login/create",
  CHECK_EMAIL:"/forgot/checkemail",
  GET_PROFILE_BY_ID:"/profile",
  UPDATE_PROFILE_BY_ID:"/profile/update",

  // Comments
  GET_COMMENT_BY_ID: "/comment",
  GET_ALL_COMMENT: "/comment/all",
  DELETE_COMMENT_BY_ID: "/comment/delete",
  UPDATE_COMMENT_BY_ID: "/comment/update",

  //User
  GET_ALL_USER: "/user/all",
  CREATE_USER: "/user/create",
  DELETE_USER_BY_ID: "/user/delete",
  UPDATE_USER_BY_ID: "/user/update",

  //Roles
  GET_ROLE_BY_ID: "/role",
  GET_ALL_ROLE: "/role/all",
  CREATE_ROLE: "/role/create",
  DELETE_ROLE_BY_ID: "/role/delete",
  UPDATE_ROLE_BY_ID: "/role/update",

  //Supplier
  GET_SUPPlIER_BY_ID: "/supplier",
  GET_ALL_SUPPlIER: "/supplier/all",
  CREATE_SUPPlIER: "/supplier/create",
  DELETE_SUPPlIER_BY_ID: "/supplier/delete",
  UPDATE_SUPPlIER_BY_ID: "/supplier/update",

  GET_ALL_PRODUCT: "/product/all",
  GET_PRODUCT_BY_ID: "/product",
  CREATE_PRODUCT: "/product/create",
  DELETE_PRODUCT_BY_ID: "/product/delete",
  UPDATE_PRODUCT_BY_ID: "/product/update",

  GET_PROMOTION_BY_ID: "/promotion",
  GET_ALL_PROMOTION: "/promotion/all",
  CREATE_PROMOTION: "/promotion/create",
  DELETE_PROMOTION_BY_ID: "/promotion/delete",
  UPDATE_PROMOTION_BY_ID: "/promotion/update",

  GET_ALL_INVOICE: "/invoice/all",
  GET_INVOICE_BY_ID: "/invoice",
  CREATE_INVOICE: "/invoice/create",
  DELETE_INVOICE_BY_ID: "/invoice/delete",
  UPDATE_INVOICE_BY_ID: "/invoice/update",

  GET_ALL_INVOICE_DETAIL: "/invoice-detail/all",
  GET_INVOICE_DETAIL_BY_ID: "/invoice-detail",
  CREATE_INVOICE_DETAIL: "/invoice-detail/create",
  DELETE_INVOICE_DETAIL_BY_ID: "/invoice-detail/delete",
  UPDATE_INVOICE_DETAIL_BY_ID: "/invoice-detail/update",
};

const COMMENT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
};

const COMMENT_MSG = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
};

const ACTION = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
  OPEN: true,
  CLOSE: false,
};

const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const setting = Object.freeze({
  ROLE_LOCAL,
  LIST_ROLE,
  LIST_FILTER_PRICE,
  LIST_FILTER_PRODUCER,
  BASE_URL,
  URL_API,
  COMMENT_STATUS,
  COMMENT_MSG,
  ACTION,
  STATUS_CODE,
});

export default setting;
