import React from "react";

const BtnVer1 = (props) => {
  return (
    <button style={props.style} className="btn_ver_1" onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default BtnVer1;
