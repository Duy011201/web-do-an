import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { error, success } from "/src/common/sweetalert2";
import { isEmptyNullUndefined } from "../../../common/core.js";

import Header from "../../../components/header/Header.jsx";
import Footer from "../../../components/footer/Footer.jsx";
import Loading from "../../../components/loading/Loading.jsx";

import "./style.scss";
import { GET_PROFILE_BY_ID, UPDATE_PROFILE_BY_ID } from "../../service.js";
import setting from "../../../setting.js";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    hoten: "",
    matKhau:"",
    email: "",
    sdt: "",
    role: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const update = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.hoten)) {
      error("Bạn chưa nhập tên!");
      return;
    }

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email");
      return;
    }
    if (isEmptyNullUndefined(formData.matKhau)) {
      error("Bạn chưa nhập mật khẩu!");
      return;
    }
    if (isEmptyNullUndefined(formData.sdt)) {
      error("Bạn chưa nhập số điện thọai");
      return;
    }

    setLoading(true);
    await UPDATE_PROFILE_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success("Thành Công");
        window.location = "http://localhost:5173/";
      } else {
        error("Thất bại");
      }
    });
  };

  const handleDialog = async (status, action) => {
    setAction(action);
    setOpen(status);
    if (status === setting.ACTION.CLOSE) {
      window.location = "http://localhost:5173/";
    }
  };

  async function getEmployeeByID() {
    try {
      setLoading(true);
      let id = JSON.parse(localStorage.getItem("user")).id;
      await GET_PROFILE_BY_ID(id).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          setFormData(res.data.data[0]);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
    handleDialog(setting.ACTION.OPEN, "");
    setTimeout(() => {
      getEmployeeByID();
    }, 300);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Sửa thông tin cá nhân</DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="hoten">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoten"
                    value={formData.hoten}
                    placeholder="Nhập họ tên"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Email"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="matKhau">Mật Khẩu</label>
                  <input
                    type="text"
                    name="matKhau"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Mật khẩu mới"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="sdt">Số Điện Thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sdt"
                    value={formData.sdt}
                    placeholder="Nhập số điện thoại"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div className="form-group mt-10 col-md-6">
                  <label htmlFor="role">Quyền</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Quyền"
                    disabled
                    required
                  />
                </div> */}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              <Button onClick={() => update()}>Lưu</Button>
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
