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
  GET_ALL_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  GET_ALL_PROMOTION,
  GET_ALL_SUPPlIER,
} from "../service.js";
import setting from "../../setting.js";
import { data } from "jquery";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [listcode, setListcode] = useState([]);
  const [listSupplier, setListSupplier] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [formData, setFormData] = useState({
    id: "",
    promotionID: "",
    code: "",
    supplierID: "",
    ten: "",
    moTa: "",
    heDieuHanh: "",
    anh: "",
    donGia: "",
    soLuong:"",
    baoHanh: "",
    mauSac: "",
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
    { field: "id", headerName: "ID", width: 20 },
    { field: "promotionID", headerName: "ID giảm giá", width: 20 },
    { field: "code", headerName: "Mã giảm giá", width: 100 },
    { field: "supplierID", headerName: "Mã nhà cup cấp", width: 20 },
    { field: "tenNhaCungCap", headerName: "Tên nhà cung cấp", width: 120 },
    { field: "ten", headerName: "Tên sản phẩm", width: 170 },
    { field: "moTa", headerName: "Mô tả", width: 130 },
    { field: "heDieuHanh", headerName: "Hệ điều hành", width: 50 },
    { field: "donGia", headerName: "Đơn giá", width: 50 },
    { field: "soLuong", headerName: "Số lượng", width: 50 },
    { field: "baoHanh", headerName: "Bảo hành", width: 50 },
    { field: "mauSac", headerName: "Màu sắc", width: 50 },
    { field: "ngayTao", headerName: "Ngày tạo", width: 120 },
    { field: "ngaySua", headerName: "Ngày sửa", width: 120 },
    
    {
      field: "anh",
      headerName: "Ảnh",
      sortable: false,
      filterable: false,
      resizable: false,
      width: 200,
      renderCell: params => (
        <div className="d-flex justify-content-center w-100">
          <img src={params.row.anh} width={30} height={30} alt="" />
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

  const updateProduct = async () => {
    setOpen(false);

    console.log(formData);

    if (isEmptyNullUndefined(formData.promotionID)) {
      error("Bạn chưa chọn mã giảm giá!");
      return;
    }

    if (isEmptyNullUndefined(formData.supplierID)) {
      error("Bạn chưa chọn tên nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.ten)) {
      error("Bạn chưa nhập tên sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.moTa)) {
      error("Bạn chưa nhập mô tả sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.heDieuHanh)) {
      error("Bạn chưa nhập hệ điều hành!");
      return;
    }
    
    if (isEmptyNullUndefined(formData.donGia)) {
      error("Bạn chưa nhập đơn giá của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.soLuong)) {
      error("Bạn chưa nhập số lượng của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.baoHanh)) {
      error("Bạn chưa nhập bảo hành của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.mauSac)) {
      error("Bạn chưa nhập màu sắc của sản phẩm!");
      return;
    }

    let payLoad={
      promotionID: formData.promotionID,
      supplierID: formData.supplierID,
      ten: formData.ten,
      moTa: formData.moTa,
      heDieuHanh: formData.heDieuHanh,
      anh: formData.anh,
      donGia: formData.donGia,
      soLuong: formData.soLuong,
      baoHanh: formData.baoHanh,
      mauSac: formData.mauSac,
      id: formData.id,
      };

    setLoading(true);
    await UPDATE_PRODUCT_BY_ID(payLoad).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLProduct();
      } else {
        error(res.data.msg);
      }
    });
  };

  const createProduct = async () => {
    setOpen(false);
    if (isEmptyNullUndefined(formData.promotionID)) {
      error("Bạn chưa chọn mã giảm giá!");
      return;
    }

    if (isEmptyNullUndefined(formData.supplierID)) {
      error("Bạn chưa chọn tên nhà cung cấp!");
      return;
    }

    if (isEmptyNullUndefined(formData.ten)) {
      error("Bạn chưa nhập tên sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.moTa)) {
      error("Bạn chưa nhập mô tả sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.heDieuHanh)) {
      error("Bạn chưa nhập hệ điều hành!");
      return;
    }
    
    if (isEmptyNullUndefined(formData.donGia)) {
      error("Bạn chưa nhập đơn giá của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.soLuong)) {
      error("Bạn chưa nhập số lượng của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.baoHanh)) {
      error("Bạn chưa nhập bảo hành của sản phẩm!");
      return;
    }

    if (isEmptyNullUndefined(formData.mauSac)) {
      error("Bạn chưa nhập màu sắc của sản phẩm!");
      return;
    }

    let payLoad={
      promotionID: formData.promotionID,
      supplierID: formData.supplierID,
      ten: formData.ten,
      moTa: formData.moTa,
      heDieuHanh: formData.heDieuHanh,
      anh: formData.anh,
      donGia: formData.donGia,
      soLuong: formData.soLuong,
      baoHanh: formData.baoHanh,
      mauSac: formData.mauSac,
      };

    setLoading(true);
    await CREATE_PRODUCT(payLoad).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
        getALLProduct();
      } else {
        error(res.data.msg);
      }
    });
  };

  const handleDialog = async (status, action, data) => {
    switch (action) {
      case setting.ACTION.ADD:
        setFormData({});
        break;
      case setting.ACTION.UPDATE:
        if (status === setting.ACTION.OPEN) {
          setFormData(data.row);
        } else {
          setFormData({});
        }
        break;
      case setting.ACTION.DELETE:
        confirmDialog("Bạn muốn xóa sản phẩm này!").then(async result => {
          if (result.value) {
            setLoading(true);
            await DELETE_PRODUCT_BY_ID(data.id).then(res => {
              setLoading(false);
              if (res.status === setting.STATUS_CODE.OK) {
                success(res.data.msg);
                getALLProduct();
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

  const getALLProduct = async () => {
    try {
      setLoading(true);
      let listProduct;
      await GET_ALL_PRODUCT().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listProduct = res.data.data.map(e => {
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
      setListProduct(listProduct);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getALLPromotions = async () => {
    try {
      setLoading(true);
      let listcode;
      await   GET_ALL_PROMOTION().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listcode = res.data.data;
          setListcode(listcode)
        } else {
          error(res.data.msg);
        }
      });
      setListcode(listcode);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getALLSupplier = async () => {
    try {
      setLoading(true);
      let listSupplier;
      await   GET_ALL_SUPPlIER().then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          listSupplier = res.data.data;
          setListSupplier(listSupplier)
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
      getALLPromotions();
      getALLProduct();
      getALLSupplier();
    }, 500);
  }, []);


    function handleUploadImage(e) {
      formData.anh = './src/assets/images/' + e.target.files[0].name;
      setFormData({ ...formData});
        console.log(formData);
    }
  

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
                Quản lý sản phẩm
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
                rows={listProduct}
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
            } sản phẩm`}</DialogTitle>
            <DialogContent>
            <div className="row">
                <div div className="col-md-6 mt-10">
                  <label htmlFor="code">Mã giảm giá</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.promotionID}
                    onChange={handleInputChange}
                    name="promotionID"
                  >
                    <option value="">Chọn mã giảm giá</option>
                    {listcode.map(e => (
                      <option key={e.id} name={e.id} value={e.id}>
                        {e.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mt-10">
                  <label htmlFor="tenNhaCungCap">Tên nhà cung cấp</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={formData.supplierID}
                    onChange={handleInputChange}
                    name="supplierID"
                  >
                    <option value="">Chọn tên nhà cung cấp</option>
                    {listSupplier.map(e => (
                      <option key={e.id} name={e.id} value={e.id}>
                        {e.ten}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="ten">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="ten"
                    value={formData.ten}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="moTa">Mô tả</label>
                  <input
                    type="text"
                    name="moTa"
                    value={formData.moTa}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập mô tả"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="heDieuHanh">Hệ điều hành</label>
                  <input
                    type="text"
                    name="heDieuHanh"
                    value={formData.heDieuHanh}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập hệ điều hành"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="donGia">Đơn giá</label>
                  <input
                    type="text"
                    name="donGia"
                    value={formData.donGia}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập đơn giá"
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
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="baoHanh">Bảo hành</label>
                  <input
                    type="text"
                    name="baoHanh"
                    value={formData.baoHanh}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập thời gian bảo hành"
                    required
                  />
                </div>
                <div className="form-group mt-10 col-md-6">
                  <label htmlFor="mauSac">Màu sắc</label>
                  <input
                    type="text"
                    name="mauSac"
                    value={formData.mauSac}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Nhập màu sắc sản phẩm"
                    required
                  />
                  </div>
                  
                  <div className="GetImg form-group mt-10 col-md-6">
                  <h2>Add Image:</h2>
                  <input type="file" id="anh" name="anh" accept="image/png, image/jpeg" onChange={handleUploadImage} />
                  <img src={formData.anh} />
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
                  <Button onClick={() => createProduct()}>Thêm mới</Button>
                </>
              ) : (
                <Button onClick={() => updateProduct()}>Lưu</Button>
              )}
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      )}
    </div>
  );
}
