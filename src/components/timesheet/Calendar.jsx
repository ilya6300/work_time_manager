import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import appDate from "../../service/state/app.date";
export const Calendar = observer(({ workCalendar }) => {
  if (workCalendar.length !== 0) {
    return (
      <div className="name_visitor_row_container_header">
        <div className="name_visitor_row">ФИО</div>
        <div className="work_days_container">
          {workCalendar.map((w) => (
            <div
              className={`work_days_container_cell `}
              style={{
                width: `${100 / workCalendar.length}%`,
                border:
                  appDate.hover_day === w.day
                    ? "2px solid var(--my_lazur_v2)"
                    : "",
              }}
              key={w.day}
            >
              <span>{w.dayWeek}</span>
              <span>{w.day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
});
