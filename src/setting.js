const roleLocal = localStorage.getItem("role");

const listRole = [
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
  { key: "all", name: "Tất cả" },
  { key: "apple", name: "Apple" },
  { key: "samsung", name: "Samsung" },
  { key: "oppo", name: "Oppo" },
  { key: "xiaomi", name: "Xiaomi" },
  { key: "realme", name: "Realme" },
];

const LIST_FILTER_PRICE = [
  { key: "all", name: "Tất cả" },
  { key: "<2", name: "Dưới 2 triệu" },
  { key: "2-4", name: "Từ 2 - 4 triêu" },
  { key: "4-7", name: "Từ 4 - 7 triêu" },
  { key: ">7", name: "Trên 7 triêu" },
];

const BASE_URL = "http://localhost:8080/api";
const URL_API = {
  LOGIN: "/login",

  GET_ALL_COMMENT: "/comment/all",

  GET_ALL_PRODUCT: "/product/all",

};

const COMMENT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
};

const COMMENT_MSG = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
};

const setting = Object.freeze({
  roleLocal,
  listRole,
});

export default setting;
