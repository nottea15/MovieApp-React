import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import MovieCard from "./MovieCard";

const MovieCarousel = ({ items }) => {
  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 4 },
  };
  return <AliceCarousel items={items} responsive={responsive} />;
};

export default MovieCarousel;
