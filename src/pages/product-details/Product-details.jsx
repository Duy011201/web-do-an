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
  console.log(product);
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
  console.log(giaKhuyenMai);
  return (
    <div>
      <div class="container bootdey">
        <div class="col-md-12">
          <section class="panel">
            <div class="panel-body">
              <div class="col-md-6">
                <div class="pro-img-details">
                  <img src={product.anh} />
                </div>
              </div>
              <div class="col-md-6">
                <h class="pro-d-title"></h>
                <p>
                  <span class="posted_in">
                    {" "}
                    <strong>Mô tả sản phẩm: </strong>{" "}
                    <a rel="tag" href="#/">
                      {product.moTa}
                    </a>
                    ,{" "}
                  </span>
                </p>
                <div class="product_meta">
                  <span class="posted_in">
                    {" "}
                    <strong>Hệ điều hành:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.heDieuHanh}
                    </a>
                  </span>
                  <span class="tagged_as">
                    <strong>Màu sắc:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.mauSac}
                    </a>
                    .
                  </span>
                  <span class="tagged_as">
                    <strong>Bảo hành:</strong>{" "}
                    <a rel="tag" href="#/">
                      {product.baoHanh}
                    </a>
                    .
                  </span>
                </div>
                <div class="m-bot15">
                  {" "}
                  <strong>Đơn Giá : </strong>{" "}
                  <span class="amount-old">{product.donGia}</span>{" "}
                  <span class="pro-price"> {giaKhuyenMai}</span>
                </div>
                <div class="form-group">
                  <label>
                    <strong>Số lượng: </strong>
                  </label>
                  <input type="quantiy" class="quantiy quantity" />
                </div>
                <p>
                  <button
                    class="btn btn-round btn-danger addcart"
                    type="button"
                  >
                    <i class="fa fa-shopping-cart"></i> Thêm vào giỏ hàng
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
