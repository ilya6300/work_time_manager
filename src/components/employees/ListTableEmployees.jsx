import React, { useState } from "react";
import appDate from "../../service/state/app.date";
import { ItemRowEmployees } from "./ItemRowEmployees";
import { AddBtn } from "../../ui/btn/AddBtn";
import { NewEmployees } from "./NewEmployees";
import { observer } from "mobx-react-lite";

export const ListTableEmployees = observer(({ removeSchedule }) => {
  const [newEmploees, setNewEmploees] = useState(false);
  return (
    <div className="list_container_emploees">
      {newEmploees ? <NewEmployees setNewEmploees={setNewEmploees} /> : <></>}
      <p className="row_add_btn_container">
        <AddBtn onClick={() => setNewEmploees(!newEmploees)} />
      </p>
      <ul className="list_table_employees ">
        <li className="row_table_employees header_list static_header_row">
          <span className="row_table_employees_name">ФИО</span>

          <span className="row_table_employees_schedule">График</span>
          <span className="row_table_employees_my_schedule">Руководитель</span>
          <label className="row_table_employees_active">
            Является руководителем
          </label>
          <label className="row_table_employees_active">
            Активен (Работает)
          </label>
          <span>Инструменты</span>
        </li>
        {appDate.employees.map((e) => (
          <ItemRowEmployees e={e} key={e.id} removeSchedule={removeSchedule} />
        ))}
      </ul>
    </div>
  );
});
