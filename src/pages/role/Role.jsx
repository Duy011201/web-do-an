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
    GET_ALL_USER,
    GET_ALL_ROLE,
    DELETE_ROLE_BY_ID,
    UPDATE_USER_BY_ID,
    UPDATE_ROLE_BY_ID,
    CREATE_ROLE
  } from "../service.js";

import setting from "../../setting.js";

export default function Role() {
    const [loading, setLoading] = useState(false);
    const [listRole, setListRole] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [action, setAction] = React.useState("");
    const [formData, setFormData] = useState({
    id: "",
    code: "",
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
    {field: "id", headerName: "ID", width: 20},
    {field: "code", headerName: "Quyền", width: 250},
    { field: "ngayTao", headerName: "Ngày tạo", width: 120 },
    { field: "ngaySua", headerName: "Ngày sửa", width: 120 },
    {
        field: "",
        headerName: "Thao tác",
        sortable: false,
        filterable: false,
        resizable: false,
        width: 200,
        renderCell: (params) => {
          const { code } = params.row;

          // Kiểm tra giá trị của trường "code" và ẩn nút khi giá trị phù hợp
          if (code === "admin" || code === "employee" || code === "user") {
            return null;
          }
          return (
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
          );
        },
      },
  ];

  const updateRole = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.code)) {
      error("Bạn chưa nhập quyền!");
      return;
    }

    setLoading(true);
    await UPDATE_ROLE_BY_ID(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLRole();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createRole = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.code)) {
      error("Bạn chưa nhập quyền!");
      return;
    }

    setLoading(true);
    await CREATE_ROLE(formData).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLRole();
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
            code:"",
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
        confirmDialog("Bạn muốn xóa quyền này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_ROLE_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLRole();
              } else {
                error(res.data.msg);
              }
            });
            const users = await GET_ALL_USER();
            if (users.status === setting.STATUS_CODE.OK) {
              const userList = users.data.data;
              const updatedUsers = userList.map((user) => {
                if (user.roleID.split(",").includes(data.id.toString())) {
                  const newRoleID = user.roleID
                        .split(",")
                        .filter((role) => role !== data.id.toString())
                        .map((role) => role.toString());

                      // Cập nhật roleID của người dùng
                      user.roleID = newRoleID;
                      delete user.roleCodes;
                }
                else {
                  const newRoleID = user.roleID.split(",");
                  user.roleID = newRoleID;
                  delete user.roleCodes;
                }
                return user;
              });
              //Cập nhật người dùng trên server
              const updatePromises = updatedUsers.map((user) => UPDATE_USER_BY_ID(user));

              // Chờ tất cả các promise được hoàn thành
              await Promise.all(updatePromises)
                .then((results) => {
                  // Xử lý kết quả trả về từ các phương thức cập nhật
                  results.forEach((res) => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                    } else {
                      error(res.data.msg);
                    }
                  });
                })
                .catch((error) => {
                  // Xử lý lỗi nếu có
                  console.error(error);
                });

              // Cập nhật danh sách người dùng và quyền
              setListUser(updatedUsers);
              console.log(updatedUsers); 
            }
          }
        });
        break;
    }
    setAction(action);
    setOpen(status);
  };

  const getALLRole = async () => {
    try {
      setLoading(true);
      let listRole;
      await GET_ALL_ROLE().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listRole = res.data.data.map(e => {
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
      setListRole(listRole);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getALLUser = async () => {
    try {
      setLoading(true);
      let listUser;
      await GET_ALL_USER().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listUser = res.data.data.map(e => {
            return {
              ...e
            };
          });
        } else {
          error(res.data.msg);
        }
      });
      setListUser(listUser);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => {
      getALLRole();
      getALLUser();
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
                            Quản lý quyền
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
                            rows={listRole}
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
                      } quyền`}
                    </DialogTitle>
                    <DialogContent>
                      <div className="row">
                        <div className="form-group mt-10 col-md-8">
                          <label htmlFor="inputCode">Quyền</label>
                          <input
                            type="text"
                            className="form-control"
                            name="code"
                            value={formData.code}
                            placeholder="Nhập quyền"
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
                          <Button onClick={() => createRole()}>Thêm mới</Button>
                        </>
                      ) : (
                        <Button onClick={() => updateRole()}>Lưu</Button>
                      )}
                    </DialogActions>
                </Dialog>
            </>
        )}
    </div>
  );
}