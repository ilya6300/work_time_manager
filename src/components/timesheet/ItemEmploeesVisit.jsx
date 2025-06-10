import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import appDate from "../../service/state/app.date";
import BackFixModal from "../../ui/modal/BackFixModal";
import BtnVer1 from "../../ui/btn/BtnVer1";

export const ItemEmploeesVisit = observer((props) => {
  const [schedule, setSchedule] = useState(null);
  const [visibleModalDoc, setVisibleModalDoc] = useState(false);
  const [name, setName] = useState("");
  const [nameDoc, setNameDoc] = useState("");
  // const [date, setDate] = useState();
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [dataObj, setDataObj] = useState(null);

  const result = (r) => {
    if (r === "absent") {
      return "Отсутствовал(а)";
    }
    if (r === "left") {
      return "Ушёл(а) раньше";
    }
    if (r === "late") {
      return "Опоздал(а)";
    }
    if (r === "late_n_left") {
      return "Опоздал(а) и ушёл(а) раньше";
    }
  };

  const calcTimeStyle = (res) => {
    try {
      if (
        res.result === "valid" ||
        (!res.late && !res.left && res.result !== "absent")
      ) {
        const ok = "work_days_container_cell_ok";
        return ok;
      }
      if (
        res.result === "left" ||
        res.result === "late_n_left" ||
        res.result === "late"
      ) {
        const error = "work_days_container_cell_error";
        return error;
      }
    } catch (e) {
      //   console.error("calcTimeStyle", e);
    }
  };

  useEffect(() => {
    if (appDate.employees === null) return;
    const emploeesID = appDate.employees.find(
      (e) => e.id === props.v.employer_id
    );
    if (emploeesID) {
      const scheduleID = appDate.schedule.find(
        (s) => s.id === emploeesID.schedule_id
      );
      if (scheduleID) {
        setSchedule(scheduleID);
      }
    }
  }, [appDate.employees]);

  const uploadDoc = (d) => {
    setDataObj(d);
    setName(props.v.employer_fullname);
    appDate.setNewDocs("employer_id", props.v.employer_id);
    // setDate(new Date(d.date));
    const dd = new Date(d.date);
    setDateStart(
      `${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dd.getDate()).padStart(2, "0")}`
    );
    setDateEnd(
      `${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dd.getDate()).padStart(2, "0")}`
    );
    setVisibleModalDoc(true);
  };

  const refInptDoc = useRef(null);

  const selectDoc = (e) => {
    console.log(e.target.files[0].name);
    console.log(props.v);
    setNameDoc(e.target.files[0].name);
    appDate.setNewDocs("file", e.target.files[0]);
  };

  const calculationLateAndLeft = () => {
    console.log(
      "calculationLateAndLeft",
      timeStart >= schedule.start.replace(/.{3}$/, ""),
      timeStart,
      schedule.start.replace(/.{3}$/, "")
    );

    const visitID = props.v.visits.find((d) => d.date === dataObj.date);
    if (timeStart >= schedule.start.replace(/.{3}$/, "")) {
      visitID.late = false;
    }
    if (timeEnd >= schedule.end.replace(/.{3}$/, "")) {
      visitID.left = false;
    }
  };

  const createNewDocDay = async () => {
    console.log(dateStart, dateEnd, timeStart, timeEnd);
    if (dateStart === "") {
      return alert("Не выбрана дата начала");
    }
    if (dateEnd === "") {
      return alert("Не выбрана дата окончания");
    }
    if (timeStart === "") {
      return alert("Не выбрано время начала");
    }
    if (timeEnd === "") {
      return alert("Не выбрано время начала");
    }
    appDate.setNewDocs(
      "start",
      new Date(`${dateStart}, ${timeStart} UTC`).toISOString()
    );
    appDate.setNewDocs(
      "end",
      new Date(`${dateEnd}, ${timeEnd} UTC`).toISOString()
    );
    const createDoc = await appDate.createNewDoc();
    if (createDoc) {
      calculationLateAndLeft();
      console.log(createDoc, "createDoc");
      appDate.resetNewDocs();
      setVisibleModalDoc(false);
    }
  };

  return (
    <div className="name_visitor_row_container">
      {visibleModalDoc ? (
        <BackFixModal>
          <h2 className="title_v2">Добавить документ</h2>
          <li>Сотрудник: {name}</li>
          <li className="row_item_emploee_doc_modal">
            <span className="w130">Дата начала:</span>
            <input
              className="inpt_v1"
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
            />
            <span> время:</span>{" "}
            <input
              className="inpt_v1"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              type="time"
            />
          </li>
          <li className="row_item_emploee_doc_modal">
            <span className="w130">Дата окончания:</span>
            <input
              className="inpt_v1"
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
            <span> время:</span>{" "}
            <input
              className="inpt_v1"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              type="time"
            />
          </li>
          <li>
            <textarea
              placeholder="В случае необходимости, можете указать комментарий"
              className="description_container"
              onChange={(e) =>
                appDate.setNewDocs("description", e.target.value)
              }
            ></textarea>
            <li>
              <div>
                <div className="btn_upload_container">
                  <button
                    className="btn_upload"
                    onClick={() => refInptDoc.current.click()}
                  >
                    Файл
                  </button>
                </div>
                <span>{nameDoc}</span>
              </div>
            </li>
          </li>
          <div className="btn_container_modal">
            <BtnVer1 name="Создать" onClick={createNewDocDay} />
            <BtnVer1 name="Закрыть" onClick={() => setVisibleModalDoc(false)} />
          </div>
        </BackFixModal>
      ) : (
        <></>
      )}
      <input
        ref={refInptDoc}
        onChange={selectDoc}
        className="hidden"
        type="file"
      />
      <div className="name_visitor_row">
        <div>{props.v.employer_fullname}</div>
        <div>{schedule !== null ? schedule.name : "график не найден"}</div>
      </div>
      <div className="work_days_container">
        {props.v.visits.map((d) => (
          <div
            onClick={d.result !== "valid" ? () => uploadDoc(d) : null}
            className={[`work_days_container_cell ${calcTimeStyle(d)}`]}
            style={{
              width: `${100 / props.v.visits.length}%`,
            }}
            key={d.date}
            onMouseMove={() =>
              appDate.setParameters("hover_day", d.date.replace(/.{8}/gm, ""))
            }
            onMouseOut={() => appDate.setParameters("hover_day", "")}
          >
            <span>
              {d.arrival !== null ? d.arrival.replace(/.{3}$/, "") : ""}
            </span>
            <span>
              {d.departure !== null ? d.departure.replace(/.{3}$/, "") : ""}
            </span>
            <span className="work_days_container_cell_result">
              {result(d.result)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
