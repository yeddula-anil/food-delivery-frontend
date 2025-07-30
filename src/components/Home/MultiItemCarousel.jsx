import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CarouselItem } from './CarouselItem';
import { topmeals } from './topmeal';

export const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // small tablets & large phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // mobile phones
        settings: {
          slidesToShow: 2,  // ✅ show 2 items instead of 1
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-[95%] mx-auto py-5">
      <Slider {...settings}>
        {topmeals.map((item, index) => (
          <CarouselItem key={index} image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};
