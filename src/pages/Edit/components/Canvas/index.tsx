// 画布模块，用于画布的使用，页面核心模块，承接整个编辑页面的数据流转功能
import styles from "./style.module.scss";
import Drop from "../Drop";
import Store from "../../store";
import { observer } from "mobx-react";
import Icon from "../Icon";
import { Modal } from "antd";
import { arrayIndexForward, arrayIndexBackward } from "@utils";
const { confirm } = Modal;
import { toJS } from "mobx";
// 画布模块 =>
// 1.中心区域，用于放置模块展示 done
// 2.iframe嵌入预览页面（用iframe是否更友好（增加开发成本，但是减少机型适配问题））
// 3.中心区域drop数据，对中心区域监测drag进行drop数据放置逻辑，同步进preview页面 done
// 4.点击模块，选中模块出现遮罩功能 done
// 5.点击删除，对选中模块进行删除功能 done
// 6.点击移动，对模块进行上下移动 done
// 7.考虑到iframe中进行操作的各种复杂情况，此处操作不放到iframe中进行，给一个模块缩略操作位置，同时给一个iframe预览的页面 -- 需要考虑下如何布局更好，目前可以先不管，这样就只需要一个页面接收就行，也不用管hash上iframe的问题
// 8.点击画布模块，能够对右侧页面进行数据编辑 done，不过目前看来还有点问题
// 9.原则上避免一个页面出现两个相同的自定义组件 -- 基于id筛选组件的弊端，可能要考虑基础组件的问题，后续可能会需要一个随机id？
const Canvas = (props: any) => {
  const { showDrop, compList = [], setCompList } = Store;
  const { handleEditItemCanvas } = props;
  // 将数据传入页面，进行页面渲染
  const handleDropCanvas = ({
    index,
    name,
    id,
  }: {
    index: number;
    name: string;
    id: string;
  }) => {
    compList.splice(index, 0, { name, id });
    const newSetSelectList = [...compList];
    setCompList([...newSetSelectList]);
    // sendToIframe();
  };
  const handleDrop = (index: number, data: any) => {
    const { name, id } = data;
    console.log(123);
    handleDropCanvas({ index, name, id });
  };
  const operateItem = ({ type, index }: { type: string; index: number }) => {
    if (type === "delete") {
      console.log("delete");
      confirm({
        title: "确定删除该组件?",
        content: "删除之后,将不能恢复",
        onOk: () => {
          console.log("delete data");
          compList.splice(index, 1);
          const newSelectedList = [...compList];
          setCompList(newSelectedList);
          //   handleSaveBtnClick(newSelectedList);
        },
      });
    } else if (type === "up") {
      console.log("up");
      const newSelectedList = arrayIndexForward(compList, index);
      setCompList([...newSelectedList]);
      // handleSaveBtnClick([...newSelectedList]);
    } else if (type === "down") {
      console.log("down");
      const newSelectedList = arrayIndexBackward(compList, index);
      setCompList([...newSelectedList]);
      // handleSaveBtnClick([...newSelectedList]);
    }
  };
  const handleOperateItem = (
    { type, index }: { type: string; index: number },
    e: MouseEvent
  ) => {
    e.stopPropagation();
    operateItem({ type, index });
  };

  const handleEditItemClick = (id: string) => {
    handleEditItemCanvas({ id });
  };
  // const sendToIframe = () => {
  //   let iframe = document.getElementById("myIframe");
  //   // 能够发送
  //   if (iframe?.contentWindow) {
  //     // 将数据发送给iframe页面
  //     const message = JSON.stringify(toJS(compList));
  //     iframe?.contentWindow?.postMessage(message);
  //   }
  // };
  return (
    <div className={styles.canvas}>
      {/* <iframe
        id="myIframe"
        src={"/#/preview"}
        frameBorder="0"
        className={styles.iframe}
      /> */}
      {compList.map((item, index) => {
        console.log(item, 999);
        const showUp = index > 0;
        const showDown = index < compList.length - 1 && compList.length > 1;
        return (
          <div className={styles["comp-wrap"]}>
            <Drop
              show={showDrop}
              handleDrop={(e: any) => {
                handleDrop(index, { ...e });
              }}
            />
            <div className={styles["operate-wrap"]}>
              <Icon
                className={styles["operate-item"]}
                type="edit"
                size={24}
                onClick={() => {
                  handleEditItemClick(item.id);
                }}
              />
              <Icon
                className={styles["operate-item"]}
                type="delete"
                size={24}
                onClick={(e: MouseEvent) => {
                  handleOperateItem({ type: "delete", index }, e);
                }}
              />
              {showUp && (
                <Icon
                  className={styles["operate-item"]}
                  type="up"
                  size={24}
                  onClick={(e: MouseEvent) => {
                    handleOperateItem({ type: "up", index }, e);
                  }}
                />
              )}
              {showDown && (
                <Icon
                  className={styles["operate-item"]}
                  type="down"
                  size={24}
                  onClick={(e: MouseEvent) => {
                    handleOperateItem({ type: "down", index }, e);
                  }}
                />
              )}
            </div>
            <div className={styles.canvasItem}>{item.name}</div>
          </div>
        );
      })}
      <Drop
        show={showDrop}
        handleDrop={(e: any) => {
          handleDrop(compList.length, { ...e });
        }}
      />
    </div>
  );
};
export default observer(Canvas);
