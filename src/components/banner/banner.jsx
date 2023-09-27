import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner2 from "../../assets/banners/banner-n02.jpg";
import Banner3 from "../../assets/banners/banner-n03.jpg";
import Banner4 from "../../assets/banners/banner-n04.jpg";

function Carrusel() {
  const carruselStyle = {
    marginTop: "120px",
    marginBottom: "20px",
  };

  return (
    <div style={carruselStyle}>
      <Carousel>
        <Carousel.Item>
          <img
            src={Banner2}
            alt="Slide 1"
            className="d-block w-75 h-50 mx-auto"
          />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Banner3}
            alt="Slide 2"
            className="d-block w-75 h-50 mx-auto"
          />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Banner4}
            alt="Slide 3"
            className="d-block w-75 h-50 mx-auto"
          />
          <Carousel.Caption />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carrusel;