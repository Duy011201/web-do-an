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
  const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "hoten", headerName: "Người bình luận", width: 100 },
    { field: "tenSanPham", headerName: "Tên sản phẩm", width: 150 },
    { field: "noiDung", headerName: "Nội dung", width: 300 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 150 },
    { field: "trangThai", headerName: "Trạng thái", width: 90 },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: params =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

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
            ngayTao: e.ngayTao ? dayjs(e.ngayTao).format("DD/MM/YYYY") : null,
            trangThai:
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
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
