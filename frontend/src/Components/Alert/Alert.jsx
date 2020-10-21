import React from "react";
import CloseIcon from "../../sources/icons/delete.svg";
import "./Alert.scss";

const Alert = ({ err, closeError }) => {
  const CloseError = () => {
    closeError();
  };
  return (
    <div className="alert">
      {err.length > 1
        ? err.join() + " are required!"
        : err[0] + " is required!"}
      <img src={CloseIcon} alt="close" onClick={() => CloseError()} />
    </div>
  );
};

export default Alert;
