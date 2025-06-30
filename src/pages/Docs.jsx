import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import BtnVer1 from "../ui/btn/BtnVer1";
import ListDocs from "../components/docs/ListDocs";
import apiRequest from "../service/api/api.request";
import { observer } from "mobx-react-lite";

import { saveAs } from "file-saver";
import InputBlockv1 from "../ui/input/InputBlockv1";
import appDate from "../service/state/app.date";
import { DocumentCadr } from "../components/docs/DocumentCadr";

export const Docs = observer(() => {
  const [newExport, setNewExport] = useState(false);

  const [modalCard, setModalCard] = useState(false);
  const [docObj, setDocObj] = useState(null);
  const [docFileID, seDocFileID] = useState(null);
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
    const resFileID = await apiRequest.getIdFile(e.id);
    console.log("resFileID", resFileID, e);
    if (resFileID.length !== 0) {
      console.log(resFileID);
      // const fileID = await apiRequest.downloadDocID(resFileID.data[0]);
      setFileObj(await apiRequest.downloadDocID(resFileID.data[0]));
      // setFileObj(res);
      // seDocFileID()
      setDownloadFlag(true);
    } else {
      setDownloadFlag(false);
    }
    // const res = await apiRequest.downloadDocID(e.id);
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
        <DocumentCadr
          downloadDoc={downloadDoc}
          setModalCard={setModalCard}
          docObj={docObj}
          downloadFlag={downloadFlag}
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
