import React, { useState } from "react";
import appDate from "../../service/state/app.date";
import { ItemRowEmployees } from "./ItemRowEmployees";
import { AddBtn } from "../../ui/btn/AddBtn";
import { NewEmployees } from "./NewEmployees";
import { observer } from "mobx-react-lite";
import { FilterEmployess } from "./FilterEmployess";

export const ListTableEmployees = observer(
  ({
    removeSchedule,
    filterValue,
    setFilterValue,
    supervisorSelect,
    setSuervisorSelect,
  }) => {
    const [newEmploees, setNewEmploees] = useState(false);
    return (
      <div className="list_container_emploees">
        {newEmploees ? <NewEmployees setNewEmploees={setNewEmploees} /> : <></>}
        <div className="row_add_btn_container">
          <FilterEmployess
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            supervisorSelect={supervisorSelect}
            setSuervisorSelect={setSuervisorSelect}
          />
          <AddBtn onClick={() => setNewEmploees(!newEmploees)} />
        </div>
        <ul className="list_table_employees ">
          <li className="row_table_employees header_list static_header_row">
            <span className="row_table_employees_name table_center">ФИО</span>

            <span className="row_table_employees_schedule table_center">
              График
            </span>
            <span className="row_table_employees_my_schedule table_center">
              Руководитель
            </span>
            <span className="row_table_employees_my_schedule table_center">
              Табель-номер
            </span>
            <label className="row_table_employees_active table_center">
              Является руководителем
            </label>
            <label className="row_table_employees_active table_center">
              Активен (Работает)
            </label>
            <span className="table_center">Инструменты</span>
          </li>
          {appDate.employees.map((e) => (
            <ItemRowEmployees
              e={e}
              key={e.id}
              removeSchedule={removeSchedule}
            />
          ))}
        </ul>
      </div>
    );
  }
);
