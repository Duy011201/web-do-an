import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { error, success, confirmDialog } from "../../common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmptyNullUndefined } from "../../common/core";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import {
  GET_ALL_SUPPlIER,
  DELETE_SUPPlIER_BY_ID,
  UPDATE_SUPPlIER_BY_ID,
  CREATE_SUPPlIER,
} from "../service.js";
import setting from "../../setting.js";

export default function Supplier() {
  const [loading, setLoading] = useState(false);
  const [listSupplier, setListSupplier] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    ten: "",
    diaChi: "",
    email: "",
    sdt: "",
    ngayTao: "",
    ngaySua: "",
  });
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "ten", headerName: "Tên", width: 150 },
    { field: "diaChi", headerName: "Địa chỉ", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "sdt", headerName: "Số điện thoại", width: 120 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 150 },
    { field: "ngaySua", headerName: "Ngày sửa", width: 150 },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 200,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              handleDialog(setting.ACTION.OPEN, setting.ACTION.UPDATE, params)
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-pencil" />
            Sửa
          </button>
          <button
            type="button"
            className="ml-10 btn btn-danger"
            onClick={() =>
              handleDialog(setting.ACTION.CLOSE, setting.ACTION.DELETE, params)
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-trash" />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const updateSupplier = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.ten)) {
      error("Bạn chưa nhập tên nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.sdt)) {
      error("Bạn chưa nhập số điện thoại nhà cung cấp!");
      return;
    }

    setLoading(true);
    await UPDATE_SUPPlIER_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLSupplier();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createSupplier = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.ten)) {
      error("Bạn chưa nhập tên nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.diaChi)) {
      error("Bạn chưa nhập địa chỉ nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.email)) {
      error("Bạn chưa nhập email nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.sdt)) {
      error("Bạn chưa nhập số điện thoại nhà cung cấp!");
      return;
    }

    setLoading(true);
    await CREATE_SUPPlIER(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLSupplier();
      } else {
        error(res.data.msg);
      }
    });
  };

  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setFormData({
            id: "",
            ten: "",
            diaChi: "",
            email: "",
            sdt: "",
            ngayTao: "",
            ngaySua: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({});
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa nhà cung cấp này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_SUPPlIER_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLSupplier();
              } else {
                error(res.data.msg);
              }
            });
          }
        });
        break;
    }
    setAction(action);
    setOpen(status);
  };

  const getALLSupplier = async () => {
    try {
      setLoading(true);
      let listSupplier;
      await GET_ALL_SUPPlIER().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listSupplier = res.data.data.map(e => {
            return {
              ...e,
              ngayTao: e.ngayTao ? dayjs(e.ngayTao).format("DD/MM/YYYY") : "",
              ngaySua: e.ngaySua ? dayjs(e.ngaySua).format("DD/MM/YYYY") : "",
            };
          });
        } else {
          error(res.data.msg);
        }
      });
      setListSupplier(listSupplier);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getALLSupplier();
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="d-flex justify-content-between mt-20">
              <span className="fw-700 pl-10 title-page font-30">
                Quản lý nhà cung cấp
              </span>
              <button
                type="button"
                className="ml-10 btn btn-primary"
                onClick={() =>
                  handleDialog(setting.ACTION.OPEN, setting.ACTION.ADD, {})
                }
              >
                <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-plus" />
                Thêm mới
              </button>
            </div>

            <div className="mt-20" style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={listSupplier}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                disableColumnSelector
              />
            </div>
          </div>
          <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {`${
                action === setting.ACTION.ADD
                  ? "Thêm"
                  : action === setting.ACTION.UPDATE
                  ? "Sửa"
                  : "Xóa"
              } nhà cung cấp`}
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="inputTen">Tên nhà cung cấp</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ten"
                    value={formData.ten}
                    placeholder="Nhập tên nhà cung cấp"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="inputDiaChi">Địa chỉ</label>
                  <input
                    type="text"
                    name="diaChi"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="inputSoDienThoai">Số điện thoại</label>
                  <input
                    type="text"
                    name="sdt"
                    value={formData.sdt}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="inputEmail">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    placeholder="Nhập email"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.ADD ? (
                <>
                  <Button onClick={() => createSupplier()}>Thêm mới</Button>
                </>
              ) : (
                <Button onClick={() => updateSupplier()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
