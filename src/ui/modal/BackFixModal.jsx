import React, { useEffect, useRef } from "react";

const BackFixModal = ({ children, funcClosed }) => {
  const refModalBackground = useRef(null);
  const refModal = useRef(null);

  const clickModalTest = (e) => {
    if (
      refModalBackground.current &&
      refModalBackground.current.contains(e.target) &&
      !refModal.current.contains(e.target)
    ) {
      funcClosed(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickModalTest);
    return () => {
      document.removeEventListener("click", clickModalTest);
    };
  }, []);

  return (
    <div ref={refModalBackground} className="background_new">
      <div ref={refModal} className="anim_modal_container">
        {children}
      </div>
    </div>
  );
};

export default BackFixModal;
