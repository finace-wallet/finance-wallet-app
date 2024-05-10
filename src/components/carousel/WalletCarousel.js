import { WalletCard } from "components/card";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WalletCarousel = ({ wallets }) => {
  var settings = {
    dots: true,
    infinite: wallets.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className=" ml-2 items-center mx-auto max-w-[400px]">
      <Slider {...settings}>
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} />
        ))}
      </Slider>
    </div>
  );
};

export default WalletCarousel;
