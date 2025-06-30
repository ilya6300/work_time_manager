import React, { useMemo } from "react";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";
import { observer } from "mobx-react-lite";

export const FilterEmployess = observer(() => {
  useMemo(() => {
    appDate.filterNameEmployess("employees");
    return () => appDate.filterName;
  }, [
    appDate.filter_value_employees_id_supervisor,
    appDate.filter_value_employees_name,
  ]);

  return (
    <div className="filter_bar_employees" style={{ width: "none" }}>
      <span>Руководитель: </span>
      <select
        onChange={(e) =>
          appDate.setParameters(
            "filter_value_employees_id_supervisor",
            Number(e.target.value)
          )
        }
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
        value={appDate.filter_value_employees_name}
        onChange={(e) =>
          appDate.setParameters("filter_value_employees_name", e.target.value)
        }
        placeholder="Поиск по имени и фамилии"
        cls="h30px"
      />
    </div>
  );
});
