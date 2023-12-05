import { createContext, useContext } from "react";
import { makeAutoObservable, runInAction } from "mobx";

class Store {
  // Store，用于存储Edit整个页面的数据流转 => (后续看是否需要拆分，没必要一整个页面都用一个store来实现)
  // 单个模块组件的数据不放置在Store中实现，此处指维护整个页面 && 跨页面见的数据流转
  bannerUrl = "";
  compList = []; // 页面compList数据
  showDrop = false;
  constructor() {
    makeAutoObservable(this);
  }
  setCompList = (data) => {
    console.log(1871792);
    this.compList = data;
  };
  handleDragStart = () => {
    console.log(1213);
    this.showDrop = true;
    console.log(this.showDrop, 999);
  };

  handleDragEnd = () => {
    this.showDrop = false;
  };
}

export default new Store();
