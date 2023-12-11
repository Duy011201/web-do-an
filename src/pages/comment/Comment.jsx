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

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";

import "./style.scss";
import {
  GET_ALL_COMMENT,
  DELETE_COMMENT_BY_ID,
  UPDATE_COMMENT_BY_ID,
  CREATE_COMMENT,
} from "../service.js";
import setting from "../../setting.js";

export default function Comment() {
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    productID: "",
    hoten: "",
    tenSanPham: "",
    noiDung: "",
    ngayTao: "",
    ngaySua: "",
    trangThai: "",
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
    { field: "hoten", headerName: "Người bình luận", width: 150 },
    { field: "tenSanPham", headerName: "Tên sản phẩm", width: 130 },
    { field: "noiDung", headerName: "Nội dung", width: 300 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 150 },
    { field: "ngaySua", headerName: "Ngày sửa", width: 150 },
    {
      field: "trangThai",
      headerName: "Trạng thái",
      width: 90,
      renderCell: params => (
        <div
          style={{
            color:
              params.value === setting.COMMENT_STATUS.PENDING
                ? "orange"
                : "green",
          }}
        >
          {params.value && params.value === setting.COMMENT_STATUS.PENDING
            ? setting.COMMENT_MSG.PENDING
            : setting.COMMENT_MSG.APPROVED}
        </div>
      ),
    },
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

  const updateComment = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenSanPham)) {
      error("Bạn chưa nhập tên sản phẩm bình luận!");
      return;
    }

    if (isEmptyNullUndefined(formData.noiDung)) {
      error("Bạn chưa nhập nội dung bình luận!");
      return;
    }

    if (isEmptyNullUndefined(formData.trangThai)) {
      error("Bạn chưa chọn trạng thái bình luận!");
      return;
    }

    setLoading(true);
    await UPDATE_COMMENT_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLComment();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createComment = async () => {
    setOpen(false);

    if (isEmptyNullUndefined(formData.tenSanPham)) {
      error("Bạn chưa nhập tên sản phẩm bình luận!");
      return;
    }

    if (isEmptyNullUndefined(formData.noiDung)) {
      error("Bạn chưa nhập nội dung bình luận!");
      return;
    }

    if (isEmptyNullUndefined(formData.trangThai)) {
      error("Bạn chưa chọn trạng thái bình luận!");
      return;
    }

    setLoading(true);
    await CREATE_COMMENT(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLComment();
      } else {
        error(res.data.msg);
      }
    });
  };

  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({});
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa bình luận này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_COMMENT_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLComment();
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

  const getALLComment = async () => {
    try {
      setLoading(true);
      let listComment;
      await GET_ALL_COMMENT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listComment = res.data.data.map(e => {
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
      setListComment(listComment);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getALLComment();
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
            <h2 className="fw-700 mt-20 pl-10 title-page">
              Quản lý đánh giá bình luận
            </h2>

            <div className="mt-20" style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={listComment}
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
            <DialogTitle>{`${
              action === setting.ACTION.ADD
                ? "Thêm"
                : action === setting.ACTION.UPDATE
                ? "Sửa"
                : "Xóa"
            } bình luận`}</DialogTitle>
            <DialogContent>
              <div className="form-group mt-10">
                <label htmlFor="inputEmail">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  name="tenSanPham"
                  value={formData.tenSanPham}
                  placeholder="Nhập tên sản phẩm"
                  onChange={handleInputChange}
                  // disabled
                  required
                />
              </div>
              <div className="form-group mt-10">
                <label htmlFor="inputPassword">Nội dung</label>
                <input
                  type="text"
                  name="noiDung"
                  value={formData.noiDung}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Nhập nội dung"
                  disabled
                  required
                />
              </div>
              <select
                className="form-select mt-15"
                aria-label="Default select example"
                value={formData.trangThai}
                onChange={handleInputChange}
                name="trangThai"
              >
                <option value="" disabled>
                  Chọn trạng thái
                </option>
                <option value={setting.COMMENT_STATUS.PENDING}>
                  {setting.COMMENT_MSG.PENDING}
                </option>
                <option value={setting.COMMENT_STATUS.APPROVED}>
                  {setting.COMMENT_MSG.APPROVED}
                </option>
              </select>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.ADD ? (
                <>
                  <Button onClick={() => createComment()}>Thêm mới</Button>
                </>
              ) : (
                <Button onClick={() => updateComment()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
