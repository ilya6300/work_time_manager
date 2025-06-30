import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";

const DateFilter = observer(({ selectedMonth, monthDate }) => {
  const yearData = ["2025", "2024"];

  const changeYear = (e) => {
    appDate.setParameters("year", e.target.value);
    appDate.setParameters("visits", []);
  };

  const [filterValue, setFilterValue] = useState("");

  useMemo(() => {
    appDate.filterName("visits", filterValue);
    return () => appDate.filterName;
  }, [filterValue, appDate.filter_value_employees_id_supervisor]);

  return (
    <div className="filter_timesheet_container">
      <div className="flx_bw_center">
        <div className="nav_mounth_container">
          {monthDate.map((m) => (
            <button
              key={m.id}
              className={
                m.select && m.active
                  ? "nav_mounth_btn_select"
                  : !m.select && m.active
                  ? "nav_mounth_btn"
                  : "nav_mounth_btn_deactie"
              }
              onClick={m.active ? () => selectedMonth(m.id) : null}
            >
              {m.month}
            </button>
          ))}
        </div>
        <select
          onChange={changeYear}
          className="select_type_year"
          defaultValue={appDate.year}
        >
          {yearData.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="flx_bw_center">
        <span>Руководитель: </span>
        <select
          onChange={(e) =>
            appDate.setParameters(
              "filter_value_employees_id_supervisor",
              Number(e.target.value)
            )
          }
          className="select_type_schedule"
          style={{ width: "15vw" }}
        >
          <option value={99999} defaultValue>
            Все руководители
          </option>
          {appDate.supervisor.map((s) => (
            <option value={s.id} key={s.id}>
              {s.last_name} {s.first_name}
            </option>
          ))}
        </select>
        <InputBlockv1
          value={filterValue}
          setValue={setFilterValue}
          placeholder="Поиск по имени и графику"
          style={{ width: "12vw", height: "100%" }}
        />
      </div>
    </div>
  );
});

export default DateFilter;
