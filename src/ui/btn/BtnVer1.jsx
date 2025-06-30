import React from "react";

const BtnVer1 = (props) => {
  return (
    <button className="btn_ver_1" style={props.style} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default BtnVer1;
