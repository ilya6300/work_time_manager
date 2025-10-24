import { makeAutoObservable, toJS } from "mobx";
import appState from "./app.state";
import apiRequest from "../api/api.request";

class appDate {
  constructor() {
    makeAutoObservable(this);
  }

  days_count = null;
  mount = null;
  year = "2025";
  hover_day = "";

  employees = null;
  supervisor = null;
  schedule = null;
  visits = [];
  docs = null;
  unknow_emploees = null;

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
    return true;
  };

  createStructureVisits = async (data, search) => {
    this.visits = data.map((user) => {
      const userCopy = { ...user };
      for (let i = 1; i <= this.days_count; i++) {
        const day = String(i).padStart(2, "0");
        const dateStr = `${this.year}-${String(this.mount + 1).padStart(
          2,
          "0"
        )}-${day}`;
        const hasVisit = userCopy.visits.find(
          (visit) => visit.visit_date === dateStr
        );
        if (!hasVisit) {
          userCopy.visits.push({
            visit_date: dateStr,
            start_visit: null,
            end_visit: null,
            status: "",
            document: null,
          });
        }
      }
      userCopy.visits.sort(
        (a, b) => new Date(a.visit_date) - new Date(b.visit_date)
      );
      return userCopy;
    });

    appState.setParameters("loadingTimesheet", true);
    if (search === "2/2") {
      this.visits = this.visits.filter(
        (v) => v.schedule.schedule_type === "2/2"
      );
    }
  };

  filterEmploeesSchedule = (name) => {
    this.visits = this.visits.filter((v) => v.schedule.schedule_type === name);
  };

  createStructureDocs = async (data) => {
    try {
      this.docs = data.map((d) => {
        const docsCopy = { ...d };
        const emploeesID = this.original_employees.find(
          (e) => e.id === d.employer_id
        );
        if (emploeesID) {
          docsCopy.emploee_name = `${emploeesID.last_name} ${emploeesID.first_name}`;
          docsCopy.date_doc = `${new Date(
            d.start
          ).toLocaleDateString()} ${new Date(d.start)
            .toLocaleTimeString()
            .replace(/:\d\d$/, "")} ${new Date(
            d.end
          ).toLocaleDateString()} ${new Date(d.start)
            .toLocaleTimeString()
            .replace(/:\d\d$/, "")}`;
        }
        return docsCopy;
      });
      this.original_docs = this.docs;
    } catch (e) {
      console.error(e);
    }
  };

  updateUnknowList = async (item, update) => {
    console.log(item);
    const emploeeID = this.unknow_emploees.find((e) => e.id === item.id);
    if (emploeeID && update) {
      console.log(1);
      emploeeID.first_name = item.lastName;
      emploeeID.last_name = item.firstName;
      emploeeID.second_name = item.secondName;
      emploeeID.schedule_id = Number(item.schedule);
      emploeeID.service_number = item.serviceNumber;
      emploeeID.supervisor_id =
        Number(item.mySupervisor) !== 0 ? Number(item.mySupervisor) : null;
      emploeeID.is_supervisor = item.isSupervisor;
      emploeeID.is_archived = item.isActive;
      emploeeID.time_zone = "Europe/Moscow";
    }
    if (emploeeID && !update) {
      const emploee_id = emploeeID.id;
      delete emploeeID.id;
      console.log("emploeeID 2", emploeeID);
      const res = await apiRequest.postEmployeesID(emploeeID);
      if (res) {
        apiRequest.removeUnknowID(emploee_id);
      }
      // console.log(emploeeID);
    }
    // console.log(emploeeID);
  };
}
export default new appDate();
