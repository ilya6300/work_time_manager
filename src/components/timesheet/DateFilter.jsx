import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";
import apiRequest from "../../service/api/api.request";

const DateFilter = observer(({ selectedMonth, monthDate }) => {
  const yearData = ["2028", "2027", "2026", "2025", "2024"];

  const changeYear = (e) => {
    appDate.setParameters("year", e.target.value);
    appDate.setParameters("visits", []);
  };



  const [filterValue, setFilterValue] = useState("");
  const [filterSupervisor, setFilterSupervisor] = useState("");

  useEffect(() => {
    if (
      (filterValue.length > 2 && filterValue !== "2/2") ||
      (filterValue.length > 2 && filterValue !== "5/2")
    ) {
      apiRequest.getVisits(
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-01`,
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-${
          appDate.days_count
        }`,
        filterSupervisor !== "99999" ? Number(filterSupervisor) : undefined,
        filterValue !== "2/2" && filterValue !== "5/2" ? filterValue : undefined
      );
    } else {
      apiRequest.getVisits(
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-01`,
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-${
          appDate.days_count
        }`,
        filterSupervisor !== "99999" ? Number(filterSupervisor) : undefined,
        undefined
      );
    }
    if (filterValue === "2/2" || filterValue === "5/2") {
      setTimeout(() => {
        appDate.filterEmploeesSchedule(filterValue);
      }, 1000);
    }
  }, [filterValue]);

  const selectSupevisor = async (e) => {
    setFilterSupervisor(e.target.value);
    if (e.target.value !== "99999") {
      apiRequest.getVisits(
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-01`,
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-${
          appDate.days_count
        }`,
        Number(e.target.value),
        filterValue.length < 3 ? undefined : filterValue
      );
    } else {
      apiRequest.getVisits(
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-01`,
        `${appDate.year}-${String(appDate.mount + 1).padStart(2, "0")}-${
          appDate.days_count
        }`,
        undefined,
        filterValue
      );
    }
  };

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
      </div>
      <div className="flx_bw_center">
        <span>Руководитель: </span>
        <select
          onChange={selectSupevisor}
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
