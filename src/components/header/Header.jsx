import React from "react";
import { NavLink } from "react-router";

const Header = () => {
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
      {btnsNav.map((b) => (
        <NavLink key={b.name} className="nav_btn" to={`/${b.link}`}>
          {b.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Header;
