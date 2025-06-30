import React, { useRef, useState } from "react";
import BackFixModal from "../../ui/modal/BackFixModal";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import appDate from "../../service/state/app.date";
import BtnVer1 from "../../ui/btn/BtnVer1";
import { observer } from "mobx-react-lite";
import apiRequest from "../../service/api/api.request";

export const NewDocs = observer(({ setNewDocs }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const changeStartDate = (e) => {
    setStartDate(e.target.value);
    appDate.setNewDocs(
      "start",
      new Date(`${e.target.value.replace(/T/, "\b")} UTC`).toISOString()
    );
  };
  const changeEndDate = (e) => {
    setEndDate(e.target.value);
    appDate.setNewDocs(
      "end",
      new Date(`${e.target.value.replace(/T/, "\b")} UTC`).toISOString()
    );
  };

  const handleInputChange = (e) => {
    const empoeesID = appDate.employees.find(
      (em) => `${em.last_name} ${em.first_name}` === e.target.value
    );
    if (empoeesID) {
      console.log("Выбрано:", e.target.value, empoeesID);
      // setNewDoc({ ...newDoc, employer_id: empoeesID.id });
      appDate.setNewDocs("employer_id", empoeesID.id);
    }
  };

  const refFileImport = useRef(null);

  const handlerFile = (e) => {
    console.log(e.target.files[0]);
    const type = e.target.files[0].type;
    if (
      !type.match(/png/) &&
      !type.match(/jpg/) &&
      !type.match(/jpeg/) &&
      !type.match(/pdf/) &&
      !type.match(/word/)
    ) {
      return alert(
        `Выбран не верный формат документа. \n\nРазрешённые изображения: png, jpg, jpeg\n\nРазрешённые текстовые: pdf или документы ms word`
      );
    }
    setNameDoc(e.target.files[0].name);
    appDate.setNewDocs("file", e.target.files[0]);
  };

  const sendNewDoc = async () => {
    const res = await appDate.createNewDoc();
    if (res) {
      setNewDocs(false);
    }
  };

  const [name, setName] = useState("");
  const [nameDoc, setNameDoc] = useState("");

  if (appDate.employees !== null) {
    return (
      <BackFixModal funcClosed={setNewDocs}>
        <h2 className="title_v2">Добавить документ</h2>
        <InputBlockv1
          onInput={handleInputChange}
          setValue={setName}
          value={name}
          list="listEmploees"
          cls="px35"
          placeholder="Выберете сотрудника"
        />
        <datalist className="datalist" id="listEmploees">
          <option defaultValue hidden>
            Выберите сотрудника
          </option>
          {appDate.employees.map((s) => (
            <option
              onChange={(e) => console.log(e)}
              value={`${s.last_name} ${s.first_name}`}
              key={s.id}
            ></option>
          ))}
        </datalist>
        <textarea
          placeholder="В случае необходимости, можете указать комментарий"
          className="description_container"
          onChange={(e) =>
            // setNewDoc({ ...newDoc, description: e.target.value })
            appDate.setNewDocs("description", e.target.value)
          }
        ></textarea>
        <div>
          <span className="schedile_type_inpt_new_text">Начало смены: </span>
          <input
            onChange={changeStartDate}
            className="schedile_type_inpt_new"
            type="datetime-local"
            value={startDate}
          />
        </div>
        <div>
          <span className="schedile_type_inpt_new_text">Окончание смены: </span>
          <input
            onChange={changeEndDate}
            className="schedile_type_inpt_new"
            type="datetime-local"
            value={endDate}
          />
        </div>
        <input
          onChange={handlerFile}
          ref={refFileImport}
          className="hidden"
          type="file"
        />
        <div>
          {" "}
          <div className="btn_upload_container">
            <button
              className="btn_upload"
              onClick={() => refFileImport.current.click()}
            >
              Файл
            </button>
          </div>
          <span>{nameDoc}</span>
        </div>

        <div className="btn_container_modal">
          <BtnVer1 name="Создать" onClick={sendNewDoc} />
          <BtnVer1 name="Закрыть" onClick={() => setNewDocs(false)} />
        </div>
      </BackFixModal>
    );
  }
});
