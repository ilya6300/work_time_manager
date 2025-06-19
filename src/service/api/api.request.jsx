import appDate from "../state/app.date";
import { req } from "./api.config";

class apiRequest {
  // Cотрудники
  getEmpoyeesList = async () => {
    try {
      const res = await req("employee/all_employee");
      if (res) {
        console.log(res.data);
        appDate.setParameters(
          "employees",
          res.data.data.sort((a, b) =>
            a.last_name.localeCompare(b.last_name, "ru")
          )
        );
        appDate.setParameters(
          "original_employees",
          res.data.data.sort((a, b) =>
            a.last_name.localeCompare(b.last_name, "ru")
          )
        );
      }
    } catch (e) {
      console.error("getEmpoyeesList", e);
      appDate.setParameters("employees", undefined);
    }
  };

  getSupervisorsList = async () => {
    try {
      const res = await req("employee/all_supervisors");
      if (res) {
        console.log(res.data);
        appDate.setParameters("supervisor", res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  updateEmployeesID = async (id, data) => {
    try {
      const res = await req.patch(`employee/${id}`, data);
      if (res) {
        console.log(res.data);
        await this.getEmpoyeesList();
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  postEmployeesID = async (data) => {
    try {
      console.log(data);
      const res = await req.post("employee/add_employer", data);
      if (res) {
        console.log(res.data);
        this.getEmpoyeesList();
        return res.data;
      } else {
        console.log(res);
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
        console.log(res.data);
        appDate.setParameters("schedule", res.data.data);
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
        console.log(res.data);
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
        console.log(res.data);
        return res;
      } else {
        console.log("updateSchedule");
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
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  // Визиты

  getVisits = async (startDate, endDate) => {
    console.log(startDate, endDate);
    try {
      const res = await req.post("reports/create_report_json", {
        start_date: new Date(startDate),
        end_date: new Date(endDate),
      });
      if (res) {
        console.log("getVisits", res.data);
        appDate.createStructureVisits(res.data);
      } else {
        console.log("Не удалось выполнить запрос reports/create_report_json");
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Документы

  postDocument = async (data) => {
    console.log(data);
    try {
      const res = await req.post(
        "documents/upload_document_info_and_file",
        data
      );
      if (res) {
        console.log(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  postDocumentNoFile = async (data) => {
    console.log(data);
    try {
      const res = await req.post("documents/upload_document_info", data);
      if (res) {
        console.log(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getDocuments = async () => {
    try {
      const res = await req("documents");
      if (res) {
        console.log(res.data);
        appDate.createStructureDocs(res.data.data);
        // appDate.setParameters("schedule", res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  downloadDocID = async (id) => {
    try {
      const res = await req(`documents/document/${id}`, {
        responseType: "blob",
      });
      if (res) {
        console.log(res);
        return res;
      }
    } catch (e) {
      console.error(e);
    }
  };

  uploadDoc = async (data) => {
    try {
      const res = await req.post("reports/parsing_n_upload_report", data);
      if (res) {
        console.log("uploadDoc", res);
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default new apiRequest();
