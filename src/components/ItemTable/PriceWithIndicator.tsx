import React from "react";
import "../../../styles/priceWithIndicator.css";
import { Typography } from "@mui/joy";

const PriceWithIndicator = ({
  price,
  isIncreased,
}: {
  price: string;
  isIncreased: boolean;
}) => {
  return (
    <Typography>
      <div className="price-container">
        {isIncreased ? (
          <span className="carrot-icon red-carrot">&#9650;</span>
        ) : (
          <span className="carrot-icon green-carrot">&#9660;</span>
        )}
        <span className="price-value">{price}</span>
      </div>
    </Typography>
  );
};

export default PriceWithIndicator;
