import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Input_v2 } from "../../ui/input/Input_v2";
import appDate from "../../service/state/app.date";
import { MyBtnCheckActive } from "../../ui/input/MyBtnCheckActive";
import saveEdit from "../../img/icon/save.png";

export const ItemUnknowEmploees = observer((props) => {
  const [emploees, setEmploees] = useState({
    lastName: props.e.last_name,
    firstName: props.e.first_name,
    secondName: props.e.second_name,
    schedule: "",
    mySupervisor: null,
    serviceNumber: "",
    isSupervisor: false,
    isActive: true,
    id: props.e.id,
  });

  const updateUnknow = (e, name) => {
    console.log(e);
    setEmploees({
      ...emploees,
      [name]: e,
    });
  };

  useEffect(() => {
    appDate.updateUnknowList(emploees, true);
  }, [
    emploees.isActive,
    emploees.lastName,
    emploees.firstName,
    emploees.secondName,
    emploees.schedule,
    emploees.mySupervisor,
    emploees.serviceNumber,
    emploees.isSupervisor,
  ]);

  return (
    <li className="row_table_employees">
      <label className="row_table_employees_name">
        <Input_v2
          value={emploees.lastName}
          onChange={(e) => updateUnknow(e.target.value, "lastName")}
          placeholder="Фамилия"
          type="text"
        />
        <Input_v2
          value={emploees.firstName}
          onChange={(e) => updateUnknow(e.target.value, "firstName")}
          placeholder="Имя"
          type="text"
        />
        <Input_v2
          value={emploees.secondName}
          onChange={(e) => updateUnknow(e.target.value, "secondName")}
          placeholder="Отчество"
          type="text"
        />
      </label>
      <select
        onChange={(e) => updateUnknow(e.target.value, "schedule")}
        className="select_v1"
        defaultValue={emploees.schedule}
      >
        <option defaultValue hidden>
          {emploees.schedule}
        </option>
        {appDate.schedule.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <select
        className="select_v1"
        defaultValue={emploees.mySupervisor}
        onChange={(e) => updateUnknow(e.target.value, "mySupervisor")}
      >
        <option defaultValue hidden>
          {emploees.mySupervisor}
        </option>
        <option value={null}>Не назначен</option>
        {appDate.supervisor.map((s) => (
          <option key={s.id} value={s.id}>
            {s.last_name} {s.first_name}
          </option>
        ))}
      </select>
      <Input_v2
        value={emploees.serviceNumber}
        onChange={(e) => updateUnknow(e.target.value, "serviceNumber")}
        placeholder="Табель-номер"
        type="text"
      />
      <label className="row_table_employees_active">
        <MyBtnCheckActive
          active={emploees.isSupervisor}
          onClick={(e) => updateUnknow(!emploees.isSupervisor, "isSupervisor")}
        />
      </label>
      <label className="row_table_employees_active">
        <MyBtnCheckActive
          active={emploees.isActive}
          onClick={(e) => updateUnknow(!emploees.isActive, "isActive")}
        />
      </label>
      <label className="row_table_employees_tools">
        <img
          onClick={() => props.saveItem(props.e)}
          src={saveEdit}
          className="edit_icon"
          alt="Удалить"
        />
      </label>
    </li>
  );
});
