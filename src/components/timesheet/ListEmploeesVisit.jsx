import React from "react";
import { ItemEmploeesVisit } from "./ItemEmploeesVisit";
import { observer } from "mobx-react-lite";
import { Calendar } from "./Calendar";
import appDate from "../../service/state/app.date";

export const ListEmploeesVisit = observer(({ workCalendar }) => {
  if (appDate.original_visits.length) {
    return (
      <div className="name_visitor_row_list">
        <Calendar workCalendar={workCalendar} />
        {appDate.visits.map((v) => (
          <ItemEmploeesVisit v={v} key={v.employer_id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="grey_message_container">
        <p className="grey_message">Выберите месяц</p>
      </div>
    );
  }
});
