import { observer } from "mobx-react-lite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import apiRequest from "../service/api/api.request";
import appDate from "../service/state/app.date";
import { ListEmploeesVisit } from "../components/timesheet/ListEmploeesVisit";
import DateFilter from "../components/timesheet/DateFilter";
import appState from "../service/state/app.state";

export const Timesheet = observer(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [loadMonth, setLoadMonth] = useState(false);

  // const [filterValue, setFilterValue] = useState("");

  const [workCalendar, setWorkCalendar] = useState([]);

  // const yearData = ["2025", "2024"];

  const [monthDate, setMonthDate] = useState([
    { id: 0, month: "Январь", active: false, select: false },
    { id: 1, month: "Февраль", active: false, select: false },
    { id: 2, month: "Март", active: false, select: false },
    { id: 3, month: "Апрель", active: false, select: false },
    { id: 4, month: "Май", active: false, select: false },
    { id: 5, month: "Июнь", active: false, select: false },
    { id: 6, month: "Июль", active: false, select: false },
    { id: 7, month: "Август", active: false, select: false },
    { id: 8, month: "Сентябрь", active: false, select: false },
    { id: 9, month: "Октябрь", active: false, select: false },
    { id: 10, month: "Ноябрь", active: false, select: false },
    { id: 11, month: "Декабрь", active: false, select: false },
  ]);

  const selectedMonth = (id) => {
    appState.setParameters("loadingTimesheet", false);
    const prevMonthDate = monthDate.map((m) => {
      if (m.id === id) {
        appDate.setParameters("mount", m.id);
        return { ...m, select: true };
      } else {
        return { ...m, select: false };
      }
    });
    setMonthDate(prevMonthDate);
    const daysInMonth = new Date(appDate.year, id + 1, 0).getDate();
    appDate.setParameters("days_count", daysInMonth);
    setLoadMonth(true);
  };

  const createWorkCalendar = () => {
    const week = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let calendar = [];
    for (let i = 1; i <= appDate.days_count; i++) {
      let mm = appDate.mount + 1;
      let dd = i;
      if (mm < 10) {
        mm = `0${mm}`;
      }
      if (i < 10) {
        dd = `0${i}`;
      }

      const d = new Date(`${appDate.year}-${mm}-${dd}`);
      calendar = [
        ...calendar,
        { day: String(dd), dayWeek: week[d.getDay()], dayWeekID: d.getDay() },
      ];
    }
    let mount = appDate.mount + 1;
    if (mount < 10) {
      mount = `0${mount}`;
    }
    setWorkCalendar(calendar);
    apiRequest.getVisits(
      `${appDate.year}-${mount}-01`,
      `${appDate.year}-${mount}-${appDate.days_count}`
    );
  };

  useLayoutEffect(() => {
    if (appDate.mount === null) {
      selectedMonth(currentMonth);
    } else {
      selectedMonth(appDate.mount);
    }
    getActiveDate();
  }, []);

  useEffect(() => {
    getActiveDate();
    return () => getActiveDate;
  }, [appDate.year]);

  // useEffect(() => {}, [appDate.hover_day]);

  useEffect(() => {
    createWorkCalendar();
    setLoadMonth(false);
    return () => createWorkCalendar;
  }, [appDate.mount, loadMonth]);

  const getActiveDate = () => {
    if (currentYear === Number(appDate.year)) {
      setMonthDate((prevMonthDate) =>
        prevMonthDate.map((month) =>
          month.id > currentMonth
            ? { ...month, active: false }
            : { ...month, active: true }
        )
      );
    } else {
      setMonthDate(
        monthDate.map((month) => ({
          ...month,
          active: true,
          select: false,
        }))
      );
    }
  };

  return (
    <div className="tabel_container">
      <DateFilter selectedMonth={selectedMonth} monthDate={monthDate} />
      <div className="tabel_container_border name_visitor_row_list">
        {/* <Calendar /> */}
        <ListEmploeesVisit workCalendar={workCalendar} />
      </div>
    </div>
  );
});
