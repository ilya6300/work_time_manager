import { makeAutoObservable, toJS } from "mobx";
import apiRequest from "../api/api.request";
import appState from "./app.state";

class appDate {
  constructor() {
    makeAutoObservable(this);
  }

  days_count = null;
  mount = null;
  year = "2025";
  hover_day = "";

  employees = null;
  original_employees = null;
  supervisor = null;
  schedule = null;
  original_visits = [];
  visits = [];
  original_docs = null;
  docs = null;

  newDocs = {
    file: null,
    employer_id: null,
    description: "",
    start: "",
    end: "",
  };

  setNewDocs = (name, value) => {
    this.newDocs = { ...this.newDocs, [`${name}`]: value };
  };

  resetNewDocs = () => {
    this.newDocs = {
      ...this.newDocs,
      file: null,
      employer_id: null,
      description: "",
      start: "",
      end: "",
    };
  };

  createNewDoc = async () => {
    if (this.newDocs.employer_id === null) {
      return alert("Не выбран сотрудник");
    }
    if (this.newDocs.start === "") {
      return alert("Не указана дата начала");
    }
    if (this.newDocs.end === "") {
      return alert("Не указана дата окончания");
    }
    if (this.newDocs.file === null && this.newDocs.description === "") {
      return alert("Выберите файл или напишите комментарий");
    }
    if (this.newDocs.file !== null) {
      const formData = new FormData();
      formData.append("employer_id", this.newDocs.employer_id);
      formData.append("description", this.newDocs.description);
      formData.append("start", this.newDocs.start);
      formData.append("end", this.newDocs.end);
      formData.append("file", this.newDocs.file);
      await apiRequest.postDocument(formData);
      return true;
    } else {
      const formData = new FormData();
      formData.append("employer_id", this.newDocs.employer_id);
      formData.append("description", this.newDocs.description);
      formData.append("start", this.newDocs.start);
      formData.append("end", this.newDocs.end);
      await apiRequest.postDocumentNoFile(formData);
      return true;
    }
  };

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
  };

  createStructureVisits = async (data) => {
    this.visits = data
      .sort((a, b) =>
        a.employer_fullname.localeCompare(b.employer_fullname, "ru")
      )
      .filter((df) => df.visits.length !== 0)
      .map((user) => {
        const userCopy = { ...user };
        for (let i = 1; i <= this.days_count; i++) {
          const day = String(i).padStart(2, "0");
          const dateStr = `${this.year}-${String(this.mount + 1).padStart(
            2,
            "0"
          )}-${day}`;
          const hasVisit = userCopy.visits.some(
            (visit) => visit.date === dateStr
          );
          if (!hasVisit) {
            userCopy.visits.push({
              date: dateStr,
              arrival: null,
              departure: null,
              result: "absent",
            });
          }
          userCopy.visits.map((v) => {
            if (v.arrival === null && v.departure === null) {
              v.late = false;
              v.left = false;
            }
            if (v.result.match(/late/)) {
              v.late = true;
            } else {
              v.late = false;
            }
            if (v.result.match(/left/)) {
              v.left = true;
            } else {
              v.left = false;
            }
          });
        }
        userCopy.visits.sort((a, b) => new Date(a.date) - new Date(b.date));
        return userCopy;
      });
    this.original_visits = this.visits;
    appState.setParameters("loadingTimesheet", true);
    console.log(toJS(this.visits), data);
  };

  filterName = (data, value) => {
    console.log(data, value);
    if (value.length < 2) {
      return (this[`${data}`] = this[`original_${data}`]);
    } else {
      console.log(value);
      return (this[`${data}`] = this[`original_${data}`].filter(
        (n) =>
          n.employer_fullname.toLowerCase().includes(value.toLowerCase()) ||
          n.schedule_type.toLowerCase().includes(value.toLowerCase()) ||
          (n.supervisor_fullname !== null &&
            n.supervisor_fullname.toLowerCase().includes(value.toLowerCase()))
      ));
    }
  };

  filter_value_employees_name = "";
  filter_value_employees_id_supervisor = 99999;

  filterNameEmployess = (data) => {
    console.log(
      "this.filter_value_employees_id_supervisor",
      this.filter_value_employees_id_supervisor,
      this.filter_value_employees_id_supervisor,
      toJS(this.employees)
    );
    if (
      this.filter_value_employees_name.length < 2 &&
      this.filter_value_employees_id_supervisor === 99999
    ) {
      console.log("filterNameEmployess 1");
      return (this[`${data}`] = this[`original_${data}`]);
    } else {
      console.log(this.filter_value_employees_name);
      return (this[`${data}`] = this[`original_${data}`].filter((n) => {
        const nameMatch =
          this.filter_value_employees_name.length >= 2
            ? n.first_name
                .toLowerCase()
                .includes(this.filter_value_employees_name.toLowerCase()) ||
              n.last_name
                .toLowerCase()
                .includes(this.filter_value_employees_name.toLowerCase())
            : true;

        const supervisorMatch =
          this.filter_value_employees_id_supervisor !== 99999
            ? Number(n.supervisor_id) ===
              Number(this.filter_value_employees_id_supervisor)
            : true;
        return nameMatch && supervisorMatch;
      }));
      console.log(this[`${data}`]);
    }
  };

  createStructureDocs = async (data) => {
    try {
      this.docs = data.map((d) => {
        const docsCopy = { ...d };
        // docsCopy.start = new Date(docsCopy.start).toLocaleDateString();
        // docsCopy.end = new Date(docsCopy.end).toLocaleDateString();
        const emploeesID = this.original_employees.find(
          (e) => e.id === d.employer_id
        );
        if (emploeesID) {
          docsCopy.emploee_name = `${emploeesID.last_name} ${emploeesID.first_name}`;
        }
        return docsCopy;
      });
      console.log("createStructureDocs", data, this.docs);
      this.original_docs = this.docs;
    } catch (e) {
      console.error(e);
    }
  };
}
export default new appDate();
