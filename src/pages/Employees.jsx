import React, { useEffect, useMemo, useState } from "react";
import apiRequest from "../service/api/api.request";
import appDate from "../service/state/app.date";
import { ListTableEmployees } from "../components/employees/ListTableEmployees";
import { observer } from "mobx-react-lite";

export const Employees = observer(() => {
  const [filterValue, setFilterValue] = useState("");
  const [supervisorSelect, setSuervisorSelect] = useState(99999);

  const getList = async () => {
    await apiRequest.getEmpoyeesList();
  };

  useEffect(() => {
    getList();
  }, []);



  const removeSchedule = async (e) => {
    console.log(e);
  };

  if (appDate.employees === null) {
    return <div>Загружаю сотрудников</div>;
  }
  if (appDate.employees !== null) {
    return (
      <div className="employees_container">
        <ListTableEmployees
          removeSchedule={removeSchedule}
        />
      </div>
    );
  }
  if (!appDate.employees || appDate.employees.length === 0) {
    return <div>Сотрудники не найдены</div>;
  }
});
