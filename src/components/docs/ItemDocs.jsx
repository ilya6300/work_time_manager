import React, { useState } from "react";
import apiRequest from "../../service/api/api.request";
import { saveAs } from "file-saver";
import BackFixModal from "../../ui/modal/BackFixModal";
import BtnVer1 from "../../ui/btn/BtnVer1";

export const ItemDocs = (props) => {
  return (
    <li
      onClick={() => props.modalCardVisible(props.d)}
      className="row_table_schedule hover_row_v1"
    >
      <span className="row_table_schedule_25">{props.d.emploee_name}</span>
      <label className="row_table_schedule_30">
        <span>
          {new Date(props.d.start).toLocaleDateString()},{" "}
          {new Date(props.d.start).toLocaleTimeString()}-
        </span>
        <span>
          {new Date(props.d.end).toLocaleDateString()},{" "}
          {new Date(props.d.start).toLocaleTimeString()}
        </span>
      </label>

      <span className="row_table_schedule_45">{props.d.description}</span>
      {/* <span
        className="row_table_schedule_10 download_btn"
        onClick={downloadDoc}
      >
        Скачать
      </span> */}
    </li>
  );
};
