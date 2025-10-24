import React from "react";
import iconAlert from "../../img/icon/alarm_active.png";
import { useNavigate } from "react-router";

export const AlertCenter = () => {
  const navigation = useNavigate();
  return (
    <div className="alert_container">
      <img
        onClick={() => navigation("/unknow")}
        className="alert"
        src={iconAlert}
        alt="Оповещение"
      />
    </div>
  );
};
