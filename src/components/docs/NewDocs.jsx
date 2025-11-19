import React, { useState } from "react";
import BackFixModal from "../../ui/modal/BackFixModal";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";
import BtnVer1 from "../../ui/btn/BtnVer1";
import { observer } from "mobx-react-lite";
import apiRequest from "../../service/api/api.request";
import { useNavigate } from "react-router";

export const NewDocs = observer(({ setNewDocs, data }) => {
  const [dateDoc, setDateDoc] = useState(data ? data.visit_date : "");
  const [newDoc, setNewDoc] = useState({
    comment: "",
    doc_number: !data ? "" : data.doc_number,
    doc_type: "Заявление",
    end: "",
    service_number: !data ? "" : data.service_number,
    start: "",
  });

  const navigation = useNavigate();
  const [navBtn, setNavBtn] = useState([
    {
      name: "new",
      nameRu: "Добавить документ",
      style: "title_v2_active",
      active: data?.status === "valid" ? false : true,
    },
    {
      name: "list",
      nameRu: "Список документов",
      style: "title_v2_deactive",
      active: data?.status === "valid" ? true : false,
    },
  ]);

  const changeNav = (nav) => {
    setNavBtn(
      navBtn.map((itemNav) => {
        return {
          ...itemNav,
          active: nav.active === itemNav.active,
          style:
            nav.active === itemNav.active
              ? "title_v2_active"
              : "title_v2_deactive",
        };
      })
    );
  };

  const handleInputChange = (e) => {
    const empoeesID = appDate.employees.find(
      (em) => `${em.last_name} ${em.first_name}` === e.target.value
    );
    if (empoeesID) {
      setNewDoc({ ...newDoc, service_number: empoeesID.service_number });
    }
  };

  const sendNewDoc = async () => {
    if (dateDoc === "") return alert("Не выбрана дата заявления");
    if (newDoc.start === "") return alert("Не выбрано время начала заявления");
    if (newDoc.end === "") return alert("Не выбрано время окончания заявления");
    if (newDoc.service_number === "") return alert("Не выбран сотрудник");
    if (newDoc.service_number === null)
      return alert(
        "Сотруднику не присвоен табельный номер в данном приложение"
      );
    if (
      Number(newDoc.start.replace(/:/gm, "")) >=
      Number(newDoc.end.replace(/:/gm, ""))
    ) {
      return alert(
        "Дата начала заявления не может быть равной или больше даты окончания заявления"
      );
    }
    console.log(data);

    const res = await apiRequest.postDocument({
      comment: newDoc.comment !== "" ? newDoc.comment : null,
      doc_type: "Заявление",
      end: `${!data ? dateDoc : data.visit_date}T${newDoc.end}:00`,
      service_number: newDoc.service_number,
      start: `${!data ? dateDoc : data.visit_date}T${newDoc.start}:00`,
    });
    if (res) {
      const resVisits = await apiRequest.getVisitsID(data.id);
      if (resVisits) {
        data.setFuncEmploee({
          ...data.emploee,
          visits: data.emploee.visits.map((v) => {
            if (v.visit_date === data.visit_date) {
              v.status = resVisits.status;
            }
            return v;
          }),
        });
      }
      setNewDocs(false);
    }
  };

  const [name, setName] = useState("");

  const goToDocument = (doc) => {
    sessionStorage.setItem("autoFilterDoc", doc.doc_number);
    setTimeout(() => {
      navigation("/docs");
    }, 100);
  };

  if (appDate.employees !== null) {
    return (
      <BackFixModal funcClosed={setNewDocs}>
        {!data ? (
          <h2 className="title_v2">Добавить документ</h2>
        ) : data && data.status !== "valid" ? (
          <div className="docs_card_header">
            {navBtn.map((btn) => (
              <h2
                key={btn.name}
                onClick={() => changeNav(btn)}
                className={`title_v2 ${btn.style}`}
              >
                {btn.nameRu}
              </h2>
            ))}
          </div>
        ) : (
          <>
            <h2 className="title_v2">Список документов</h2>
          </>
        )}

        {!data ? (
          <InputBlockv1
            onInput={handleInputChange}
            setValue={setName}
            value={name}
            list="listEmploees"
            cls="px35"
            placeholder="Выберете сотрудника"
          />
        ) : (
          data.name
        )}

        {navBtn.find((btn) => btn.name === "new" && btn.active) ? (
          <>
            <datalist className="datalist" id="listEmploees">
              <option className="datalist" defaultValue hidden>
                Выберите сотрудника
              </option>
              {appDate.employees.map((s) => (
                <option
                  className="datalist"
                  value={`${s.last_name} ${s.first_name}`}
                  key={s.id}
                ></option>
              ))}
            </datalist>
            <textarea
              placeholder="В случае необходимости, можете указать комментарий"
              className="description_container"
              onChange={
                (e) => setNewDoc({ ...newDoc, comment: e.target.value })
                // appDate.setNewDocs("description", e.target.value)
              }
              value={newDoc.comment}
            ></textarea>
            <div className="flx_date_schedile_container">
              <div>
                <span className="schedile_type_inpt_new_text">
                  День заявления:{" "}
                </span>
                {!data ? (
                  <input
                    onChange={(e) => setDateDoc(e.target.value)}
                    className="schedile_type_inpt_new"
                    type="date"
                    value={dateDoc}
                  />
                ) : (
                  data.visit_date
                )}
              </div>
              <div className="flx_time_schedile_container">
                <div>
                  <span className="schedile_type_inpt_new_text">
                    Время начала:{" "}
                  </span>
                  <input
                    onChange={(e) =>
                      setNewDoc({ ...newDoc, start: e.target.value })
                    }
                    className="schedile_type_inpt_new"
                    type="time"
                    value={newDoc.start}
                  />
                </div>{" "}
                <div>
                  <span className="schedile_type_inpt_new_text">
                    Время окончание:{" "}
                  </span>
                  <input
                    onChange={(e) =>
                      setNewDoc({ ...newDoc, end: e.target.value })
                    }
                    className="schedile_type_inpt_new"
                    type="time"
                    value={newDoc.end}
                  />
                </div>
              </div>
            </div>
            <div className="btn_container_modal">
              <BtnVer1 name="Создать" onClick={sendNewDoc} />
              <BtnVer1 name="Закрыть" onClick={() => setNewDocs(false)} />
            </div>
          </>
        ) : (
          <></>
        )}
        {navBtn.find((btn) => btn.name === "list" && btn.active) ? (
          data ? (
            <div className="doc_template_a4_container">
              {data.documents.map((doc) => (
                <ul
                  className="doc_template_a4"
                  key={doc.doc_number}
                  onClick={() => goToDocument(doc)}
                >
                  <li className="doc_template_a4_type">{doc.doc_type}</li>
                  <li className="doc_template_a4_comment">
                    {doc.comment !== "" && doc.comment !== null
                      ? doc.comment
                      : "Комментарий отсутствует"}
                  </li>
                  <li className="doc_template_a4_date">
                    <span>{doc.start}</span>
                    <span>{doc.end}</span>
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </BackFixModal>
    );
  }
});
