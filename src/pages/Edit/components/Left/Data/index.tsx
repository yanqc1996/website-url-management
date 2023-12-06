import React, { useRef } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import styles from "./style.module.scss";
import Store from "../../../store";
// 页面组件数据一览，用于看整个页面的组件数据
const Data: React.FC = () => {
  const { compList } = Store;
  return (
    <div className={styles.data}>
      <div className={styles.title}>页面JSON数据预览</div>
      <pre className={styles.listBody}>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(compList, null, 2),
          }}
        ></div>
      </pre>
    </div>
  );
};

export default Data;
