import React from "react";
import { NavLink } from "react-router";

import appDate from "../../service/state/app.date";
import { AlertCenter } from "../alert/AlertCenter";
import { observer } from "mobx-react-lite";


const Header = observer(() => {

  const btnsNav = [
    {
      name: "Табель",
      link: "timesheet",
    },
    {
      name: "Сотрудники",
      link: "employees",
    },
    {
      name: "Графики",
      link: "timetable",
    },
    {
      name: "Документы",
      link: "docs",
    },
  ];
  return (
    <div className="header">
      {appDate.unknow_emploees ? <AlertCenter /> : <></>}

      {btnsNav.map((b) => (
        <NavLink key={b.name} className="nav_btn" to={`/${b.link}`}>
          {b.name}
        </NavLink>
      ))}
    </div>
  );
});

export default Header;
