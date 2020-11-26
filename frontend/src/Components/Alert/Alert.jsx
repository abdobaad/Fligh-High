import React from "react";
import CloseIcon from "../../sources/icons/delete.svg";
import "./Alert.scss";

const Alert = ({ err, closeError,type,isNotError}) => {
 
  const CloseError = () => {
    closeError();
  };

  const AlertData = (type,err) => {
    if(type === 'user' || type ==="passedDate"){
      return err
    }else if(type === 'requires'){
      return  err.length > 1
      ? err.join() + " are required!"
      : err[0] + " is required!"
    }
    
    
  }
  return (
    <div  className={`alert ${isNotError ?'success': 'error'}`}>
      {AlertData(type,err)}
     
      <img src={CloseIcon} alt="close" onClick={() => CloseError()} />
    </div>
  );
};

export default Alert;
