import React, { useEffect, useState } from "react";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";
import { observer } from "mobx-react-lite";
import apiRequest from "../../service/api/api.request";

export const FilterEmployess = observer(() => {
  const [valueName, setValueName] = useState(
    sessionStorage.getItem("autoFilterEmploee")
      ? sessionStorage.getItem("autoFilterEmploee")
      : ""
  );
  const [supervisorID, setSupervisorID] = useState(99999);

  const getEmployees = async () => {
    if (valueName.length < 3 && supervisorID === 99999) {
      appDate.setParameters(
        "employees",
        await apiRequest.getEmpoyeesList(false)
      );
    } else {
      appDate.setParameters(
        "employees",
        await apiRequest.getEmpoyeesList(
          false,
          valueName.length >= 3 ? valueName : undefined,
          supervisorID !== 99999 && supervisorID ? supervisorID : undefined
        )
      );
    }
    setTimeout(() => {
      sessionStorage.removeItem("autoFilterEmploee");
    }, 1000);
  };

  useEffect(() => {
    getEmployees();
  }, [valueName, supervisorID]);

  return (
    <div className="filter_bar_employees" style={{ width: "none" }}>
      <span>Руководитель: </span>
      <select
        onChange={(e) => setSupervisorID(Number(e.target.value))}
        className="select_type_schedule"
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
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
        placeholder="Поиск по имени и фамилии"
        cls="h30px"
      />
    </div>
  );
});
