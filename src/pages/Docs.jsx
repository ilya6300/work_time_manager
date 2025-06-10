import React, { useLayoutEffect, useRef, useState } from "react";
import BtnVer1 from "../ui/btn/BtnVer1";
import ListDocs from "../components/docs/ListDocs";
import apiRequest from "../service/api/api.request";
import { observer } from "mobx-react-lite";

export const Docs = observer(() => {
  const [newExport, setNewExport] = useState(false);

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

  return (
    <div className="h100">
      <input
        onChange={uploadDoc}
        className="hidden"
        ref={refInpt}
        type="file"
      />
      <div className="tabs">

        <BtnVer1
          onClick={() => refInpt.current.click()}
          name="Загрузить тебель"
        />
      </div>
      <ListDocs />
    </div>
  );
});
