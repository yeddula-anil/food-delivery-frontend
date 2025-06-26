import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';
import {CarouselItem} from './CarouselItem'
import { topmeals } from './topmeal';
export const MultiItemCarousel=()=>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        autoplay:true,
        autoplaySpeed:2000,
        slidesToScroll: 3,
        arrows:false
      };
    return(
        <div>
            <Slider {...settings}>
                {topmeals.map((item)=>(
                    <CarouselItem image={item.image} title={item.title}/> 
                ))}
                   
            </Slider>

        </div>
    )
}