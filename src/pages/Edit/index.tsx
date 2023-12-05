import React, { useRef } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import styles from "./style.module.scss";
import Left from "./components/Left";
import Canvas from "./components/Canvas";
import { useLocalObservable, observer } from "mobx-react";
import { toJS } from "mobx";
import Store from "./store";
// 编辑页面设计 -> 左侧选择栏，中间画布，右侧数据编辑栏
// 左侧采用点击展开的效果，节省左侧空间，初版提供 - 组件列表 && 数据列表功能
const Editor = () => {
  const actionRef = useRef<ActionType>();
  const { compList, setCompList } = Store;
  console.log(toJS(setCompList), 9999);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Left />
      </div>
      <div className={styles.canvas}>
        <Canvas compList={compList} setCompList={setCompList} />
      </div>
      <div className={styles.right}>3</div>
    </div>
  );
};
export default observer(Editor);
