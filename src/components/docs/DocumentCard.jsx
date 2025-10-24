// import React, { useRef, useState } from "react";
import BtnVer1 from "../../ui/btn/BtnVer1";
import BackFixModal from "../../ui/modal/BackFixModal";
import apiRequest from "../../service/api/api.request";
import { RemoveBtn } from "../../ui/btn/RemoveBtn";

export const DocumentCard = ({ docObj, setModalCard }) => {
  const removeDoc = async () => {
    const res = await apiRequest.removeDoc(docObj.doc_number);
    if (res) {
      await apiRequest.getDocuments();
      setModalCard(false);
    } else {
      alert("Не удалось удалить документ");
    }
  };

  return (
    <BackFixModal funcClosed={setModalCard}>
      <div className="modal_doccard_header">
        <h2 className="title_v2">Документ</h2>
      </div>
      <ul className="docs_card_container">
        <li className="docs_card_row">
          ФИО:{" "}
          <span className="docs_card_blk_text">
            {docObj.employer.last_name} {docObj.employer.first_name}{" "}
            {docObj.employer.second_name}
          </span>
        </li>
        <li className="docs_card_row">
          Тип документа:{" "}
          <span className="docs_card_blk_text">{docObj.doc_type}</span>
        </li>
        <li className="docs_card_row">
          Действия документа:{" "}
          <span className="docs_card_blk_text">
            {docObj.start} {docObj.end}
          </span>
        </li>
        <li className="docs_card_row">
          Комментарий:{" "}
          <span className="docs_card_blk_text">{docObj.comment}</span>
        </li>
      </ul>
      <p>{docObj.emploee_name}</p>

      <div className="posi_abs_left_bottom">
        <RemoveBtn name="Удалить" onClick={removeDoc} />
      </div>
      <div className="btn_container_modal">
        <BtnVer1
          style={{ height: "34px" }}
          name="Закрыть"
          onClick={() => setModalCard(false)}
        />
      </div>
    </BackFixModal>
  );
};
