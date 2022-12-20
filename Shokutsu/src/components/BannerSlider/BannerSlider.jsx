import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./BannerSlider.scss";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "/img/b2.jpg",
    "/img/b1.jpg",
    "/img/b3.jpg",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div className="container" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
      <div className="overlay">
            <div className="wrapper">

                <small className="title">We Got You Covered</small>
                <br/>   
                <div className="top">
                    <h2>Wanna Serve Food To World?</h2>
                    <h3>Register Your Restaurant ..!</h3>
                    
                </div>
                <h4>OR</h4>
                <div className="bottom">
                    <h3>Food-Junkie? Worry Not! </h3>
                    <h2>Order Favorite Food Near You.</h2>
                </div>

            

            </div>
      </div>
    </div>
  );
};

export default BannerSlider;