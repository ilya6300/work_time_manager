import React, { memo } from "react";

const InputBlockv1 = memo(
  ({ cls, value, setValue, placeholder, type, ...props }) => {
    const changeOn = (e) => {
      setValue(e.target.value.replace(/[&<>"'`]/g, "\\"));
    };
    return (
      <input
        value={value}
        onChange={changeOn}
        className={`input_standart ${cls}`}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

export default InputBlockv1;
