import React, { useState } from "react";
import BackFixModal from "../../ui/modal/BackFixModal";
import { Input_v1 } from "../../ui/input/Input_v1";
import BtnVer1 from "../../ui/btn/BtnVer1";
import apiRequest from "../../service/api/api.request";

const NewSchedule = ({ setNewSchedule }) => {
  const typeSchedule = ["2/2", "5/2", "Без посещения"];
  const [message, setMessage] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const [newScheduleObj, setNewScheduleObj] = useState({
    name: "",
    startHour: "",
    startMinute: "",
    endHour: "",
    endMinute: "",
    scheduleType: "",
  });

  const createTypeSchedule = async () => {
    if (newScheduleObj.name === "") {
      return setMessage("Наименование не заполнено");
    }
    if (newScheduleObj.startHour === "") {
      return setMessage("Время начала графика не заполнено");
    }
    if (newScheduleObj.endMinute === "") {
      return setMessage("Время окончания графика не заполнено");
    }
    if (newScheduleObj.scheduleType === "") {
      return setMessage("Тип графика не выбран");
    }
    const res = await apiRequest.postTypeSchedule(newScheduleObj);
    if (res) {
      setNewSchedule(false);
      setMessage("");
    } else {
      setMessage("Не удалось сохранить график");
    }
  };

  const startTime = (e) => {
    const value = e.target.value;
    setTimeStart(value);
    setNewScheduleObj({
      ...newScheduleObj,
      startHour: String(value.match(/^\d\d/)),
      startMinute: String(value.match(/\d\d$/)),
    });
  };

  const endTime = (e) => {
    const value = e.target.value;
    setTimeEnd(value);
    setNewScheduleObj({
      ...newScheduleObj,
      endHour: String(value.match(/^\d\d/)),
      endMinute: String(value.match(/\d\d$/)),
    });
  };

  return (
    <BackFixModal>
      <h2 className="title_v2">Создание нового расписания сотрудника</h2>
      <Input_v1
        title="Наименование графика (должно быть уникальным)"
        placeholder="Пример: 5/2 с 8:30"
        onChange={(e) =>
          setNewScheduleObj({ ...newScheduleObj, name: e.target.value })
        }
        value={newScheduleObj.name}
      />
      <select
        onChange={(e) => {
          setNewScheduleObj({
            ...newScheduleObj,
            scheduleType: e.target.value,
          });
        }}
        className="select_type_schedule"
      >
        <option defaultValue hidden>
          Выберите график
        </option>
        {typeSchedule.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <div>
        <span className="schedile_type_inpt_new_text">Начало смены: </span>
        <input
          onChange={startTime}
          className="schedile_type_inpt_new"
          type="time"
          value={timeStart}
        />
      </div>
      <div>
        <span className="schedile_type_inpt_new_text">Окончание смены: </span>
        <input
          onChange={endTime}
          className="schedile_type_inpt_new"
          type="time"
          value={timeEnd}
        />
      </div>
      <div className="btn_container_modal">
        <BtnVer1 name="Создать" onClick={createTypeSchedule} />
        <BtnVer1 name="Закрыть" onClick={() => setNewSchedule(false)} />
      </div>
      <p className="error">{message}</p>
    </BackFixModal>
  );
};

export default NewSchedule;
