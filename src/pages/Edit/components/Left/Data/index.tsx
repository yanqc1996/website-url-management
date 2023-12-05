import React, { useRef } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import styles from "./style.module.scss";

const selectedList = [
  {
    name: "Join",
    id: "Career-Join-0531",
  },
  {
    name: "Core",
    id: "Career-Core-0531",
  },
];
// 页面数据一览
const Data: React.FC = () => {
  //   const selectedList = [];
  return (
    <div className={styles.data}>
      <div className={styles.title}>页面JSON数据预览</div>
      <pre className={styles.listBody}>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(selectedList, null, 2),
          }}
        ></div>
      </pre>
    </div>
  );
};

export default Data;
