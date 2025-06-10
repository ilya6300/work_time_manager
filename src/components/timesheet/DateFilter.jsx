import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    appDate.filterName("visits", filterValue);
  }, [filterValue]);

  return (
    <div className="filter_timesheet_container">
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
      <InputBlockv1
        value={filterValue}
        setValue={setFilterValue}
        placeholder="Поиск по имени и графику"
      />
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
  );
});

export default DateFilter;
