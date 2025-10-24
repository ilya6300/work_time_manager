import React, { useState } from "react";
import { MyBtnCheckActive } from "../../ui/input/MyBtnCheckActive";
import appDate from "../../service/state/app.date";
import { observer } from "mobx-react-lite";
import iconEdit from "../../img/icon/edit.png";
import saveEdit from "../../img/icon/save.png";
import removeEdit from "../../img/icon/remove_red.png";
import { Input_v2 } from "../../ui/input/Input_v2";
import apiRequest from "../../service/api/api.request";

export const ItemRowEmployees = observer((props) => {
  const [mySupervisor, setMySupervisor] = useState(
    props.e.supervisor !== null
      ? `${props.e.supervisor.last_name} ${props.e.supervisor.first_name}`
      : "Не назначен"
  );
  const [schedule, setSchedule] = useState(props.e.schedule.name);
  const [edit, setEdit] = useState(false);

  const [isSupervisor, setIsSuervisor] = useState(props.e.is_supervisor);
  const [isActive, setIsActive] = useState(props.e.is_archived);

  const [firstName, setFirstName] = useState(props.e.first_name);
  const [secondName, setSecondName] = useState(props.e.second_name);
  const [lastName, setLastName] = useState(props.e.last_name);
  const [serviceNumber, setServiceNumber] = useState(
    props.e.service_number !== null ? props.e.service_number : "Не назначен"
  );

  const [updateDate, setUpdateDate] = useState({});

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    setUpdateDate({ ...updateDate, first_name: e.target.value });
  };

  const updateSecondName = (e) => {
    setSecondName(e.target.value);
    setUpdateDate({ ...updateDate, second_name: e.target.value });
  };

  const updateServiceNumber = (e) => {
    setServiceNumber(e.target.value);
    setUpdateDate({ ...updateDate, service_number: e.target.value });
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
    setUpdateDate({ ...updateDate, last_name: e.target.value });
  };

  const updateIsSupervisor = async () => {
    setIsSuervisor(!isSupervisor);
    await apiRequest.updateEmployeesID(props.e.id, {
      is_supervisor: !isSupervisor,
    });
    setUpdateDate({ ...updateDate, is_supervisor: !isSupervisor });
  };

  const updateMySupervisor = (e) => {
    setMySupervisor(JSON.parse(e.target.value).name);
    if (Number(JSON.parse(e.target.value).id) !== 999999) {
      setUpdateDate({
        ...updateDate,
        supervisor_id: JSON.parse(e.target.value).id,
      });
    } else {
      setUpdateDate({ ...updateDate, supervisor_id: null });
    }
  };

  const updateMySchedule = (e) => {
    setSchedule(JSON.parse(e.target.value).name);
    setUpdateDate({
      ...updateDate,
      schedule_id: JSON.parse(e.target.value).id,
    });
  };

  const updateArchived = async () => {
    setIsActive(!isActive);
    await apiRequest.updateEmployeesID(props.e.id, { is_archived: !isActive });
    setUpdateDate({ ...updateDate, is_archived: !isActive });
  };

  const saveEmplyess = async () => {
    const res = await apiRequest.updateEmployeesID(props.e.id, updateDate);
    if (res) {
      setEdit(false);
    }
  };

  return (
    <li className="row_table_employees">
      <label className="row_table_employees_name">
        <span>
          {!edit ? (
            lastName
          ) : (
            <Input_v2
              value={lastName}
              onChange={updateLastName}
              placeholder="Фамилия"
              type="text"
            />
          )}
        </span>
        <span>
          {!edit ? (
            firstName
          ) : (
            <Input_v2
              value={firstName}
              onChange={updateFirstName}
              placeholder="Имя"
              type="text"
            />
          )}
        </span>
        <span>
          {!edit ? (
            secondName
          ) : (
            <Input_v2
              value={secondName}
              onChange={updateSecondName}
              placeholder="Отчество"
              type="text"
            />
          )}
        </span>
      </label>
      <span className="row_table_employees_schedule">
        {!edit ? (
          schedule
        ) : (
          <select
            onChange={updateMySchedule}
            className="select_v1"
            defaultValue={schedule}
          >
            <option defaultValue hidden>
              {schedule}
            </option>
            {appDate.schedule.map((s) => (
              <option key={s.id} value={JSON.stringify(s)}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </span>
      <span className="row_table_employees_my_schedule">
        {!edit ? (
          mySupervisor
        ) : (
          <select
            className="select_v1"
            defaultValue={mySupervisor}
            onChange={updateMySupervisor}
          >
            <option defaultValue hidden>
              {mySupervisor}
            </option>
            <option value={JSON.stringify({ id: 999999, name: "Не назначен" })}>
              Не назначен
            </option>
            {appDate.supervisor.map((s) => (
              <option
                key={s.id}
                value={JSON.stringify({
                  id: s.id,
                  name: `${s.last_name} ${s.first_name}`,
                })}
              >
                {s.last_name} {s.first_name}
              </option>
            ))}
          </select>
        )}
      </span>
      <span
        className="row_table_employees_schedule"
        style={{ color: serviceNumber === "Не назначен" ? "red" : "" }}
      >
        {!edit ? (
          serviceNumber
        ) : (
          <Input_v2
            value={serviceNumber}
            onChange={updateServiceNumber}
            placeholder="Табель-номер"
            type="text"
          />
        )}
      </span>
      <label className="row_table_employees_active">
        <MyBtnCheckActive active={isSupervisor} onClick={updateIsSupervisor} />
      </label>
      <label className="row_table_employees_active">
        <MyBtnCheckActive active={!isActive} onClick={updateArchived} />
      </label>
      <label className="row_table_employees_tools">
        <img
          onClick={() => setEdit(!edit)}
          src={iconEdit}
          className="edit_icon"
          alt="Изменить"
        />
        {edit ? (
          <>
            <img
              onClick={saveEmplyess}
              src={saveEdit}
              className="edit_icon"
              alt="Сохранить"
            />
          </>
        ) : (
          <img
            onClick={() => props.removeSchedule(props.e)}
            src={removeEdit}
            className="edit_icon"
            alt="Удалить"
          />
        )}
      </label>
    </li>
  );
});
