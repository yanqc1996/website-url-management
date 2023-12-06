// preview页面，该页面用于和Editor页面进行联动，展示，旨在显示当前配置中的页面，页面刷新后恢复空状态
// -- 页面应该需要 1.配置阶段的preview页面，用于用户在配置阶段进行预览
// 2.预览阶段的preview页面，和配置阶段preview页面相似，不同的是该地址获取的是保存后的参数，调用接口获取，地址类似preview?url=xxx
// ？？上面那条不对吧，不提供额外的预览地址才对，因为预览等于发布beta,所以预览和发布beta是一样的效果，直接在beta预览即可
// 上述还可能存在多环境问题？？
// 如何限制发布beta之后才能发布正式？
// beta和正式需要分库实现，串库就比较麻烦了 ?
import { useState } from "react";
// 先尝试用静态数据实现一版
// import data from "./index.json";
import * as DropComponents from "@components/common";
const Preview = () => {
  const [data, setData] = useState([]);
  console.log(window.innerWidth, "width");
  window.addEventListener("message", function (event) {
    console.log("Received message from iframe:", event.data);
    setData(JSON.parse(event.data));
  });
  return data.map((item) => {
    // @ts-ignore
    const Comp = DropComponents[item.name];
    return <Comp data={item.data} key={item.id} />;
  });
};
export default Preview;
