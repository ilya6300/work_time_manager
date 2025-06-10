import React from "react";

export const Input_v1 = (props) => {
  return (
    <div className="input_v1">
      <p>{props.title}:</p>
      <input
      className="input_v1_name"
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};
