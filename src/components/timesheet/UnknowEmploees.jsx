import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import appDate from "../../service/state/app.date";
import { ItemUnknowEmploees } from "./ItemUnknowEmploees";
import BtnVer1 from "../../ui/btn/BtnVer1";
import { useNavigate } from "react-router";

export const UnknowEmploees = observer(() => {
  const saveItemAll = () => {
    appDate.unknow_emploees.map((e) => {
      console.log(e.service_number);
      if (
        e.service_number === "" ||
        e.service_number === 0 ||
        !e.service_number
      ) {
        return alert(
          `Не удалось сохранить сотрудника ${e.last_name} ${e.first_name}. Не заполнено поле,  табель-номер сотрудника`
        );
      }
      if (e.schedule_id === "" || e.schedule_id === 0 || !e.schedule_id) {
        return alert(
          `Не удалось сохранить сотрудника ${e.last_name} ${e.first_name}. Не заполнено поле графика сотрудника`
        );
      }
      appDate.updateUnknowList(e);
    });
  };

  const navigation = useNavigate();

  if (appDate.unknow_emploees !== null) {
    return (
      <ul className="list_table_employees">
        <li className="row_title_unknow_emploees">
          Внимание! Имеются сотрудники, не занесённые в текущее приложение. Учёт
          по незаведённым сотрудникам вестись не будет. Сохраните их.
        </li>
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
          <span className="row_table_employees_tools table_center">
            Инструменты
          </span>
        </li>
        {appDate.unknow_emploees.map((e) => (
          <ItemUnknowEmploees
            key={e.id}
            e={e}
            saveItem={() => appDate.updateUnknowList(e)}
          />
        ))}
        <li className="btn_container_modal">
          <BtnVer1 onClick={saveItemAll} name="Сохранить все" />
          <BtnVer1 onClick={() => navigation("/timesheet")} name="Закрыть" />
        </li>
      </ul>
    );
  }
});
