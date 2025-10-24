import appDate from "../state/app.date";
import { req } from "./api.config";

class apiRequest {
  // Cотрудники
  getEmpoyeesList = async (supervisorBoolean, name, supervisorID) => {
    try {
      const res = await req(
        `employee/all_employee?supervisor=${supervisorBoolean}&${
          name ? "search=" + name : ""
        }&${supervisorID ? "supervisor_id=" + supervisorID : ""}`
      );
      if (res) {
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateEmployeesID = async (id, data) => {
    try {
      const res = await req.patch(`employee/${id}`, data);
      if (res) {
        await this.getEmpoyeesList(false);
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  postEmployeesID = async (data) => {
    try {
      const res = await req.post("employee", data);
      if (res) {
        this.getEmpoyeesList(false);
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  removeEmployee = async (id) => {
    try {
      const res = await req.delete(`employee/${id}`);
      if (res) {
        setTimeout(async () => {
          await this.getEmpoyeesList(false);
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Графики
  getSchedule = async () => {
    try {
      const res = await req("schedule");
      if (res) {
        appDate.setParameters("schedule", res.data);
      }
    } catch (e) {
      console.error("getSchedule", e);
      appDate.setParameters("schedule", undefined);
    }
  };

  postTypeSchedule = async (data) => {
    try {
      const res = await req.post("schedule", data);
      if (res) {
        await this.getSchedule();
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateSchedule = async (id, data) => {
    try {
      const res = await req.put(`schedule/${id}`, data);
      if (res) {
        return res;
      }
    } catch (e) {
      console.error("updateSchedule", e);
    }
  };

  removeScheduleApi = async (id) => {
    try {
      const res = await req.delete(`schedule/${id}`);
      if (res) {
        await this.getSchedule();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Визиты
  //encodeURIComponent
  getVisits = async (startDate, endDate, supervisor, name) => {
    try {
      const res = await req(
        `visit/get_report?is_archived=false&start_date=${startDate}&end_date=${endDate}${
          supervisor ? "&supervisor_id=" + supervisor : ""
        }${name?.length > 2 ? "&search=" + encodeURIComponent(name) : ""}`
      );
      if (res) {
        appDate.createStructureVisits(res.data, name);
      } else {
        console.error("Не удалось выполнить запрос visit/get_report");
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Документы

  postDocument = async (data) => {
    try {
      const res = await req.post("document", data);
      if (res) {
        this.getDocuments();
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };

  getDocuments = async () => {
    try {
      const res = await req("document");
      if (res) {
        appDate.setParameters("docs", res.data);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  };

  uploadDoc = async (data) => {
    try {
      const res = await req.post("visit/add_report", data);
      if (res) {
        console.log("uploadDoc 1", res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  removeDoc = async (id) => {
    try {
      const res = await req.delete(`document/${id}`);
      if (res) {
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };

  getUnknowEmploees = async () => {
    try {
      const res = await req("unknown_user");
      if (res.data.length !== 0) {
        appDate.setParameters("unknow_emploees", res.data);
        return res.data;
      } else {
        console.log("Новых сотрудников нет");
      }
    } catch (e) {
      console.error(e);
    }
  };

  removeUnknowID = async (id) => {
    try {
      const res = await req.delete(`unknown_user/${id}`);
      if (res) {
        this.getUnknowEmploees();
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default new apiRequest();
