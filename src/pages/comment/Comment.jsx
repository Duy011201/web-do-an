import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";

import "./style.scss";
import { GET_ALL_COMMENT } from "../service.js";
import setting from "../../setting.js";

export default function Comment() {
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [open, setOpen] = React.useState(false);
  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "hoten", headerName: "Người bình luận", width: 150 },
    { field: "tenSanPham", headerName: "Tên sản phẩm", width: 130 },
    { field: "noiDung", headerName: "Nội dung", width: 300 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 150 },
    {
      field: "titleTrangThai",
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
          {params.value}
        </div>
      ),
    },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 160,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <button type="button" className="btn btn-primary">
            Sửa
          </button>
          <button type="button" className="ml-10 btn btn-danger">
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GET_ALL_COMMENT()
          .then(response => response.data)
          .catch(error => {
            console.error("Error fetching all comments:", error);
            throw error;
          });

        const formattedComments = response.data.map(e => {
          return {
            ...e,
            ngayTao: e.ngayTao ? dayjs(e.ngayTao).format("DD/MM/YYYY") : "",
            codeTrangThai: e.trangThai,
            titleTrangThai:
              e.trangThai && e.trangThai === setting.COMMENT_STATUS.PENDING
                ? setting.COMMENT_MSG.PENDING
                : setting.COMMENT_MSG.APPROVED,
          };
        });
        setListComment(formattedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <h2 className="fw-700 mt-20 text-center">
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
          {/* {open ? () :

          } */}
          <Footer />
        </>
      )}
    </div>
  );
}
