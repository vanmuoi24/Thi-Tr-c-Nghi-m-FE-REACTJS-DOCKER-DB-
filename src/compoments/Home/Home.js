import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import anh1 from "../../assets/iStock_641600572.avif";
import anh2 from "../../assets/1.jpg";
import anh3 from "../../assets/cach-dung-quizizz.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const account = useSelector((state) => state.user.account);

  return (
    <div className="homepage-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={anh1} alt="First slide" />
          <Carousel.Caption>
            <h3>Ngân Hàng Câu Hỏi</h3>
            <p>Xin chào tất cả các bạn tới trang web của Tèn</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={anh2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Ngân Hàng Câu Hỏi</h3>
            <p>Xin chào tất cả các bạn tới trang web của Tèn</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={anh3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Ngân Hàng Câu Hỏi</h3>
            <p>Xin chào tất cả các bạn tới trang web của Tèn</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
