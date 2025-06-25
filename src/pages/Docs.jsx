import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import BtnVer1 from "../ui/btn/BtnVer1";
import ListDocs from "../components/docs/ListDocs";
import apiRequest from "../service/api/api.request";
import { observer } from "mobx-react-lite";
import BackFixModal from "../ui/modal/BackFixModal";
import { saveAs } from "file-saver";
import InputBlockv1 from "../ui/input/InputBlockv1";
import appDate from "../service/state/app.date";

export const Docs = observer(() => {
  const [newExport, setNewExport] = useState(false);

  const [modalCard, setModalCard] = useState(false);
  const [docObj, setDocObj] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [downloadFlag, setDownloadFlag] = useState(false);

  const [tabs, setTabs] = useState([
    // {
    //   name: "Документы",
    //   active: false,
    // },
    {
      name: "Загрузить",
      active: false,
    },
  ]);

  const modalCardVisible = async (e) => {
    setDocObj(e);
    setModalCard(true);
    const res = await apiRequest.downloadDocID(e.id);
    console.log("downloadDocID", res);
    if (res) {
      setFileObj(res);
      setDownloadFlag(true);
    } else {
      setDownloadFlag(false);
    }
  };

  const getDocs = async () => {
    await apiRequest.getDocuments();
  };

  useLayoutEffect(() => {
    getDocs();
  }, []);

  const refInpt = useRef(null);

  const uploadDoc = async (e) => {
    if (e.target.files[0].type === "text/html") {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      await apiRequest.uploadDoc(formData);
    }
    console.log(e.target.files[0]);
  };

  const downloadDoc = async () => {
    saveAs(
      new Blob([fileObj.data]),
      `${docObj.emploee_name} ${docObj.start}-${docObj.end}.${fileObj.headers.file_extention}`,
      fileObj.headers.file_extention
    );
  };

  useMemo(() => {
    appDate.filterDocs("docs", appDate.filter_value_docs_name);
    // return () => appDate.filterName;
  }, [appDate.filter_value_docs_name]);

  return (
    <div className="h100">
      {modalCard ? (
        <BackFixModal>
          <h2 className="title_v2">Документ</h2>
          <p>{docObj.emploee_name}</p>
          <p>
            <span>
              Действия документа с {new Date(docObj.start).toLocaleDateString()}{" "}
              {new Date(docObj.start).toLocaleTimeString()}{" "}
            </span>
            <span>
              по {new Date(docObj.end).toLocaleDateString()}{" "}
              {new Date(docObj.start).toLocaleTimeString()}
            </span>
          </p>
          <p>{docObj.description}</p>
          <div className="btn_container_modal">
            {downloadFlag ? (
              <BtnVer1 name="Скачать" onClick={downloadDoc} />
            ) : (
              <span>Файл к документу не прикреплён</span>
            )}

            <BtnVer1 name="Закрыть" onClick={() => setModalCard(false)} />
          </div>
        </BackFixModal>
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
