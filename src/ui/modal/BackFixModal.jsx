import React from "react";

const BackFixModal = ({ children, ...props }) => {
  return (
    <div className="background_new">
      <div className="anim_modal_container">{children}</div>
    </div>
  );
};

export default BackFixModal;
