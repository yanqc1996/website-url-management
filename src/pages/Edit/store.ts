import { createContext, useContext } from "react";
import { makeAutoObservable, runInAction } from "mobx";
import { ComponentsListProps } from "./interface";
class Store {
  // Store，用于存储Edit整个页面的数据流转 => (后续看是否需要拆分，没必要一整个页面都用一个store来实现)
  // 单个模块组件的数据不放置在Store中实现，此处指维护整个页面 && 跨页面见的数据流转
  bannerUrl = "";
  compList: ComponentsListProps[] = []; // 页面compList数据
  showDrop = false;
  constructor() {
    makeAutoObservable(this);
  }
  // 设置组件数据
  setCompList = (data: ComponentsListProps[]) => {
    this.compList = data;
  };
  // 推拽开始
  handleDragStart = () => {
    console.log(1213);
    this.showDrop = true;
  };
  // 拖拽结束
  handleDragEnd = () => {
    this.showDrop = false;
  };
}

// PS: 这个是因为页面嵌套层数太多以及同一个页面依赖同一套数据，所以抛出new Store
// 不推荐在其他页面也这么使用，因为很难追踪store中的数据被什么地方更改了，建议还是在使用页面单独使用new Store
export default new Store();
