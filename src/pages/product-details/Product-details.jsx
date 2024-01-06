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

import "../product-details/styles.scss";
import {
  CREATE_CART,
  GET_ALL_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  CREATE_PRODUCT,
  GET_ALL_PROMOTION,
  GET_ALL_SUPPlIER,
  GET_PRODUCT_BY_ID,
} from "../service.js";
import setting from "../../setting.js";
import { data } from "jquery";

export default function ProductDetails() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    userID: "",
    productID: "",
    soLuong:"",
  });

  const getProductByID = async () => {
    try {
      setLoading(true);
      let product;
      const urlSearchParams = new URLSearchParams(window.location.search);
      await GET_PRODUCT_BY_ID(urlSearchParams.get("id")).then(res => {
        setLoading(false);
        if (res.status === setting.STATUS_CODE.OK) {
          product = res.data.data[0];
          setProduct(product);
        } else {
          error(res.data.msg);
        }
      });
      setProduct(product);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getProductByID();
    }, 500);
  }, []);

  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(amount);
  }
  const giaKhuyenMai = formatCurrency((product.donGia * product.code) / 100);

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
  };

  const createCart = async () => {
    
    let payLoad={
      userID: JSON.parse(localStorage.getItem("user")).id,
      productID: product.id,
      soLuong: formData.soLuong,
      };

    setLoading(true);
    await CREATE_CART(payLoad).then(res => {
      setLoading(false);
      if (res.status === setting.STATUS_CODE.OK) {
        success(res.data.msg);
      } else {
        error(res.data.msg);
      }
    });
  };
  

  return (
    <div>
      <div className="container bootdey">
        <div className="col-md-12">
          <section className="panel">
            <div className="panel-body">
              <div className="col-md-6">
                <div className="pro-img-details">
                  <img src={product.anh} />
                </div>
              </div>
              <div className="col-md-6">
                <h className="pro-d-title"></h>
                <p>
                  <span className="posted_in">
                    {" "}
                    <strong>Mô tả sản phẩm: </strong>{" "}
                    <a rel="tag" href="#/">
                      {product.moTa}
                    </a>
                    ,{" "}
                  </span>
                </p>
                <div className="product_meta">
                  <span className="posted_in">
                    {" "}
                    <strong>Hệ điều hành:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.heDieuHanh}
                    </a>
                  </span>
                  <span className="tagged_as">
                    <strong>Màu sắc:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.mauSac}
                    </a>
                    .
                  </span>
                  <span className="tagged_as">
                    <strong>Bảo hành:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.baoHanh}
                    </a>
                    .
                  </span>
                </div>
                <div className="m-bot15">
                  {" "}
                  <strong>Đơn Giá : </strong>{" "}
                  <span className="amount-old">{product.donGia}</span>{" "}
                  <span className="pro-price"> {giaKhuyenMai}</span>
                </div>
                <p>
                
                <button
                  type="button"
                  className="btn btn-round btn-danger addcart"
                  onClick={() =>createCart()
                  }
                >
                  <FontAwesomeIcon className="icon-add mr-5" icon="fa fa-shopping-cart" />
                  Thêm vào giỏ hàng
                </button>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
