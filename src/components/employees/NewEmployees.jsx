import React, { useLayoutEffect, useState } from "react";
import BackFixModal from "../../ui/modal/BackFixModal";
import { Input_v1 } from "../../ui/input/Input_v1";
import appDate from "../../service/state/app.date";
import BtnVer1 from "../../ui/btn/BtnVer1";
import { MyBtnCheckActive } from "../../ui/input/MyBtnCheckActive";
import apiRequest from "../../service/api/api.request";

export const NewEmployees = ({ setNewEmploees }) => {
  const [supervisor, setSupervisor] = useState(false);
  const [arhive, setArhive] = useState(false);

  const getTimeZone = () => {
    try {
      // Проверяем поддержку Intl API
      if (Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone) {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      return "UTC";
    } catch (e) {
      return "UTC";
    }
  };

  useLayoutEffect(() => {
    setNewEmploeeys({
      ...newEmploeesObj,
      time_zone: getTimeZone(),
    });
  }, []);

  const [newEmploeesObj, setNewEmploeeys] = useState({
    first_name: "",
    second_name: "",
    last_name: "",
    schedule_id: 0,
    supervisor_id: null,
    is_supervisor: supervisor,
    is_archived: arhive,
    time_zone: "Europe/Moscow",
  });

  const updatesupervisor = () => {
    setNewEmploeeys({ ...newEmploeesObj, is_supervisor: !supervisor });
    setSupervisor(!supervisor);
  };

  const updateArhive = () => {
    setNewEmploeeys({ ...newEmploeesObj, is_archived: !arhive });
    setArhive(!arhive);
  };

  const createNewEmployees = async () => {
    if (newEmploeesObj.first_name === "" || !newEmploeesObj.first_name) {
      return alert("Не указано имя сотрудника");
    }
    if (newEmploeesObj.last_name === "" || !newEmploeesObj.last_name) {
      return alert("Не указана фамилия сотрудника");
    }
    if (newEmploeesObj.second_name === "" || !newEmploeesObj.second_name) {
      setNewEmploeeys({ ...newEmploeesObj, second_name: "" });
    }
    if (newEmploeesObj.supervisor_id === undefined) {
      setNewEmploeeys({ ...newEmploeesObj, supervisor_id: null });
    }
    if (!newEmploeesObj.schedule_id) {
      return alert("Не выбран график");
    }
    const res = await apiRequest.postEmployeesID(newEmploeesObj);
    if (res) {
      setNewEmploees(false);
    }
  };
  return (
    <BackFixModal funcClosed={setNewEmploees}>
      <h2 className="title_v2">Создание нового расписания сотрудника</h2>
      <Input_v1
        title="Имя"
        placeholder="Иван"
        onChange={(e) =>
          setNewEmploeeys({ ...newEmploeesObj, first_name: e.target.value })
        }
        value={newEmploeesObj.first_name}
      />
      <Input_v1
        title="Отчество (не обязательно)"
        placeholder="Иванович"
        onChange={(e) =>
          setNewEmploeeys({ ...newEmploeesObj, second_name: e.target.value })
        }
        value={newEmploeesObj.second_name}
      />
      <Input_v1
        title="Фамилия"
        placeholder="Иванов"
        onChange={(e) =>
          setNewEmploeeys({ ...newEmploeesObj, last_name: e.target.value })
        }
        value={newEmploeesObj.last_name}
      />
      <select
        onChange={(e) => {
          setNewEmploeeys({
            ...newEmploeesObj,
            schedule_id: Number(e.target.value),
          });
        }}
        className="select_type_schedule"
      >
        <option defaultValue hidden>
          Выберите график
        </option>
        {appDate.schedule.map((s) => (
          <option value={s.id} key={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => {
          setNewEmploeeys({
            ...newEmploeesObj,
            supervisor_id: Number(e.target.value),
          });
        }}
        className="select_type_schedule"
      >
        <option defaultValue hidden>
          Выберите руководителя
        </option>
        {appDate.supervisor.map((s) => (
          <option value={s.id} key={s.id}>
            {s.last_name} {s.first_name}
          </option>
        ))}
      </select>
      <label className="flx_bw">
        <span style={{ width: "353px" }}>Является руководителем</span>
        <MyBtnCheckActive active={supervisor} onClick={updatesupervisor} />
      </label>
      <label className="flx_bw">
        <span style={{ width: "353px" }}>Архивный</span>
        <MyBtnCheckActive active={arhive} onClick={updateArhive} />
      </label>
      <div className="btn_container_modal">
        <BtnVer1 name="Создать" onClick={createNewEmployees} />
        <BtnVer1 name="Закрыть" onClick={() => setNewEmploees(false)} />
      </div>
    </BackFixModal>
  );
};
