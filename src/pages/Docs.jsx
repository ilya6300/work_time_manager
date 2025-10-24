import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BtnVer1 from "../ui/btn/BtnVer1";
import ListDocs from "../components/docs/ListDocs";
import apiRequest from "../service/api/api.request";
import { observer } from "mobx-react-lite";
import InputBlockv1 from "../ui/input/InputBlockv1";
import appDate from "../service/state/app.date";
import { DocumentCard } from "../components/docs/DocumentCard";

export const Docs = observer(() => {
  const [modalCard, setModalCard] = useState(false);
  const [docObj, setDocObj] = useState(null);

  const modalCardVisible = async (e) => {
    setDocObj(e);
    setModalCard(true);
  };

  const getDocs = async () => {
    const res = await apiRequest.getDocuments();
    if (res) {
      const sessionDoc = sessionStorage.getItem("autoFilterDoc");
      console.log(
        typeof sessionDoc,
        sessionDoc,
        sessionDoc === null,
        res,
        appDate.docs
      );
      if (sessionDoc === null) return;
      if (res) {
        const docID = appDate.docs.find((d) => d?.doc_number === sessionDoc);
        if (docID) {
          setTimeout(() => {
            // sessionStorage.removeItem("autoFilterDoc");
          }, 1000);

          modalCardVisible(docID);
        }
      }
    }
  };

  useEffect(() => {
    const res = getDocs();
  }, []);

  const refInpt = useRef(null);

  const uploadDoc = async (e) => {
    if (e.target.files[0].type === "text/html") {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      await apiRequest.uploadDoc(formData);
    }
  };

  return (
    <div className="h100">
      {modalCard ? (
        <DocumentCard
          setModalCard={setModalCard}
          docObj={docObj}
          setDocObj={setDocObj}
        />
      ) : (
        <></>
      )}
      <input
        onChange={uploadDoc}
        className="hidden"
        ref={refInpt}
        type="file"
      />
      <div className="tabs">
        <InputBlockv1
          value={appDate.filter_value_docs_name}
          onChange={(e) =>
            appDate.setParameters("filter_value_docs_name", e.target.value)
          }
          placeholder="Поиск по сотруднику, периоду и описанию"
          cls="h30px"
        />
        <BtnVer1
          onClick={() => refInpt.current.click()}
          name="Загрузить тебель"
        />
      </div>
      <ListDocs modalCardVisible={modalCardVisible} />
    </div>
  );
});
