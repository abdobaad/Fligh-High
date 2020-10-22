import React from "react";
import CloseIcon from "../../sources/icons/delete.svg";
import "./Alert.scss";

const Alert = ({ err, closeError,type,isError}) => {
 
  const CloseError = () => {
    closeError();
  };
  return (
    <div className={`alert ${isError ? 'error':'success'}`}>
      {type === 'user'? err : 
        err.length > 1
        ? err.join() + " are required!"
        : err[0] + " is required!"}
      <img src={CloseIcon} alt="close" onClick={() => CloseError()} />
    </div>
  );
};

export default Alert;
