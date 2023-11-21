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
  GET_ALL_COMMENT: "/comment/all",

  GET_ALL_PRODUCT: "/product/all",
};

const setting = Object.freeze({
  ROLE_LOCAL,
  LIST_ROLE,
  LIST_FILTER_PRICE,
  LIST_FILTER_PRODUCER,
  BASE_URL,
  URL_API,
});

export default setting;
