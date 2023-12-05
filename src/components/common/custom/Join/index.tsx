import data from "./index.json";
import styles from "./style.module.scss";
// import Button from '@/components/common/Button';
import propSchema from "./schema.json";
const Join = (props: any) => {
  const dataMerge = {
    ...data,
    ...props.data,
  };
  const { title, body, button } = dataMerge;
  return (
    <div className={styles.join}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{body}</div>
        {/* <Button size="large" href={button.link} title={button.text} /> */}
      </div>
    </div>
  );
};
Join.defaultProps = {
  data: data,
};
Join.compAttr = {
  name: "Join",
  id: "Career-Join-0531",
  title: "Join",
  desktopImg: "/img/components/Join/desktop.png",
};
Join.propSchema = propSchema;

export default Join;
