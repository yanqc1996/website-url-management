import * as DropComponents from "@components/common/custom";
import Drag from "@pages/Edit/components/Drag";
import Store from "../../../../store";

// 1.组件基础展示：Done
// 2.组件拖拽包裹逻辑： Done
// 3. 完成画布开发后，就可以开始考虑连接页面数据流转了 - 不用redux，用mobx吧，怎么快怎么来
const Custom = () => {
  const dragList = Object.values(DropComponents).map((v) => {
    const { compAttr } = v;
    if (!compAttr) {
      return false;
    }
    return {
      ...compAttr,
      key: compAttr.name,
    };
  });
  const { handleDragStart, handleDragEnd } = Store;
  console.log(dragList, 999);
  return (
    <Drag
      data={dragList}
      renderChild={({ title }: { title: string }) => (
        <div
          style={{
            width: "100px",
            height: "50px",
            backgroundColor: "#615858",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          <span>{title}</span>
        </div>
      )}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
    />
  );
};

export default Custom;
