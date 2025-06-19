import { makeAutoObservable } from "mobx";

class appState {
  constructor() {
    makeAutoObservable(this);
  }

  loadingTimesheet = false;

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
  };
}
export default new appState();
