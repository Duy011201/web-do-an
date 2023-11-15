import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Carousel from "../../components/carousel/Carousel";
import "./style.scss";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const sizeImgCarouselTop = { height: "100%", with: "100%" };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="container-fluid m-0 p-0 wrap-home vh-100 bg-lazy">
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
              <div className="carousel mt-3 mb-3">
                <Carousel sizeImg={sizeImgCarouselTop}></Carousel>
              </div>
              <div className="p-3">
                <img className="img-small" src="./src/assets/images/img-qc-small-1.webp" />
                <img className="img-small mt-10" src="./src/assets/images/img-qc-small-2.webp" />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
