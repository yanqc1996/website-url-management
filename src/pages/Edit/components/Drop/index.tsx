import { PureComponent } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import classNames from "classnames";

import styles from "./style.module.scss";

// 放置组件，包裹拖拽元素
const Drop = (props: { handleDrop: (data: any) => void; show: boolean }) => {
  const { handleDrop, show } = props;
  const dragOverCallback = throttle((e) => {
    if (e.currentTarget) {
      e.currentTarget.classList.add(styles["dropPlaceHolder-active"]);
    }
    e.dataTransfer.dropEffect = "copy";
  }, 1000);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.persist();
    dragOverCallback(e);
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(styles["dropPlaceHolder-active"]);
  };

  const drop = (e) => {
    e.preventDefault();
    const dataStr = e.dataTransfer.getData("data");
    const data = JSON.parse(dataStr);
    handleDrop(data);
  };
  const placeHolderClasses = classNames(styles.dropPlaceHolder, {
    [styles["dropPlaceHolder-show"]]: show,
  });
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={drop}
      className={placeHolderClasses}
    >
      放这里
    </div>
  );
};
export default Drop;
