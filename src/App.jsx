import {  useLayoutEffect } from "react";
import { Docs } from "./pages/Docs";
import { Employees } from "./pages/Employees";
import LayOut from "./pages/LayOut";
import { Timesheet } from "./pages/Timesheet";
import { Timetable } from "./pages/Timetable";
import "./style/App.css";
import { Route, Routes } from "react-router";
import apiRequest from "./service/api/api.request";
import appDate from "./service/state/app.date";
import { observer } from "mobx-react-lite";

const App = observer(() => {


  const getStart = async () => {
    await apiRequest.getSchedule();
    await apiRequest.getSupervisorsList();
    await apiRequest.getEmpoyeesList();
  };



  useLayoutEffect(() => {
    getStart();
  }, []);

  if (appDate.supervisor !== null && appDate.schedule !== null) {
    return (
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Timesheet />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="employees" element={<Employees />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="docs" element={<Docs />} />
        </Route>
      </Routes>
    );
  }
});

export default App;
