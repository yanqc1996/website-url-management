import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styles from "./style.module.scss";
import Basic from "./Basic";
import Custom from "./Custom";
// 组件库展示列表 -> 基础组件库/自定义组件库？ -- 需要定义几个基础组件实现该效果？如果放在portal中的话，确实可以基于iframe来实现？
const Core = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "基础组件",
      children: <Basic />,
    },
    {
      key: "2",
      label: "自定义组件",
      children: <Custom />,
    },
  ];
  return (
    <div className={styles.core}>
      <Collapse items={items} />
    </div>
  );
};

export default Core;
