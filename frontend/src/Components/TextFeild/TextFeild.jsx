import React from 'react';
import { useState } from 'react';
 

const TextFeild = ({name,placehodler,type,icon,showValue}) => {
    
    const [showLabel,setShowLabel] = useState(false);
    const changeHandler = val => {
      return  showValue(name,val);
    }
    return (
        <div className="text-input">
         {showLabel ? <label>{placehodler.toLowerCase()}</label> : null}
         <div className="input-container">
              <img src={icon} alt={name} className="icon"/> 
            <input onChange={(e)=> changeHandler(e.target.value)} type={type} onFocus={()=> setShowLabel(true)} name={name} placeholder={placehodler} /> 
         </div>
        </div>
    );
};

export default TextFeild;