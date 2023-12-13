import { useMemo, useState } from "react";
import styles from "./style.module.scss";
import Left from "./components/Left";
import Canvas from "./components/Canvas";
import Right from "./components/Right";
import { Form, notification, Button } from "antd";
import { observer } from "mobx-react";
import * as DropComponents from "@components/common";
import { toJS } from "mobx";
import Store from "./store";
import _, { find, get } from "lodash";
import { ComponentsListProps } from "./interface";
import { useNavigateChange } from "@hooks";
// 编辑页面设计 -> 左侧选择栏，中间画布，右侧数据编辑栏
// 左侧采用点击展开的效果，节省左侧空间，初版提供 - 组件列表 && 数据列表功能
const Editor = () => {
  const { compList, setCompList } = Store;
  console.log(toJS(setCompList), 9999);
  const [form] = Form.useForm();
  const [activeCompId, SetActiveCompId] = useState("");
  const activeComp = useMemo(
    () => find(compList, { id: activeCompId }) || {},
    [activeCompId, compList]
  );
  console.log(toJS(activeComp), 191929293);
  // 保存逻辑
  const handleSave = async (list: ComponentsListProps[]) => {
    const newSetSelectList = [...compList];
    newSetSelectList.forEach((item) => {
      if (item.id === activeCompId) {
        item.data = list;
      }
    });
    setCompList([...newSetSelectList]);
    const updateList = list || compList;
    notification.success({
      message: "保存成功",
      duration: 2,
    });
  };
  const activeCompSchema = useMemo(
    () => get(DropComponents, `${activeComp.name}.propSchema`),
    [activeComp]
  );
  // 这个数据展示上似乎有点问题 - Todo
  const activeCompData = useMemo(
    () => get(DropComponents, `${activeComp.name}.defaultProps.data`),
    [activeComp]
  );
  console.log(activeCompData, "activeCompData");
  // 与右侧联动，用于编辑处理组件数据逻辑
  const handleEditItemCanvas = ({ id }: { id: string }) => {
    // 设置id && 寻找id匹配的数据
    console.log(id, 17291);
    SetActiveCompId(id);
    const matchComp = find(compList, { id }) || {};
    // 外部的数据存在更新延迟，会导致数据混乱，这里需要单独获取，需要优化 Todo
    const activeCompNow = find(compList, { id: id }) || {};
    const activeCompDataNow = get(
      DropComponents,
      `${activeCompNow.name}.defaultProps.data`
    );
    console.log(toJS(matchComp), 1029);
    // 赋予组件数据 -- 如果有赋值则使用赋值，否则使用组件默认值
    matchComp.data = matchComp.data || activeCompDataNow;
    // 给右侧表单设置值
    console.log(JSON.stringify(matchComp.data));
    form.setFieldsValue(_.cloneDeep(matchComp.data));
  };
  return (
    <>
      <div className={styles.header}>
        <Button type="primary">页面保存</Button>
        <Button style={{ marginLeft: "8px" }}>页面预览</Button>
        <Button style={{ marginLeft: "8px" }} onClick={() => changePath("/")}>
          关闭
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <Left />
        </div>
        <div className={styles.canvas}>
          <Canvas handleEditItemCanvas={handleEditItemCanvas} />
        </div>
        <div className={styles.right}>
          <Right
            handleSaveBtnClick={handleSave}
            form={form}
            schema={activeCompSchema}
            key={activeCompId}
            id={activeCompId}
          />
        </div>
      </div>
    </>
  );
};
export default observer(Editor);
