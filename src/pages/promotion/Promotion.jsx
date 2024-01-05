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
// import isNumber from "../../common/core.js";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import "./style.scss";
import {
  GET_ALL_PROMOTION,
  DELETE_PROMOTION_BY_ID,
  UPDATE_PROMOTION_BY_ID,
  CREATE_PROMOTION,
} from "../service.js";
import setting from "../../setting.js";

export default function Promotion() {
  const [loading, setLoading] = useState(false);
  const [listPromotion, setListPromotion] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    // productID: 0,
    // tenSanPham: "",
    noiDung: "",
    code: 0,
    tuNgay: "",
    denNgay: "",
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
    { field: "id", headerName: "id", width: 50 },
    // { field: "productID", headerName: "Mã sản phẩm", width: 100 },
    // { field: "tenSanPham", headerName: "Tên sản phẩm", width: 150 },
    { field: "noiDung", headerName: "Nội dung khuyến mãi", width: 170 },
    { field: "code", headerName: "Giá trị khuyến mãi", width: 150 },
    { field: "tuNgay", headerName: "Ngày bắt đầu", width: 120 },
    { field: "denNgay", headerName: "Ngày kết thúc", width: 120 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 110 },
    { field: "ngaySua", headerName: "Ngày sửa", width: 110 },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 200,
      renderCell: params => (
        // <input
        //             type="number"
        //             name="code"
        //             id="code"
        //             defaultValue={params.row.code}
        //             onChange={handleInputChange}
        //             className="form-control"
        //             placeholder="Nhập Giá trị khuyến mãi"
        //             required
        //           />
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

  const updatePromotion = async () => {
    setOpen(false);
  
    if (isEmptyNullUndefined(formData.noiDung)) {
      error("Bạn chưa nhập nội dung khuyến mãi!");
      return;
    }

    if (isEmptyNullUndefined(formData.code)) {
      error("Bạn chưa nhập giá trị khuyến mãi!");
      return;
    }

    if (isEmptyNullUndefined(formData.tuNgay)) {
      error("Bạn chưa nhập ngày bắt đầu!");
      return;
    }
    if (isEmptyNullUndefined(formData.denNgay)) {
      error("Bạn chưa nhập ngày kết thúc!");
      return;
    }

    setLoading(true);
    await UPDATE_PROMOTION_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLPromotion();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createPromotion = async () => {
    setOpen(false);
  

    if (isEmptyNullUndefined(formData.noiDung)) {
      error("Bạn chưa nhập nội dung khuyến mãi!");
      return;
    }

    if (isEmptyNullUndefined(formData.code)) {
      error("Bạn chưa nhập giá trị khuyến mãi!");
      return;
    }

    if (isEmptyNullUndefined(formData.tuNgay)) {
      error("Bạn chưa nhập ngày bắt đầu!");
      return;
    }
    if (isEmptyNullUndefined(formData.denNgay)) {
      error("Bạn chưa nhập ngày kết thúc!");
      return;
    }

    setLoading(true);
    await CREATE_PROMOTION(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLPromotion();
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
            // productID: 0,
            // tenSanPham: "",
            noiDung: "",
            code: 0,
            tuNgay: "",
            denNgay: "",
            ngayTao: "",
            ngaySua: "",
          });
        }
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({
            id: "",
            // productID: 0,
            tenSanPham: "",
            noiDung: "",
            code: 0,
            tuNgay: "",
            denNgay: "",
            ngayTao: "",
            ngaySua: "",
          });
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa khuyến mãi này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_PROMOTION_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLPromotion();
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

  const getALLPromotion = async () => {
    try {
      setLoading(true);
      let listPromotion;
      await GET_ALL_PROMOTION().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listPromotion = res.data.data.map(e => {
            return {
              ...e,
              tuNgay: e.tuNgay ? dayjs(e.tuNgay).format("YYYY-MM-DD") : "",
              denNgay: e.denNgay ? dayjs(e.denNgay).format("YYYY-MM-DD") : "",
              ngayTao: e.ngayTao ? dayjs(e.ngayTao).format("YYYY-MM-DD") : "",
              ngaySua: e.ngaySua ? dayjs(e.ngaySua).format("YYYY-MM-DD") : "",
            };
          });

        } else {
          error(res.data.msg);
        }
      });
      setListPromotion(listPromotion);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getALLPromotion();
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
                Quản lý khuyến mãi
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
                rows={listPromotion}
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
              } khuyến mãi`}
            </DialogTitle>
            <DialogContent>
              {/* <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="productID">Mã sản phẩm</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productID"
                    id="productID"
                    value={formData.productID}
                    placeholder="Nhập mã sản phẩm"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                </div> */}
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="noiDung">Nội dung khuyến mãi</label>
                  <input
                    type="text"
                    name="noiDung"
                    id="noiDung"
                    value={formData.noiDung}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập nội dung khuyến mãi"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="code">Giá trị khuyến mãi (%)</label>
                  <input
                    type="number"
                    name="code"
                    id="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập Giá trị khuyến mãi"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="tuNgay">Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="tuNgay"
                    id="tuNgay"
                    value={formData.tuNgay}
                    onChange={handleInputChange}
                    className="form-control"
                    // placeholder="Nhập ngày bắt đầu"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="denNgay">Ngày kết thúc</label>
                  <input
                    type="date"
                    className="form-control"
                    name="denNgay"
                    id="denNgay"
                    value={formData.denNgay}
                    // placeholder="Nhập email"
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
                  <Button onClick={() => createPromotion()}>Thêm mới</Button>
                </>
              ) : (
                <Button onClick={() => updatePromotion()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
