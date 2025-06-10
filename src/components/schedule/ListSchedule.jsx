import React from "react";
import { observer } from "mobx-react-lite";
import appDate from "../../service/state/app.date";
import { ItemRowSchedule } from "./ItemRowSchedule";
import { AddBtn } from "../../ui/btn/AddBtn";

export const ListSchedule = observer(({ setNewSchedule }) => {
  if (appDate.schedule === null) {
    return <div>Загрузка графиков</div>;
  }
  if (appDate.schedule.length !== 0) {
    return (
      <ul className="list_table_schedule">
        <li className="row_table_schedule row_table_schedule_title">
          <span className="row_table_schedule_25">Название</span>
          <span className="row_table_schedule_15">График</span>
          <span className="row_table_schedule_25">Начало </span>
          <span className="row_table_schedule_25">Окончание</span>
          <span className="row_table_schedule_10">Инструменты</span>
        </li>
        <li className="row_table_schedule" style={{ textAlign: "end" }}>
          <AddBtn onClick={() => setNewSchedule(true)} />
        </li>
        {appDate.schedule.map((s) => (
          <ItemRowSchedule s={s} key={s.id} />
        ))}
      </ul>
    );
  }
});
