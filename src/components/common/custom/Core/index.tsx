import data from "./index.json";
import propSchema from "./schema.json";
import styles from "./style.module.scss";
// import Image from "next/image";

interface CoreProps {
  title: string;
  items: {
    title: string;
    content: string;
    figure?: string;
  }[];
}

const Core = (props: { data: CoreProps }) => {
  const dataMerge = {
    ...data,
    ...props.data,
  };
  const { title, items } = dataMerge;
  return (
    <div className={styles.core}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.columns}>
          {items?.map((item, index) => (
            <div key={index} className={styles.column}>
              {/* {item.figure && <Image className={styles.image} width={100} height={80} src={item.figure} alt="" />} */}
              <div className={styles.content}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
Core.defaultProps = {
  data: data,
};
Core.compAttr = {
  name: "Core",
  id: "Career-Core-0531",
  title: "Core",
  iconName: "OrderedListOutlined",
  desktopImg: "/img/components/Core/desktop.png",
};
Core.propSchema = propSchema;
export default Core;
