import React from "react";
import apiRequest from "../../service/api/api.request";
import { saveAs } from "file-saver";

export const ItemDocs = (props) => {
  const downloadDoc = async () => {
    console.log(props.d);
    const res = await apiRequest.downloadDocID(props.d.id);
    if (res) {
      console.log(res);
      saveAs(
        new Blob([res.data]),
        `${props.d.emploee_name} ${props.d.start}-${props.d.end}.${res.headers.file_extention}`,
        res.headers.file_extention
      );
    }
  };

  return (
    <li className="row_table_schedule hover_row_v1">
      <span className="row_table_schedule_30">{props.d.emploee_name}</span>
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

      <span className="row_table_schedule_30">{props.d.description}</span>
      <span
        className="row_table_schedule_10 download_btn"
        onClick={downloadDoc}
      >
        Скачать
      </span>
    </li>
  );
};
