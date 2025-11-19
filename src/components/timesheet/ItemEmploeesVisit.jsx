import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import appDate from "../../service/state/app.date";
import { NewDocs } from "../docs/NewDocs";
import iconDocumentWhite from "../../img/icon/document_white.png";
import { useNavigate } from "react-router";

export const ItemEmploeesVisit = observer((props) => {
  const [visibleModalDoc, setVisibleModalDoc] = useState(false);
  const [emploeeObj, setEmploeeObj] = useState(props.v);
  const [dataObj, setDataObj] = useState(null);
  const navigation = useNavigate();

  const result = (r) => {
    if (r.status === "absent") {
      const td = new Date();
      const fd = new Date(r.visit_date);
      if (fd.getTime() + 1000 * 60 * 60 * 24 >= td.getTime()) {
        const ok = "";
        return ok;
      }
      if (emploeeObj.schedule.schedule_type === "5/2") {
        return "Отсутствовал(а)";
      }
    }
    if (r.status === "left") {
      return "Ушёл(а) раньше";
    }
    if (r.status === "late") {
      return "Опоздал(а)";
    }
    if (r.status === "late_n_left") {
      return "Опоздал(а) и ушёл(а) раньше";
    }
    if (r.status === "incomplete_information") {
      return "Нет отметки на выходе или входе";
    }
  };

  const calcTimeStyle = (res) => {
    try {
      if (res.status === "valid") {
        const ok = "work_days_container_cell_ok";
        return ok;
      }
      if (
        res.status === "left" ||
        res.status === "late_n_left" ||
        res.status === "late"
      ) {
        const error = "work_days_container_cell_error";
        return error;
      }
      if (res.status === "weekend") {
        const ok = "work_days_container_cell_weekend";
        return ok;
      }
      if (res.status === "") {
        const ok = "work_days_container_cell_undefind";
        return ok;
      }
      if (res.status === "incomplete_information") {
        const ok = "work_days_container_cell_incomplete_information";
        return ok;
      }
      if (res.status === "absent") {
        const td = new Date();
        const fd = new Date(res.visit_date);
        if (fd.getTime() + 1000 * 60 * 60 * 24 >= td.getTime()) {
          const ok = "work_days_container_cell_undefind";
          return ok;
        }
        if (emploeeObj.schedule.schedule_type === "5/2") {
          const error = "work_days_container_cell_error";
          return error;
        }
        if (emploeeObj.schedule.schedule_type === "2/2") {
          const ok = "work_days_container_cell_undefind";
          return ok;
        }
      }
    } catch (e) {
      console.error("calcTimeStyle", e);
    }
  };

  const uploadDoc = (d) => {
    if (!emploeeObj.service_number || emploeeObj.service_number === "")
      return alert(
        `У ${emploeeObj.last_name} ${emploeeObj.first_name} не заполнен табель-номер, добавить заявление сотруднику невозможно. Измените или присвойте табель-номер.`
      );
    let data = d;
    data.name = `${emploeeObj.last_name} ${emploeeObj.first_name} ${emploeeObj.second_name}`;
    data.comment = "";
    data.service_number = emploeeObj.service_number;
    data.setFuncEmploee = setEmploeeObj;
    data.emploee = emploeeObj;
    setDataObj(data);
    setVisibleModalDoc(true);
  };

  const goToEmploee = () => {
    sessionStorage.setItem(
      "autoFilterEmploee",
      `${props.v.last_name} ${props.v.first_name} ${props.v.second_name}`
    );
    return navigation("/employees");
  };

  return (
    <div className="name_visitor_row_container">
      {visibleModalDoc ? (
        <NewDocs setNewDocs={setVisibleModalDoc} data={dataObj} />
      ) : (
        <></>
      )}
      <div onClick={goToEmploee} className="name_visitor_row">
        <div>{`${emploeeObj.last_name} ${emploeeObj.first_name} ${emploeeObj.second_name}`}</div>
        <div>
          {emploeeObj.schedule.name !== null
            ? emploeeObj.schedule.name
            : "график не найден"}
        </div>
      </div>
      <div className="work_days_container">
        {emploeeObj.visits.map((d) => (
          <div
            onClick={
              d.status !== "valid" || d.documents?.length !== 0
                ? () => uploadDoc(d)
                : null
            }
            className={[`work_days_container_cell ${calcTimeStyle(d)}`]}
            style={{
              width: `${100 / emploeeObj.visits.length}%`,
            }}
            key={d.visit_date}
            onMouseMove={() =>
              appDate.setParameters(
                "hover_day",
                d.visit_date.replace(/.{8}/gm, "")
              )
            }
            onMouseOut={() => appDate.setParameters("hover_day", "")}
          >
            <span>
              {d.start_visit !== null ? d.start_visit.replace(/.{3}$/, "") : ""}
            </span>
            <span>
              {d.end_visit !== null ? d.end_visit.replace(/.{3}$/, "") : ""}
            </span>
            {d.documents &&
            d.documents.length === 0 &&
            d.status !== "" &&
            d.status !== null ? (
              <span className="work_days_container_cell_result">
                {result(d)}
              </span>
            ) : d?.documents?.length !== 0 &&
              d.status !== "" &&
              d.status !== null ? (
              <div className="work_days_container_cell_doc_icon_container">
                <img
                  className="work_days_container_cell_doc_icon"
                  src={iconDocumentWhite}
                  alt="документ"
                />
                <ul className="work_days_container_cell_result">
                  <li>
                    Статус:{" "}
                    {result(d) !== "" && result(d) ? result(d) : "Учтено"}
                  </li>
                  <br />
                  <li>Документы:</li>
                  <br />
                  {d?.documents?.map((img) => (
                    <ul
                      key={img.doc_number}
                      // className="work_days_container_cell_result"
                    >
                      <li>{result(d)}</li>
                      <li>{img.doc_type}</li>
                      <li> - {img.doc_number}</li>
                      <li> - {img.start}</li>
                      <li> - {img.end}</li>
                      <li>
                        {" "}
                        {img.comment ? "-" : ""} {img.comment}
                      </li>
                      <br />
                    </ul>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
