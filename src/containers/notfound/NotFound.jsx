import React from "react";
import "./NotFound.css";

const NotFound = (props) => {
  const { message = "Sorry, page not found!" } = props;
  return (
    <div className="NotFound">
      <h3>{message}</h3>
    </div>
  );
};

export default NotFound;
