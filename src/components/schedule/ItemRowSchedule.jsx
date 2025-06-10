import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import iconEdit from "../../img/icon/edit.png";
import saveEdit from "../../img/icon/save.png";
import removeEdit from "../../img/icon/remove_red.png";
import apiRequest from "../../service/api/api.request";

export const ItemRowSchedule = observer((props) => {
  const typeSchedule = ["2/2", "5/2", "Без посещения"];
  const [edit, setEdit] = useState(false);
  const [start, setStart] = useState(props.s.start.replace(/:\d\d$/gm, ""));
  const [end, setEnd] = useState(props.s.end.replace(/:\d\d$/gm, ""));

  const [startHour, setStartHour] = useState(
    props.s.start.replace(/:\d\d:\d\d$/gm, "")
  );
  const [startMinute, setStartMinute] = useState(
    props.s.start.replace(/(^\d\d:)|(:\d\d$)/gm, "")
  );
  const [endHour, setEndHour] = useState(
    props.s.end.replace(/:\d\d:\d\d$/gm, "")
  );
  const [endMinute, setEndMinute] = useState(
    props.s.end.replace(/(^\d\d:)|(:\d\d$)/gm, "")
  );

  const [type, setType] = useState(props.s.schedule_type);

  const [name, setName] = useState(props.s.name);

  const changeStart = (e) => {
    setStart(e.target.value);
    setStartHour(Number(e.target.value.match(/^\d\d/)));
    setStartMinute(Number(e.target.value.match(/\d\d$/)));
  };

  const changeEnd = (e) => {
    setEnd(e.target.value);
    setEndHour(Number(e.target.value.match(/^\d\d/)));
    setEndMinute(Number(e.target.value.match(/\d\d$/)));
  };

  const removeSchedule = async () => {
    await apiRequest.removeScheduleApi(props.s.id);
   
  };

  const saeSchedule = async () => {
    const res = await apiRequest.updateSchedule(props.s.id, {
      name: name,
      scheduleType: type,
      startHour: startHour,
      startMinute: startMinute,
      endHour: endHour,
      endMinute: endMinute,
    });
    if (res) {
      setEdit(false);
    } else {
      alert("Не удалось обновить график");
    }
  };

  return (
    <li className="row_table_schedule">
      <span className="row_table_schedule_25">
        {!edit ? (
          <span>{name}</span>
        ) : (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inpt_time"
            type="text"
          />
        )}
      </span>
      {!edit ? (
        <span className="row_table_schedule_15">{props.s.schedule_type}</span>
      ) : (
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="select_type_schedule"
          style={{ maxWidth: "138px", marginRight: "15px" }}
        >
          <option defaultValue hidden>
            Выберите график
          </option>
          {typeSchedule.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )}

      <label className="row_table_schedule_25">
        с:
        {!edit ? (
          <span className="time_text_schedule"> {start}</span>
        ) : (
          <input
            value={start}
            onChange={changeStart}
            className="inpt_time"
            type="time"
          />
        )}
      </label>
      <label className="row_table_schedule_25">
        по:
        {!edit ? (
          <span className="time_text_schedule"> {end}</span>
        ) : (
          <input
            value={end}
            onChange={changeEnd}
            className="inpt_time"
            type="time"
          />
        )}
      </label>
      <label className="row_table_schedule_10">
        <img
          onClick={() => setEdit(!edit)}
          src={iconEdit}
          className="edit_icon"
          alt="Изменить"
        />
        {edit ? (
          <>
            <img
              onClick={saeSchedule}
              src={saveEdit}
              className="edit_icon"
              alt="Сохранить"
            />
          </>
        ) : (
          <img
            onClick={removeSchedule}
            src={removeEdit}
            className="edit_icon"
            alt="Удалить"
          />
        )}
      </label>
    </li>
  );
});
