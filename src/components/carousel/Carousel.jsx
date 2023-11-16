import React from "react";
import Slider from "react-slick";

const Carousel = props => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div>
        <img
          style={props.sizeImg}
          src="./src/assets/images/img-qc-galaxy.webp"
        />
      </div>
      <div>
        <img style={props.sizeImg} src="./src/assets/images/img-qc-oppo.webp" />
      </div>
      <div>
        <img
          style={props.sizeImg}
          src="./src/assets/images/img-qc-redmi.webp"
        />
      </div>
      <div>
        <img
          style={props.sizeImg}
          src="./src/assets/images/img-qc-realme.webp"
        />
      </div>
    </Slider>
  );
};

export default Carousel;
