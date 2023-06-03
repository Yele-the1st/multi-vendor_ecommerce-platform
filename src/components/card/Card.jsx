import React from "react";

function Card({ item }) {
  return (
    <div className="w-full">
      <img
        className="w-full h-[427px] object-contain"
        src={item.image_Url.url}
        alt="Card image"
      />
    </div>
  );
}

export default Card;
