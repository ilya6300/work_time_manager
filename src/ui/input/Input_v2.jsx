import React from "react";

export const Input_v2 = (props) => {
  return (
    <input
      className="input_v2"
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};
