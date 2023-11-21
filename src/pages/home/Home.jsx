import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Carousel from "../../components/carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import setting from "../../setting.js";
import { GET_ALL_PRODUCT } from "../service.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const sizeImgCarouselTop = { height: "100%", with: "100%" };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET_ALL_PRODUCT()
          .then(response => response.data)
          .catch(error => {
            console.error("Error fetching all products:", error);
            throw error;
          });
        setListProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
              <div className="col-md-10 list-product">
                {listProduct.map(item => (
                  <div className="item-product" key={item.id}>
                    <div className="w-100 d-flex justify-content-center">
                      <p className="wrap-img">
                        <img src={item.anh} />
                      </p>
                    </div>
                    <div className="pl-30 pr-30 d-flex justify-content-between">
                      <div>
                        <h3 className="fw-bold mb-10">{item.ten}</h3>
                        <span className="price p-1">{item.donGia}</span>
                      </div>
                      <div>
                        Thêm giỏ hàng
                        <FontAwesomeIcon
                          className="icon-cart"
                          icon="fa-solid fa-cart-shopping"
                        />
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
