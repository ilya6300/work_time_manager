import React, { useEffect, useRef, useState } from "react";
import ListDocs from "../components/docs/ListDocs";
import apiRequest from "../service/api/api.request";
import { observer } from "mobx-react-lite";
import InputBlockv1 from "../ui/input/InputBlockv1";
import appDate from "../service/state/app.date";
import { DocumentCard } from "../components/docs/DocumentCard";
import iconUpload from "../img/icon/upload.png";

export const Docs = observer(() => {
  const [modalCard, setModalCard] = useState(false);
  const [docObj, setDocObj] = useState(null);

  const modalCardVisible = async (e) => {
    setDocObj(e);
    setModalCard(true);
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchDoc, setSearchDoc] = useState("");
  const yearData = ["2028", "2027", "2026", "2025", "2024"];

  const getDocs = async () => {
    const res = await apiRequest.getDocuments(searchDoc, startDate, endDate);
    if (res) {
      const sessionDoc = sessionStorage.getItem("autoFilterDoc");
      console.log(
        typeof sessionDoc,
        sessionDoc,
        sessionDoc === null,
        res,
        appDate.docs
      );
      // if (sessionDoc === null) return;
      // if (res) {
      // // const docID = appDate.docs.find((d) => d?.doc_number === sessionDoc);
      // if (docID) {
      // setTimeout(() => {
      // sessionStorage.removeItem("autoFilterDoc");
      // }, 1000);

      // modalCardVisible(docID);
      // }
      // }
    }
  };


  useEffect(() => {
    console.log(appDate.mount);
    if (appDate.mount !== null) {
      getDocs();
    } else {
      selectedMonth({ id: currentMonth });
    }
  }, [startDate, searchDoc]);
  const [monthDate, setMonthDate] = useState([
    { id: 0, month: "Январь", active: false, select: false },
    { id: 1, month: "Февраль", active: false, select: false },
    { id: 2, month: "Март", active: false, select: false },
    { id: 3, month: "Апрель", active: false, select: false },
    { id: 4, month: "Май", active: false, select: false },
    { id: 5, month: "Июнь", active: false, select: false },
    { id: 6, month: "Июль", active: false, select: false },
    { id: 7, month: "Август", active: false, select: false },
    { id: 8, month: "Сентябрь", active: false, select: false },
    { id: 9, month: "Октябрь", active: false, select: false },
    { id: 10, month: "Ноябрь", active: false, select: false },
    { id: 11, month: "Декабрь", active: false, select: false },
  ]);

  const setMonth = (month) => {
    const prevMonthDate = monthDate.map((m) => {
      if (m.id === month.id) {
        appDate.setParameters("mount", m.id);
        return { ...m, select: true };
      } else {
        return { ...m, select: false };
      }
    });
    setMonthDate(prevMonthDate);
  };

  const selectedMonth = (month) => {
    setMonth(month);
    const daysInMonth = new Date(appDate.year, month.id + 1, 0).getDate();
    appDate.setParameters("days_count", daysInMonth);
    for (let i = 1; i <= appDate.days_count; i++) {
      let mm = appDate.mount + 1;
      if (mm < 10) {
        mm = `0${mm}`;
      }
    }
    let mount = appDate.mount + 1;
    if (mount < 10) {
      mount = `0${mount}`;
    }
    setStartDate(`${appDate.year}-${mount}-01`);
    setEndDate(`${appDate.year}-${mount}-${appDate.days_count}`);
  };

  const changeYear = (e) => {
    appDate.setParameters("year", e.target.value);
    appDate.setParameters("docs", []);
  };

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
        <div className="nav_mounth_container">
          {monthDate.map((m) => (
            <button
              key={m.id}
              className={m.select ? "nav_mounth_btn_select" : "nav_mounth_btn"}
              onClick={() => selectedMonth(m)}
            >
              {m.month}
            </button>
          ))}
          <select
            onChange={changeYear}
            className="select_type_year"
            defaultValue={appDate.year}
          >
            {yearData.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <InputBlockv1
          value={searchDoc}
          onChange={(e) => setSearchDoc(e.target.value)}
          placeholder="Поиск по сотруднику, периоду и описанию"
          cls="h30px"
        />
        <img
          className="btn_upload"
          onClick={() => refInpt.current.click()}
          src={iconUpload}
          alt="Загрузить тебель"
        />
        {/* <BtnVer1
          onClick={() => refInpt.current.click()}
          name="Загрузить тебель"
        /> */}
      </div>
      <ListDocs modalCardVisible={modalCardVisible} />
    </div>
  );
});
