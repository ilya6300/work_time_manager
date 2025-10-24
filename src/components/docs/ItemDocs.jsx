import React, { useState } from "react";

export const ItemDocs = (props) => {
  return (
    <li
      onClick={() => props.modalCardVisible(props.d)}
      className="row_table_schedule hover_row_v1"
    >
      <span className="row_table_docs_20">
        {props.d.employer?.last_name} {props.d.employer?.first_name}{" "}
        {props.d.employer?.second_name}
      </span>
      <span className="row_table_docs_10">{props.d.doc_type}</span>
      <span className="row_table_schedule_30">
        {props.d.start} {props.d.end}
      </span>

      <span className="row_table_docs_40">{props.d.comment}</span>
    </li>
  );
};
