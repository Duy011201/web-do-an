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

export default function Invoice() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConvert, setIsConvert] = useState(true);
  const [oldQuantity, setOldQuantity] = useState(0);
  const [listInvoice, setListInvoice] = useState([]);
  const [listInvoiceDetail, setListInvoiceDetail] = useState(
    []
  );
  const [listProduct, setListProduct] = useState([]);
  // const [listMaterial, setListMaterial] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  // const [isSPOrNVL, setIsSPOrNVL] = React.useState(true);
  const [invoice, setInvoice] = useState({
    id: "",
    userID: "",
    diaChiGiaoHang: "",
    trangThai: "",
    phuongThucThanhToan: "",
    tongTien:0,

  });
  const [invoiceDetail, setInvoiceDetail] = useState({
    id: "",
    invoiceID: 0,
    productID: "",
    productName:"",
    moTa:"",
    soLuong: 0,
    trangThai: "",
    tongTien: 0,
  });
  let [indexInvoice, setIndexInvoice] = useState(0);

  const changeInvoice = e => {
    const { name, value } = e.target;
    setInvoice(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeInvoiceDetail = e => {
    const { name, value } = e.target;
    setInvoiceDetail(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // let indexInvoice = 0;

  // const handleIsSPOrNVL = code => {
  //   code === setting.INVOICE_DETAIL_STATUS.PRODUCT.code
  //     ? setIsSPOrNVL(true)
  //     : setIsSPOrNVL(false);
  // };

  const columns = [
    { field: "invoiceID", headerName: "Mã đơn hàng", width: 95 },
    { field: "productID", headerName: "Mã sản phẩm", width: 95 },
    { field: "productName", headerName: "Tên sản phẩm", width: 120 },
    { field: "moTa", headerName: "Mô tả sản phẩm", width: 180 },

    { field: "soLuong", headerName: "Số lượng", width: 80 },
    { field: "trangThai", headerName: "Trạng thái", width: 120 },
    { field: "tongTien", headerName: "Tổng tiền", width: 80 },
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
              handleDialog(
                setting.ACTION.OPEN,
                setting.ACTION.UPDATE,
                params,
                false
              )
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-pencil" />
            Sửa
          </button>
          <button
            type="button"
            className="ml-10 btn btn-danger"
            onClick={() =>
              handleDialog(
                setting.ACTION.CLOSE,
                setting.ACTION.DELETE,
                params,
                false
              )
            }
          >
            <FontAwesomeIcon className="icon-add mr-5" icon="fas fa-trash" />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const update = async () => {
    if (isConvert) {
      setOpen(false);

      if (isEmptyNullUndefined(invoice.userID)) {
        error("Bạn chưa nhập mã người dùng!");
        return;
      }

      if (isEmptyNullUndefined(invoice.diaChiGiaoHang)) {
        error("Bạn chưa nhập địa chỉ giao hàng!");
        return;
      }
      if (isEmptyNullUndefined(invoice.trangThai)) {
        error("Bạn chưa nhập trạng thái!");
        return;
      }
      if (isEmptyNullUndefined(invoice.phuongThucThanhToan)) {
        error("Bạn chưa nhập phương thức thanh toán!");
        return;
      }
      setLoading(true);
      await UPDATE_INVOICE_BY_ID(invoice).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          // getAllMaterial();
          getAllProduct();
          getAllInvoice();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      setOpen(false);
      if (isEmptyNullUndefined(invoiceDetail.invoiceID)) {
        error("Bạn chưa nhập mã đơn hàng!");
        return;
      }
      if (isEmptyNullUndefined(invoiceDetail.productID)) {
        error("Bạn chưa chọn mã sản phẩm!");
        return;
      }
     
      if (isEmptyNullUndefined(invoiceDetail.soLuong)) {
        error("Bạn chưa nhập số lượng sản phẩm!");
        return;
      }

      setLoading(true);
      await GET_PRODUCT_BY_ID(invoiceDetail.productID).then(
        async res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            let data = res.data.data[0];
            data.soLuong = parseInt(data.soLuong);
            invoiceDetail.soLuong = parseInt(
              invoiceDetail.soLuong
            );
            if (
              (invoiceDetail.soLuong - oldQuantity) <=(data.soLuong)
            ) {
              console.log((invoiceDetail.soLuong - oldQuantity) <=(data.soLuong))
            let countResult = 0;
            countResult =
              data.soLuong -
              (invoiceDetail.soLuong-oldQuantity
              );
            data.soLuong = parseInt(countResult);
            await UPDATE_PRODUCT_BY_ID(data).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
              } else {
                error(res.data.msg);
              }
            });
            await UPDATE_INVOICE_DETAIL_BY_ID(invoiceDetail).then(
              async res => {
                setLoading(false);
                if (res.status === setting.STATUS_CODE.OK) {
                  await getAllProduct();
                  await getAllInvoice();
                } else {
                  error(res.data.msg);
                }
              }
            );
          } else {
            console.log((invoiceDetail.soLuong - oldQuantity) <=(data.soLuong))

            error(
              "Số lượng sản phẩm trong kho không đủ"
            );
            return;
          }
          }
        }
      );
    
      
    }
  };

  const create = async () => {
    if (isConvert) {
      setOpen(false);
      if (isEmptyNullUndefined(invoice.userID)) {
        error("Bạn chưa nhập mã người dùng!");
        return;
      }

      if (isEmptyNullUndefined(invoice.diaChiGiaoHang)) {
        error("Bạn chưa nhập địa chỉ giao hàng!");
        return;
      }
      if (isEmptyNullUndefined(invoice.trangThai)) {
        error("Bạn chưa nhập trạng thái!");
        return;
      }
      if (isEmptyNullUndefined(invoice.phuongThucThanhToan)) {
        error("Bạn chưa nhập phương thức thanh toán!");
        return;
      }      
      setLoading(true);

      let payload = {
        userID: invoice.userID,
        diaChiGiaoHang: invoice.diaChiGiaoHang,
        trangThai: invoice.trangThai,
        phuongThucThanhToan: invoice.phuongThucThanhToan,
        tongTien: invoice.tongTien,
      };

      await CREATE_INVOICE(payload).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          success(res.data.msg);
          getAllInvoice();
        } else {
          error(res.data.msg);
        }
      });
    } else {
      setOpen(false);
        if (isEmptyNullUndefined(invoiceDetail.productID)) {
          error("Bạn chưa chọn mã sản phẩm!");
          return;
        }
     
      if (isEmptyNullUndefined(invoiceDetail.soLuong)) {
        error("Bạn chưa nhập số lượng!");
        return;
      }
      // if (isEmptyNullUndefined(invoiceDetail.trangThai)) {
      //   error("Bạn chưa nhập số lượng!");
      //   return;
      // }
      setLoading(true);
      // setOpen(true);

      let payload = {
        id: "",
        invoiceDetail: listInvoice[indexInvoice].id,
        productID: parseInt(invoiceDetail.productID),
        soLuong: parseInt(invoiceDetail.soLuong),
        trangThai: "",
        tongTien: 0,
      };
      await GET_PRODUCT_BY_ID(invoiceDetail.productID).then(
        async res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            let data = res.data.data[0];
            data.soLuong = parseInt(data.soLuong);
            invoiceDetail.soLuong = parseInt(
              invoiceDetail.soLuong
            );
            if (
              (invoiceDetail.soLuong) <=(data.soLuong)
            ) {
                data.soLuong =
                  data.soLuong - invoiceDetail.soLuong;
                data.soLuong = parseInt(data.soLuong);
                await UPDATE_PRODUCT_BY_ID(data).then(res => {
                  setLoading(false);
                  if (res.status === setting.STATUS_CODE.OK) {
                    success(res.data.msg);
                  } else {
                    error(res.data.msg);
                  }
                });
                await CREATE_INVOICE_DETAIL(invoiceDetail).then(
                  async res => {
                    setLoading(false);
                    if (res.status === setting.STATUS_CODE.OK) {
                      
                        
                      await getAllProduct();
                      await getAllInvoiceDetail(
                        listInvoice[indexInvoice].id
                      );
                    } else {
                      error(res.data.msg);
                    }
                  }
                );
              } else {
                console.log((invoiceDetail.soLuong - oldQuantity) <=(data.soLuong))

                error(
                  "Số lượng sản phẩm trong kho không đủ"
                );
                return;
              }
          }
        }
      );
      
    }
  };

  const handleDialog = async (status, action, data, isConvert) => {
    switch (action) {
      case setting.ACTION.ADD:
        if (status === setting.ACTION.OPEN) {
          if (isConvert) {
            setInvoice({
              id: "",
              userID: "",
              diaChiGiaoHang: "",
              trangThai: "",
              phuongThucThanhToan: "",
              tongTien:0,
            });
            setIsConvert(true);
          } else {
            setInvoiceDetail({
              id: "",
              invoiceID: listInvoice[indexInvoice].id,
              productID: "",
              soLuong: 0,
              trangThai: "",
              tongTien: 0,
            });
            setIsConvert(false);
          }
        }
        break;
      case setting.ACTION.UPDATE:
        if (isConvert) {
          if (status === setting.ACTION.OPEN) {
            setInvoice(data);
            setIsConvert(true);
            // setOldQuantity(data.row.soLuong);
          } else {
            setInvoice({
              id: "",
              userID: "",
              diaChiGiaoHang: "",
              trangThai: "",
              phuongThucThanhToan: "",
              tongTien:0,
            });
          }
        } else {
          if (status === setting.ACTION.OPEN) {
            setInvoiceDetail(data.row);
            setIsConvert(false);
            setOldQuantity(data.row.soLuong);
          } else {
            setInvoiceDetail({
              id: "",
              invoiceID: listInvoice[indexInvoice].id,
              productID: "",
              soLuong: 0,
              trangThai: "",
              tongTien: 0,
            });
            setIsConvert(false);
          }
        }
        break;
      case setting.ACTION.DELETE:
        isConvert
          ? confirmDialog("Bạn muốn xóa hóa đơn này!").then(async result => {
              if (result.value) {
                setLoading(true);
                await getAllInvoiceDetail(
                  listInvoice[indexInvoice].id
                );
                for (let i = 0; i < listInvoiceDetail.length; i++) {
                  console.log(listInvoiceDetail[i]);
                  await GET_PRODUCT_BY_ID(listInvoiceDetail[i].productID).then(
                    async res => {
                    setLoading(false);
                    if (res.status === setting.STATUS_CODE.OK) {
                      let data = res.data.data[0];
                      data.soLuong = parseInt(data.soLuong);
                      listInvoiceDetail[i].soLuong = parseInt(
                        listInvoiceDetail[i].soLuong
                      );
                      console.log("soluong:",data.soLuong );

                      data.soLuong = data.soLuong + listInvoiceDetail[i].soLuong;
                      data.soLuong = parseInt(data.soLuong);
                      console.log("soluong:",data.soLuong );
                      await  UPDATE_PRODUCT_BY_ID(data).then(async res => {
                          setLoading(false);
                          if (res.status === setting.STATUS_CODE.OK) {
                          } else {
                            error(res.data.msg);
                          }
                        });
                      await DELETE_INVOICE_DETAIL_BY_ID(listInvoiceDetail[i].id).then(
                        async res => {
                        // if (res.status === setting.STATUS_CODE.OK) {
                         
                        // }
                      });
                    }
                  });
                  
                }

                // setTimeout(() => {
                  await DELETE_INVOICE_BY_ID(data.id).then(async res => {
                    if (res.status === setting.STATUS_CODE.OK) {
                      success(res.data.msg);
                      await getAllProduct();
                      await getAllInvoice();
                      indexInvoice=0;
                      await getAllInvoiceDetail(
                        listInvoice[indexInvoice].id
                      );
                    } else {
                      error(res.data.msg);
                    }
                  });
                // }, 500);
              }
            })
          : confirmDialog("Bạn muốn xóa chi tiết hóa đơn này!").then(
              async result => {
                if (result.value) {
                  setLoading(true);
                  await DELETE_INVOICE_DETAIL_BY_ID(data.id).then(
                    async res => {
                      if (res.status === setting.STATUS_CODE.OK) {
                        
                          await GET_PRODUCT_BY_ID(
                            invoiceDetail.productID
                          ).then(async res => {
                            setLoading(false);
                            if (res.status === setting.STATUS_CODE.OK) {
                              let data = res.data.data[0];
                              data.soLuong = parseInt(data.soLuong);
                              invoiceDetail.soLuong = parseInt(
                                invoiceDetail.soLuong
                              );
                             
                              data.soLuong = parseInt(data.soLuong+invoiceDetail.soLuong);
                              await UPDATE_PRODUCT_BY_ID(data).then(res => {
                                setLoading(false);
                                if (res.status === setting.STATUS_CODE.OK) {
                                  success(res.data.msg);
                                } else {
                                  error(res.data.msg);
                                }
                              });
                            }
                          });
                        // }

                        // await getAllMaterial();
                        await getAllProduct();
                        await getAllInvoice();
                        await getAllInvoiceDetail(
                          listInvoice[indexInvoice].id
                        );
                      } else {
                        error(res.data.msg);
                      }
                    }
                  );
                }
              }
            );
        break;
    }
    setAction(action);
    setOpen(status);
  };

  const getAllInvoice = async () => {
    try {
      setLoading(true);
      let listInvoice;
      await GET_ALL_INVOICE().then(async res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listInvoice = res.data.data;
          setListInvoice(listInvoice);
          // console.log(listInvoice);
          indexInvoice = 0;
          getAllInvoiceDetail(listInvoice[0].id);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllInvoiceDetail = async id => {
    try {
      setLoading(true);
      let listInvoiceDetail;
      await GET_ALL_INVOICE_DETAIL({ invoiceID: id }).then(
        res => {
          setLoading(false);
          if (res.status === setting.STATUS_CODE.OK) {
            listInvoiceDetail = res.data.data;
            setListInvoiceDetail(listInvoiceDetail);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      let listProduct;
      await GET_ALL_PRODUCT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listProduct = res.data.data;
          setListProduct(listProduct);
          console.log(listProduct);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // const getAllMaterial = async () => {
  //   try {
  //     setLoading(true);
  //     let listMaterial;
  //     await GET_ALL_MATERIAL().then(res => {
  //       setLoading(false);
  //       if (res.status === setting.STATUS_CODE.OK) {
  //         listMaterial = res.data.data;
  //         setListMaterial(listMaterial);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUser(setting.USER_LOCAL);
      getAllProduct();
      // getAllMaterial();
      getAllInvoice();
    }, 500);
  }, []);

  const updateIndexInvoice = async index => {
    setIndexInvoice(index);
    // console.log(listInvoice[index].id);
    if (listInvoice.length > 0) {
      setInvoiceDetail({
        id: "",
        invoiceID: 0,
        productID: "",
        soLuong: 0,
        trangThai: "",
        tongTien: 0,
      });
      await getAllInvoiceDetail(listInvoice[index].id);
    }
  };

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="row">
              <div
                className="col-md-3"
                style={{
                  borderRight: "1px solid #E0E0E0",
                  borderLeft: "1px solid #E0E0E0",
                }}
              >
                <div className="d-flex align-items-center pt-10 pb-10">
                  <span className="fw-700 font-20">Hóa đơn</span>
                  <FontAwesomeIcon
                    className="icon-add ml-5 add-warehouse-receipt font-20"
                    icon="fas fa-plus"
                    onClick={() =>
                      handleDialog(
                        setting.ACTION.OPEN,
                        setting.ACTION.ADD,
                        {},
                        true
                      )
                    }
                  />
                </div>
                <div className="wrap-catalog">
                  {listInvoice.map((item, i) => (
                    <div
                      key={i}
                      className={`clb bdbt1px${
                        (i + 1) % 2 === 0 ? " odd" : ""
                      }`}
                      onClick={() => updateIndexInvoice(i)}
                    >
                      <div
                        className={`catalog-item pdl10 clb font14 pdr5 ${
                          i === indexInvoice ? " active" : ""
                        }`}
                      >
                        <div className="catalog-item-left d-flex align-items-center">
                          <FontAwesomeIcon
                            className="icon-add mr-5"
                            icon="fas fa-pencil"
                            onClick={() =>
                              handleDialog(
                                setting.ACTION.OPEN,
                                setting.ACTION.UPDATE,
                                item,
                                true
                              )
                            }
                          />
                          <FontAwesomeIcon
                            className="icon-add mr-5"
                            icon="fas fa-trash"
                            onClick={() =>
                              handleDialog(
                                setting.ACTION.CLOSE,
                                setting.ACTION.DELETE,
                                item,
                                true
                              )
                            }
                          />
                        </div>
                        {/* Hiển thị loại hàng lên giao diện trái */}
                         <div className="catalog-item-right">
                          <p title={item.id}>Mã đơn hàng: {item.id}</p>
                          {/* <p className="customer-name" title={item.id}>
                            {item.id}
                          </p> */}
                          <p title={item.userID}>Mã người dùng: {item.userID}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-9">
                <div className="d-flex  align-items-center pt-10 pb-10">
                  <span className="fw-700 font-20">Chi tiết hóa đơn</span>
                  <FontAwesomeIcon
                    className="icon-add ml-5 add-warehouse-receipt font-20"
                    icon="fas fa-plus"
                    onClick={() =>
                      handleDialog(
                        setting.ACTION.OPEN,
                        setting.ACTION.ADD,
                        {},
                        false
                      )
                    }
                  />
                </div>
                <div className="mt-10" style={{ height: 550, width: "100%" }}>
                  <DataGrid
                    rows={listInvoiceDetail}
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
              } ${isConvert ? "hóa đơn" : "chi tiết hóa đơn"}`}
            </DialogTitle>
            <DialogContent>
              {isConvert ? (
                <>
                <div className="row">
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="userID">Người dùng</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userID"
                        value={invoice.userID}
                        placeholder="Nhập mã người dùng"
                        onChange={changeInvoice}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="diaChiGiaoHang">Địa chỉ giao hàng</label>
                      <input
                        type="text"
                        name="diaChiGiaoHang"
                        value={invoice.diaChiGiaoHang}
                        onChange={changeInvoice}
                        className="form-control"
                        placeholder="Nhập địa chỉ giao hàng"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="trangThai">Trạng thái</label>
                      <input
                        type="text"
                        className="form-control"
                        name="trangThai"
                        value={invoice.trangThai}
                        placeholder="Nhập tên trạng thái"
                        onChange={changeInvoice}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="phuongThucThanhToan">Phương thức thanh toán</label>
                      <input
                        type="text"
                        name="phuongThucThanhToan"
                        value={invoice.phuongThucThanhToan}
                        onChange={changeInvoice}
                        className="form-control"
                        placeholder="Nhập phương thức thanh toán"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    
                      <div className="col-md-6 mt-10">
                        <label htmlFor="productID">Sản phẩm</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={invoice.productID}
                          onChange={changeInvoiceDetail}
                          name="productID"
                        >
                          <option value="">Chọn sản phẩm</option>
                          
                          {listProduct.map(product => (
                           
                            <option
                              key={product.id}
                              name={product.id}
                              value={product.id}
                            >
                              {product.ten}
                            </option>
                          ))}
                        </select>
                      </div>
                    
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="soLuong">Số lượng</label>
                      <input
                        type="number"
                        className="form-control"
                        name="soLuong"
                        value={invoiceDetail.soLuong}
                        placeholder="Nhập số lượng"
                        onChange={changeInvoiceDetail}
                        required
                      />
                    </div>
                    <div className="form-group mt-10 col-md-6">
                      <label htmlFor="trangThai">Trạng thái</label>
                      <input
                        type="text"
                        name="trangThai"
                        value={invoiceDetail.trangThai}
                        onChange={changeInvoiceDetail}
                        className="form-control"
                        placeholder="Nhập ghi chú"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDialog(setting.ACTION.CLOSE, "", {})}
              >
                Hủy
              </Button>
              {action === setting.ACTION.ADD ? (
                <Button onClick={() => create()}>Thêm mới</Button>
              ) : (
                <Button onClick={() => update()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}