import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Carousel from "../../components/carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import setting from "../../setting.js";
import { GET_ALL_PRODUCT } from "../service.js";
import dayjs from "dayjs";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const sizeImgCarouselTop = { height: "100%", with: "100%" };

  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(amount);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET_ALL_PRODUCT()
          .then(response => response.data)
          .catch(error => {
            console.error("Error fetching all products:", error);
            throw error;
          });

        const formattedProducts = response.data.map(e => {
          const tuNgayFormatted = e.tuNgay
            ? dayjs(e.tuNgay).format("DD/MM/YYYY hh:mm:ss")
            : "";
          const denNgayFormatted = e.denNgay
            ? dayjs(e.denNgay).format("DD/MM/YYYY hh:mm:ss")
            : "";
          const donGia = formatCurrency(e.donGia);
          const code = new Date(e.denNgay) <= new Date(e.tuNgay) ? 0 : e.code;
          const giaKhuyenMai = formatCurrency((e.donGia * code) / 100);
          return {
            ...e,
            ngayTao: e.ngayTao ? dayjs(e.ngayTao).format("DD/MM/YYYY") : "",
            tuNgay: tuNgayFormatted,
            denNgay: denNgayFormatted,
            donGia: donGia,
            giaKhuyenMai: giaKhuyenMai,
          };
        });
        setListProduct(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container-sm">
            <div className="img-main">
              <img src="./src/assets/images/img-qc-iphone-main.webp" />
            </div>
            <div className="d-flex">
              <div className="carousel mt-4 mb-4">
                <Carousel sizeImg={sizeImgCarouselTop}></Carousel>
              </div>
              <div className="p-4">
                <img
                  className="img-small"
                  src="./src/assets/images/img-qc-small-1.webp"
                />
                <img
                  className="img-small mt-10"
                  src="./src/assets/images/img-qc-small-2.webp"
                />
              </div>
            </div>
            <div className="wrap-container-product row col-md-12 mt-20">
              <div className="col-md-2">
                <h5 className="fw-bolder mb-10">Hãng sản xuất</h5>
                {setting.LIST_FILTER_PRODUCER.map(item => (
                  <label
                    className="item-filter-producer d-block"
                    key={item.key}
                  >
                    <input type="checkbox" className="mr-10" />
                    {item.name}
                  </label>
                ))}
                <h5 className="fw-bolder mb-10 mt-20">Giá bán</h5>
                {setting.LIST_FILTER_PRICE.map(item => (
                  <label
                    className="item-filter-producer d-block"
                    key={item.key}
                  >
                    <input type="checkbox" className="mr-10" />
                    {item.name}
                  </label>
                ))}
              </div>
              <div className="col-md-10 list-product container-fluid">
                {listProduct.map(item => (
                  <div className="item-product" key={item.id}>
                    <div className="w-100 d-flex justify-content-center">
                      <p className="wrap-img">
                        <img src={item.anh} />
                      </p>
                    </div>
                    <div className="pl-30 pr-30">
                      <div>
                        <h3 className="fw-bold mb-10">{item.ten}</h3>
                        <p className="d-flex justify-content-between">
                          <span className="discount p-2">
                            {item.giaKhuyenMai}
                          </span>
                          <span className="cost p-1">{item.donGia}</span>
                        </p>
                      </div>
                      <div>
                        <img
                          className="rounded-circle"
                          src="https://images.fpt.shop/unsafe/fit-in/45x45/filters:quality(90):fill(white)/https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/Zalopay-1693187470025.png"
                        ></img>
                        <img
                          className="rounded-circle"
                          src="https://images.fpt.shop/unsafe/fit-in/45x45/filters:quality(90):fill(white)/https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/Vnapy-1693370130549.png"
                        ></img>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
