import React from "react";

export const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[10rem] md:w-[12rem] md:h-[12rem] lg:w-[14rem] lg:h-[14rem] rounded-full object-cover object-center"
        src={image}
        alt={title}
      />
      <span className="py-3 md:py-5 font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 text-center">
        {title}
      </span>
    </div>
  );
};
