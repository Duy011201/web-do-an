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

const setting = Object.freeze({
  roleLocal,
  listRole,
});

export default setting;
