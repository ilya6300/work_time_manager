import React, { useState } from "react";
import { AddBtn } from "../../ui/btn/AddBtn";
import { NewDocs } from "./NewDocs";
import { observer } from "mobx-react-lite";
import appDate from "../../service/state/app.date";
import { ItemDocs } from "./ItemDocs";

const ListDocs = observer(() => {
  const [newDocs, setNewDocs] = useState(false);

  return (
    <ul className="list_table_docs progress-bar">
      {newDocs ? <NewDocs setNewDocs={setNewDocs} /> : null}
      <li className="row_table_schedule static_header_row">
        <AddBtn onClick={() => setNewDocs(true)} setNewDocs={setNewDocs} />
      </li>
      <li
        className="row_table_schedule row_table_schedule_title static_header_row"
        style={{ top: "55px" }}
      >
        <span className="row_table_schedule_30">Сотрудник</span>
        <label className="row_table_schedule_30">Период заявления</label>

        <span className="row_table_schedule_30">Описания</span>
        <span className="row_table_schedule_10">Скачать</span>
      </li>
      {appDate.docs !== null ? (
        <>
          {appDate.docs.map((d) => (
            <ItemDocs key={d.id} d={d} />
          ))}
        </>
      ) : (
        <></>
      )}
    </ul>
  );
});

export default ListDocs;
