import { ReactNode } from "react";
import styles from "./style.module.scss";

// 拖拽组件，包裹拖拽元素
const Drag = (props: {
  data: [];
  handleDragStart: () => void;
  handleDragEnd: () => void;
  renderChild: (item: any) => ReactNode;
}) => {
  const { data, renderChild, handleDragStart, handleDragEnd } = props;
  const dragStart = (item: any, e: DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "copy";
    }
    e.dataTransfer?.setData("data", JSON.stringify(item));
    handleDragStart();
  };
  const dragEnd = (e: DragEvent) => {
    e.dataTransfer?.clearData();
    handleDragEnd();
  };
  return (
    <section className={styles.dragWrap}>
      {data.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => dragStart(item, e)}
          onDragEnd={(e) => dragEnd(e)}
        >
          {renderChild(item)}
        </div>
      ))}
    </section>
  );
};
export default Drag;
