import { makeAutoObservable } from "mobx";

class appState {

  constructor() {
    makeAutoObservable(this);
  }

  setParameters = (parametr, value) => {
    this[`${parametr}`] = value;
  };
  
}
export default new appState();
