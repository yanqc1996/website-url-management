import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import {
  CreditCardTwoTone,
  FolderTwoTone,
  CloseCircleFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import Core from "./Core";
import Data from "./Data";
// 替换成draw组件实现,这个项目不做手动实现组件功能
const Editor = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [comp, setComp] = useState("");
  const onShow = (type: string) => {
    setShowPanel(true);
    setComp(type);
  };
  return (
    <div className={styles.container}>
      <Tooltip placement="right" title="组件库">
        <CreditCardTwoTone
          onClick={() => onShow("core")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        />
      </Tooltip>
      <span style={{ marginTop: "16px" }}></span>
      <Tooltip placement="right" title="页面数据">
        <FolderTwoTone
          onClick={() => onShow("data")}
          style={{ fontSize: "24px", cursor: "pointer" }}
        />
      </Tooltip>
      {showPanel && (
        <div className={styles.panel}>
          <div className={styles.close}>
            <CloseCircleFilled
              className={styles.icon}
              onClick={() => setShowPanel(false)}
            ></CloseCircleFilled>
          </div>
          <div className={styles.content}>
            {comp === "core" ? <Core></Core> : <Data></Data>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
