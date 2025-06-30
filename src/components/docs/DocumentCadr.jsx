import React, { useRef, useState } from "react";
import BtnVer1 from "../../ui/btn/BtnVer1";
import BackFixModal from "../../ui/modal/BackFixModal";
import apiRequest from "../../service/api/api.request";
import iconEdit from "../../img/icon/edit.png";
import InputBlockv1 from "../../ui/input/InputBlockv1";
import { RemoveBtn } from "../../ui/btn/RemoveBtn";

export const DocumentCadr = ({
  docObj,
  downloadDoc,
  setModalCard,
  downloadFlag,
}) => {
  const [doc, setDoc] = useState({
    emploee_name: docObj.emploee_name,
    description: docObj.description,
    start: docObj.start,
    end: docObj.end,
  });

  const [updateDoc, setUpdateDoc] = useState({});

  const updateDiscription = (e) => {
    setDoc({ ...doc, description: e.target.value });
    setUpdateDoc({ ...updateDoc, description: e.target.value });
  };

  const updateStart = (e) => {
    setDoc({ ...doc, start: e.target.value });
    setUpdateDoc({
      ...updateDoc,
      start: new Date(`${e.target.value.replace(/T/, "\b")} UTC`).toISOString(),
    });
  };

  const updateEnd = (e) => {
    setDoc({ ...doc, end: e.target.value });
    setUpdateDoc({
      ...updateDoc,
      end: new Date(`${e.target.value.replace(/T/, "\b")} UTC`).toISOString(),
    });
  };

  const refFileImport = useRef(null);
  const [nameDoc, setNameDoc] = useState("");
  const [edit, setEdit] = useState(false);

  const updateFile = async (file) => {
    console.log(docObj);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_id", docObj.id);
    await apiRequest.updateDocumentFile(formData);
  };

  const updateDocID = async (obj) => {
    console.log(docObj);
    try {
      await apiRequest.updateDocumentNoFile(obj, docObj.id);
    } catch (e) {
      console.error(e);
    }
  };

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
    updateFile(e.target.files[0]);
  };

  const saveDoc = () => {
    console.log(docObj);
    updateDocID(updateDoc);
  };

  const removeDoc = async () => {
    console.log(docObj);
    const res = apiRequest.removeDoc(docObj.id);
    if (res) {
      setModalCard(false);
      await apiRequest.getDocuments();
    } else {
      alert("Не удалось удалить документ");
    }
  };

  return (
    <BackFixModal funcClosed={setModalCard}>
      <div className="modal_doccard_header">
        <h2 className="title_v2">Документ</h2>
        <div className="modal_doccard_header_btn_container">
          {edit ? (
            <BtnVer1 onClick={saveDoc} name="Записать изменения" />
          ) : (
            <></>
          )}

          <img
            onClick={() => setEdit(!edit)}
            src={iconEdit}
            className="edit_icon"
            alt="Изменить"
            style={{ width: "29px", height: "29px" }}
          />
        </div>
      </div>

      <p>{doc.emploee_name}</p>
      {!edit ? (
        <>
          <p>Комментарий: {doc.description}</p>
          <p>
            <span>
              Действия документа с {new Date(docObj.start).toLocaleDateString()}{" "}
              {new Date(docObj.start)
                .toLocaleTimeString()
                .replace(/:\d\d$/, "")}{" "}
            </span>
            <span>
              по {new Date(docObj.end).toLocaleDateString()}{" "}
              {new Date(docObj.start)
                .toLocaleTimeString()
                .replace(/:\d\d$/, "")}
            </span>
          </p>
        </>
      ) : (
        <>
          <div>
            Комментарий:{" "}
            <InputBlockv1
              value={doc.description}
              onChange={updateDiscription}
              placeholder="Необезательное поле"
            />
          </div>
          <div>
            <span className="schedile_type_inpt_new_text">Начало: </span>
            <input
              onChange={updateStart}
              className="schedile_type_inpt_new"
              type="datetime-local"
              value={doc.start}
            />
            <span> Если требуется изменить</span>
          </div>
          <div>
            <span className="schedile_type_inpt_new_text">Окончание: </span>
            <input
              onChange={updateEnd}
              className="schedile_type_inpt_new"
              type="datetime-local"
              value={doc.end}
            />
            <span> Если требуется изменить</span>
          </div>
        </>
      )}
      <div className="posi_abs_left_bottom">
        <RemoveBtn name="Удалить" onClick={removeDoc} />
      </div>
      <div className="btn_container_modal">
        {downloadFlag ? (
          <BtnVer1 name="Скачать" onClick={downloadDoc} />
        ) : (
          <label className="flx_bw_center">
            <span className="btn_container_modal_text_no_file">
              Файл к документу не прикреплён
            </span>{" "}
            <input
              onChange={handlerFile}
              ref={refFileImport}
              className="hidden"
              type="file"
            />
            {edit ? (
              <div>
                <div className="btn_upload_container">
                  <button
                    className="btn_upload"
                    onClick={() => refFileImport.current.click()}
                  >
                    Выбрать файл
                  </button>
                </div>
                <span>{nameDoc}</span>
              </div>
            ) : (
              <></>
            )}
          </label>
        )}
        <BtnVer1
          style={{ height: "34px" }}
          name="Закрыть"
          onClick={() => setModalCard(false)}
        />
      </div>
    </BackFixModal>
  );
};
