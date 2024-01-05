import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Loading from "../../components/loading/Loading.jsx";

import { Link } from 'react-router-dom';
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
import { isEmptyNullUndefined } from "../../common/core.js";


import "./style.scss";
import {
    GET_ALL_ROLE,
    GET_ALL_USER,
    CREATE_USER,
    UPDATE_USER_BY_ID,
    DELETE_USER_BY_ID
} from '../service.js';
import setting from "../../setting.js";

export default function User() {
    
    const [loading, setLoading] = useState(false);
    const [listRole, setListRole] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [action, setAction] = React.useState("");
    const [formData, setFormData] = useState({
        id: "",
        hoten: "",
        email: "",
        sdt: "",
        roleID: [],
    });
    const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      
      if (checked) {
        const updatedRoleID = [...formData.roleID, value];
        setFormData({ ...formData, roleID: updatedRoleID });
        console.log(updatedRoleID);
      } else {

        const updatedRoleID = formData.roleID.filter((id) => id !== value);
        setFormData({ ...formData, roleID: updatedRoleID });
      }
    };
    const columns = [
      { field: "id", headerName: "id", width: 70 },
      { field: "hoten", headerName: "Tên", width: 150 },
      { field: "email", headerName: "Email", width: 180 },
      { field: "sdt", headerName: "Số điện thoại", width: 120 },
      { field: "roleID", headerName: "ID Quyền", width: 150 },
      { field: "roleCodes", headerName: "Quyền", width: 250 },
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

    
    const getALLUser = async () => {
      try {
        setLoading(true);
        let listUser;
        await GET_ALL_USER().then(res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            console.log(res);
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
    // const getrole = listUser.map(e => e.roleID.split(','));
    console.log(listUser);
    const getALLRole = async () => {
      try {
        setLoading(true);
        let listRole;
        await GET_ALL_ROLE().then(res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            console.log(res);
            listRole = res.data.data.map(e => {
              return {
                ...e
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
    const createUser = async () => {
      setOpen(false);
      if (isEmptyNullUndefined(formData.hoten)) {
        error("Bạn chưa nhập tên");
        return;
      }
      if (isEmptyNullUndefined(formData.email)) {
        error("Bạn chưa nhập email");
        return;
      }
      
      const duplicateEmail = listUser.some(user => user.email === formData.email);
      if (duplicateEmail) {
        error("Email đã tồn tại");
        return;
      }
      if (isEmptyNullUndefined(formData.sdt)) {
        error("Bạn chưa nhập số điện thoại");
        return;
      }
      if (!/^\d+$/.test(formData.sdt)) {
        error("Số điện thoại chỉ được chứa các kí tự số");
        return;
      }
      if (isEmptyNullUndefined(formData.roleID)) {
        error("Bạn chưa chọn quyền");
        return;
      }
      setLoading(true);
      await CREATE_USER(formData).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getALLUser();
        } else {
          error(res.data.msg);
        }
      });
    };

    const updateUser = async () => {
      setOpen(false);
      if (isEmptyNullUndefined(formData.hoten)) {
        error("Bạn chưa nhập tên");
        return;
      }
      if (isEmptyNullUndefined(formData.email)) {
        error("Bạn chưa nhập email");
        return;
      }
      if (isEmptyNullUndefined(formData.sdt)) {
        error("Bạn chưa nhập số điện thoại");
        return;
      }
      if (!/^\d+$/.test(formData.sdt)) {
        error("Số điện thoại chỉ được chứa các kí tự số");
        return;
      }
      if (isEmptyNullUndefined(formData.roleID)) {
        error("Bạn chưa chọn quyền");
        return;
      }
      setLoading(true);
      await UPDATE_USER_BY_ID(formData).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getALLUser();
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
              hoten: "",
              email: "",
              sdt: "",
              roleID: [],
            });
          }
          break;
        case setting.ACTION.UPDATE:
          if (status === setting.ACTION.OPEN) {
            setFormData(() => {
              return {
                ...data.row,
                roleID: data.row.roleID.split(","),
              };
              
            });
            console.log(data.row.roleID.split(','));
          } else {
            setFormData({});
          }
          break;
        case setting.ACTION.DELETE:
          confirmDialog("Bạn muốn xóa người dùng này!").then(async result => {
            if (result.value) {
              setLoading(true);
              await DELETE_USER_BY_ID(data.id).then(res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  success(res.data.msg);
                  getALLUser();
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


    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        getALLUser();
        getALLRole();
      }, 500);
    }, []);


    return(
      <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
        {loading ? (
          <Loading />
        ) : (
          <>
             <Header />
             <div className="container-sm">
              <div className="d-flex justify-content-between mt-20">
                <span className="fw-700 pl-10 title-page font-30">
                  Quản lý người dùng
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
                    rows={listUser}
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
              } người dùng`}
              </DialogTitle>
              <DialogContent>
                <div className="row">
                  <div div className="col-md-6 mt-10">
                    <label htmlFor="roleID">Quyền</label>
                    <div>
                      {listRole.map(e => (
                         <div key={e.id}>
                          <input
                            type="checkbox"
                            id={e.id}
                            value={e.id}
                            onChange={handleCheckboxChange}
                            checked={formData.roleID.some((role) => role === e.id.toString())}
                            >
                            
                            </input>
                            <label>{e.code}</label>
                         </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group mt-10 col-md-6">
                    <label htmlFor="hoten">Tên</label>
                    <input
                      type="text"
                      name="hoten"
                      value={formData.hoten}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Nhập tên"
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
                    <label htmlFor="sdt">Số điện thoại</label>
                    <input
                      type="text"
                      name="sdt"
                      value={formData.sdt}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Nhập Số điện thoại"
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
                    <Button onClick={() => createUser()}>Thêm mới</Button>
                  </>
                ) : (
                  <Button onClick={() => updateUser()}>Lưu</Button>
                )}
              </DialogActions>
            </Dialog>
            <Footer />
          </>
        )}
      </div>
    );
}
