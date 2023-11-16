import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Carousel from "../../components/carousel/Carousel";
import "./style.scss";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const sizeImgCarouselTop = { height: "100%", with: "100%" };
  const listFilterProducer = [
    { key: "all", name: "Tất cả" },
    { key: "apple", name: "Apple" },
    { key: "samsung", name: "Samsung" },
    { key: "oppo", name: "Oppo" },
    { key: "xiaomi", name: "Xiaomi" },
    { key: "realme", name: "Realme" },
  ];
  const listFilterPrice = [
    { key: "all", name: "Tất cả" },
    { key: "<2", name: "Dưới 2 triệu" },
    { key: "2-4", name: "Từ 2 - 4 triêu" },
    { key: "4-7", name: "Từ 4 - 7 triêu" },
    { key: ">7", name: "Trên 7 triêu" },
  ];
  const listProduct = [
    {
      promotionID: 1,
      supplierID: 1,
      ten: "Iphone 13 pro max",
      moTa: "Description for Product 1",
      heDieuHanh: "OS 1",
      anh: "./src/assets/images/img-google-pixel-2xl.jpg",
      donGia: '27.500.000',
      baoHanh: "Warranty 1",
      mauSac: "Color 1",
    },
    {
      promotionID: 2,
      supplierID: 2,
      ten: "Product 2",
      moTa: "Description for Product 2",
      heDieuHanh: "OS 2",
      anh: "./src/assets/images/img-iphone-8.jpg",
      donGia: 150.0,
      baoHanh: "Warranty 2",
      mauSac: "Color 2",
    },
    {
      promotionID: 2,
      supplierID: 2,
      ten: "Product 2",
      moTa: "Description for Product 2",
      heDieuHanh: "OS 2",
      anh: "./src/assets/images/img-iphone-8.jpg",
      donGia: 150.0,
      baoHanh: "Warranty 2",
      mauSac: "Color 2",
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
                {listFilterProducer.map(item => (
                  <label
                    className="item-filter-producer d-block"
                    key={item.key}
                  >
                    <input type="checkbox" className="mr-10" />
                    {item.name}
                  </label>
                ))}
                <h5 className="fw-bolder mb-10 mt-20">Giá bán</h5>
                {listFilterPrice.map(item => (
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
                    <div className="pl-30 pr-30">
                      <h3 className="fw-bold mb-10">{item.ten}</h3>
                      <span className="price p-1">{item.donGia}</span>
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
