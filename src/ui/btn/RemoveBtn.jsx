import React from "react";

export const RemoveBtn = (props) => {
  return (
    <button
      className="btn_remove_txt"
      style={props.style}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};
