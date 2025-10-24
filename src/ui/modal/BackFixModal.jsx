import React, { useEffect, useRef } from "react";

const BackFixModal = ({ children, funcClosed }) => {
  const refModalBackground = useRef(null);
  const refModal = useRef(null);
  let clickModal = false;

  const clickModalTest = (e) => {
    if (
      refModalBackground.current &&
      refModalBackground.current.contains(e.target) &&
      !refModal.current.contains(e.target) &&
      !clickModal
    ) {
      funcClosed(false);
    }
    clickModal = false;
  };
  useEffect(() => {
    document.addEventListener("click", clickModalTest);
    return () => {
      document.removeEventListener("click", clickModalTest);
    };
  }, []);

  const onMouseDownAnimModal = () => {
    clickModal = true;
  };
  const onMouseUpAnimModal = () => {
    clickModal = false;
  };

  return (
    <div ref={refModalBackground} className="background_new">
      <div
        ref={refModal}
        className="anim_modal_container"
        onMouseDown={onMouseDownAnimModal}
        onMouseUp={onMouseUpAnimModal}
      >
        {children}
      </div>
    </div>
  );
};

export default BackFixModal;
