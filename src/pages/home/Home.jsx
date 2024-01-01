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
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(listProduct);
  const sizeImgCarouselTop = { height: "100%", with: "100%" };
  const [producerFilters, setProducerFilters] = useState(
    setting.LIST_FILTER_PRODUCER
  );
  const [priceFilters, setPriceFilters] = useState(setting.LIST_FILTER_PRICE);
  const [payload, setPayload] = useState({ producer: [], price: [] });

  const handleProducerFilterChange = key => {
    let listKeySearch = payload.producer;
    const updatedFilters = producerFilters.map(filter => {
      if (filter.key === key) {
        const updatedFilter = { ...filter, isChecked: !filter.isChecked };
        if (updatedFilter.isChecked === true) {
          listKeySearch.push(filter.key);
        } else if (updatedFilter.isChecked === false) {
          const indexToRemove = listKeySearch.indexOf(filter.key);
          if (indexToRemove !== -1) {
            listKeySearch.splice(indexToRemove, 1);
          }
        }
        return updatedFilter;
      } else {
        return filter;
      }
    });
    setPayload({ ...payload, producer: listKeySearch });
    setProducerFilters(updatedFilters);
    fetchData(payload);
  };

  const handlePriceFilterChange = key => {
    let listKeySearch = payload.price;
    const updatedFilters = priceFilters.map(filter => {
      if (filter.key === key) {
        const updatedFilter = { ...filter, isChecked: !filter.isChecked };
        if (updatedFilter.isChecked === true) {
          listKeySearch.push(filter.key);
        } else if (updatedFilter.isChecked === false) {
          const indexToRemove = listKeySearch.indexOf(filter.key);
          if (indexToRemove !== -1) {
            listKeySearch.splice(indexToRemove, 1);
          }
        }
        return updatedFilter;
      } else {
        return filter;
      }
    });
    setPayload({ ...payload, price: listKeySearch });
    fetchData(payload);
    setPriceFilters(updatedFilters);
  };

  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(amount);
  }

  function reSetData() {
    fetchData([]);
    setProducerFilters(setting.LIST_FILTER_PRODUCER);
    setPriceFilters(setting.LIST_FILTER_PRICE);
  }

  const fetchData = async listKeySearch => {
    try {
      const response = await GET_ALL_PRODUCT(listKeySearch)
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
          giaGoc: e.donGia,
          donGia: donGia,
          giaKhuyenMai: giaKhuyenMai,
        };
      });
      setFilteredProducts(formattedProducts);
      setListProduct(formattedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(payload);
  }, [payload]);

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
                <h5 className="fw-bolder mb-10">
                  Hãng sản xuất
                  <FontAwesomeIcon
                    onClick={reSetData}
                    icon="fa-solid fa-arrow-rotate-left"
                    style={{ marginLeft: "10px" }}
                  />
                </h5>
                {producerFilters.map(filter => (
                  <label
                    className="item-filter-producer d-block"
                    key={filter.key}
                  >
                    <input
                      type="checkbox"
                      className="mr-10"
                      checked={filter.isChecked}
                      onChange={() => handleProducerFilterChange(filter.key)}
                    />
                    {filter.name}
                  </label>
                ))}
                <h5 className="fw-bolder mb-10 mt-20">Giá bán</h5>
                {priceFilters.map(filter => (
                  <label
                    className="item-filter-producer d-block"
                    key={filter.key}
                  >
                    <input
                      type="checkbox"
                      className="mr-10"
                      checked={filter.isChecked}
                      onChange={() => handlePriceFilterChange(filter.key)}
                    />
                    {filter.name}
                  </label>
                ))}
              </div>
              <div className="col-md-10 list-product container-fluid d-flex flex-wrap">
                {filteredProducts.map(item => (
                  <Link to={`/product-detail?id=${item.id}`}><div className="item-product" key={item.id}>
                    <div className="d-flex justify-content-center">
                      <p className="wrap-img">
                        <img src={item.anh} />
                      </p>
                    </div>
                    <div className="pl-20 pr-20">
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
                  </Link>

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
