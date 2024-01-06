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
  CREATE_CART,
  DELETE_CART_BY_ID,
  GET_ALL_CART,
  UPDATE_CART_BY_ID,
  GET_ALL_INVOICE,
  DELETE_INVOICE_BY_ID,
  UPDATE_INVOICE_BY_ID,
  CREATE_INVOICE,
  GET_ALL_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL_BY_ID,
  UPDATE_INVOICE_DETAIL_BY_ID,
  CREATE_INVOICE_DETAIL,
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
} from "../service.js";
import setting from "../../setting.js";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [listCart, setListCart] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [isConvert, setIsConvert] = useState(true);
  const [listInvoice, setListInvoice] = useState([]);
  const [listInvoiceDetail, setListInvoiceDetail] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    userID: "",
    productID: "",
    soLuong: "",
  });
  const [invoice, setInvoice] = useState({
    id: "",
    userID: "",
    diaChiGiaoHang: "",
    trangThai: "",
    phuongThucThanhToan: "",
    tongTien: "",
  });
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputInvoice = e => {
    const { name, value } = e.target;
    setInvoice(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "ten", headerName: "tên sản phẩm", width: 200 },
    {
      field: "anh",
      headerName: "Ảnh",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 100,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <img src={params.row.anh} width={30} height={30} alt="" />
        </div>
      ),
    },
    {
      field: "soLuong",
      headerName: "Số lượng",
      width: 100
    },
    {
      field: "",
      headerName: "Thao tác",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 350,
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
            className="ml-10 btn btn-primary"
            onClick={() =>
              handleDialog(setting.ACTION.OPEN, setting.ACTION.ADD, params)
            }
          >
            <FontAwesomeIcon
              className="icon-add mr-5"
              icon="fa-solid fa-cart-shopping"
            />
            Đặt hàng
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

  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setIsConvert(true);
          setFormData(data.row);
        } else {
          setFormData({});
        }
        break;
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          setIsConvert(false);
          setFormData(data.row);
          setInvoice({
            id: "",
            userID: "",
            diaChiGiaoHang: "",
            trangThai: "",
            phuongThucThanhToan: "",
            tongTien: 0,
          });
        } else {
          setInvoice({});
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa sản phẩm này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_CART_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getAllCart();
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

  const getAllCart = async () => {
    try {
      setLoading(true);
      let listCart;
      await GET_ALL_CART().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listCart = res.data.data.map(e => {
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
      setListCart(listCart);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getAllCart();
    }, 500);
  }, []);

  
  const updateCart = async () => {
    let payLoad = {
      id: formData.id,
      userID: JSON.parse(localStorage.getItem("user")).id,
      productID: formData.productID,
      soLuong: formData.soLuong,
    };
    setLoading(true);
    setOpen(false);
    await UPDATE_CART_BY_ID(payLoad).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getAllCart();
      } else {
        error(res.data.msg);
      }
    });
  };
  
  

  const createInvoice = async () => {
    console.log(invoice);
    
    // if (isEmptyNullUndefined(invoice.diaChiGiaoHang)) {
    //   error("Bạn chưa nhập địa chỉ giao hàng!");
    //   return;
    // }

    // if (isEmptyNullUndefined(invoice.phuongThucThanhToan)) {
    //   error("Bạn chưa nhập phương thức thanh toán!");
    //   return;
    // }
    setLoading(true);

    let payload = {
      userID: JSON.parse(localStorage.getItem("user")).id,
      diaChiGiaoHang: invoice.diaChiGiaoHang,
      trangThai: setting.STATUS_INVOICE.CXN.code,
      phuongThucThanhToan: invoice.phuongThucThanhToan,
      tongTien: 0,
      
    };
    await CREATE_INVOICE(payload).then(async res => {
      setLoading(false);
      setOpen(false);
      
      if (res.status === setting.STATUS_CODE.OK) {
       
        success(res.data.msg);
        // let payloadInvoid = {
        //   id: res.data.newDataId,
        //   invoiceDetail: listInvoice[indexInvoice].id,
        //   productID: parseInt(invoiceDetail.productID),
        //   soLuong: parseInt(invoiceDetail.soLuong),
        //   trangThai: setting.STATUS_INVOICE.CXN.code,
        //   tongTien: 0,
        // };
        

        // await DELETE_CART_BY_ID(formData.id).then(res => {});
        // console.log(res.data.newDataId);
        await GET_PRODUCT_BY_ID(formData.productID).then(async resProduct => {
          setLoading(false);
          if (resProduct.status === setting.STATUS_CODE.OK) {
            
            let data = resProduct.data.data[0];
            data.soLuong = parseInt(data.soLuong);
            formData.soLuong = parseInt(formData.soLuong);
            if (formData.soLuong <= data.soLuong) {
              data.soLuong = data.soLuong - formData.soLuong;
              data.soLuong = parseInt(data.soLuong);
              await UPDATE_PRODUCT_BY_ID(data).then(res => {
              });

              let payloadInvoidDetail = {
                invoiceID:res.data.newDataId,
                productID: formData.productID,
                soLuong: formData.soLuong,
                trangThai: setting.STATUS_INVOICE.CXN.code,
                tongTien: parseInt(formData.soLuong)*parseInt(formData.donGia)*(parseInt(formData.code)/100)
              };
              console.log(res.data.newDataId);
              await CREATE_INVOICE_DETAIL(payloadInvoidDetail).then(async res => {
                
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  await getAllProduct();
                  await getAllInvoiceDetail(listInvoice[indexInvoice].id);
                } else {
                  error(res.data.msg);
                }
              });
            } else {
              console.log(invoiceDetail.soLuong - oldQuantity <= data.soLuong);
              error("Số lượng sản phẩm trong kho không đủ");
              return;
            }
          }
        });
      }
    });
  };

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="d-flex justify-content-between mt-20">
              <span className="fw-700 pl-10 title-page font-30">giỏ hàng</span>
            </div>
            <div className="mt-20" style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={listCart}
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
                : action === setting.ACTION.DELETE
                ? "Xóa"
                : "Đặt hàng"
            } sản phẩm`}</DialogTitle>
            <DialogContent>
              {isConvert === true ? (
                <div className="row">
                  <div className="form-group mt-10 col-md-6">
                    <label htmlFor="ten">tên sản phẩm</label>
                    <input
                      type="text"
                      name="ten"
                      value={formData.ten}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="tên sản phẩm"
                      required
                    />
                  </div>
                  <div className="form-group mt-10 col-md-6">
                    <label htmlFor="soLuong">Số lượng</label>
                    <input
                      type="text"
                      name="soLuong"
                      value={formData.soLuong}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Nhập số lượng"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="form-group mt-10 col-md-6">
                    <label htmlFor="diaChiGiaoHang">Địa chỉ</label>
                    <input
                      type="text"
                      name="diaChiGiaoHang"
                      value={invoice.diaChiGiaoHang.toString()}
                      onChange={handleInputInvoice}
                      className="form-control"
                      placeholder="Địa chỉ"
                      required
                    />
                  </div>
                  <div div className="col-md-6 mt-10">
                    <label htmlFor="phuongThucThanhToan">
                      Phương thức thanh toán
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={invoice.phuongThucThanhToan.toString()}
                      onChange={handleInputInvoice}
                      name="phuongThucThanhToan"
                    >
                      <option value=" disabled">
                        Chọn phương thức thanh toán
                      </option>
                      {Object.values(setting.PTTT).map(pttt => (
                        <option key={pttt.code} value={pttt.code}>
                          {pttt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.UPDATE ? (
                  <Button onClick={() => updateCart()}>Cập nhật</Button>
              ) : (
                <Button onClick={() => createInvoice()}>Đặt hàng</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
