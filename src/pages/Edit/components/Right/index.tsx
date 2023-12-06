import { Alert, Form, Input, Radio, Checkbox, Button } from "antd";
import { isEmpty } from "lodash";

// 整个项目的数据核心部分: 目前的定义还很基础，需要完善更多数据配置的定义，会直接关系到组件的改造
// 1.最基础的数据回填功能
// 2.需要遍历的数组类型的数据定义
// 3.图片类型，需要接入upload组件
// 4.假设有一个基础数据组件类型button,这时候在自定义组件的时候，需要集成基础类型组件的数据配置问题？【不确定这是否应该是一个进阶功能】
const Setting = (props) => {
  const { form, handleSaveBtnClick } = props;
  console.log(form, 9912);
  // 定义表单编辑类型
  const components = {
    Radio: Radio.Group,
    Checkbox: Checkbox.Group,
    TextArea: Input.TextArea,
    Input: Input,
    FormItem: Form.Item,
    FormList: Form.List,
  };
  const { id, schema } = props;
  console.log(schema, 15);
  if (isEmpty(id) && !id) {
    return <Alert message="请点击设置属性" type="info" />;
  }
  if (isEmpty(schema)) {
    return <Alert message="请点击编辑或该点击无设置属性" type="warning" />;
  }
  // todo: 1. 数据回填  2.复合数据组件封装 3.自定义组件封装实现 4. 多类型编辑展示实现 5.富文本编辑展示实现
  function getFormItem(data, prefix) {
    const { title, component, type, decorator } = data;
    const ActiveComponent = components[component];
    const name = prefix ? [prefix, data.name] : data.name;
    switch (type) {
      case "base":
        return (
          <>
            {Object.keys(data.children).map((key) =>
              getFormItem(data.children[key])
            )}
          </>
        );
      case "string":
        return (
          <Form.Item label={data.label} name={name} rules={data.rules}>
            <ActiveComponent />
          </Form.Item>
        );
      case "array":
        // arrya数据格式还存在问题 && 数组类型的编辑问题
        return (
          <>
            {data.children.map((child, index) => (
              <Form.Item
                label={child.label}
                name={[data.name, index, child.name]}
                key={child.key}
                rules={child.rules}
              >
                {getFormItem(child)}
              </Form.Item>
            ))}
          </>
        );
      case "object":
        return (
          <>
            {Object.keys(data.children).map((key) =>
              getFormItem(data.children[key], data.name)
            )}
          </>
        );
      default:
        return null;
    }
  }
  const handleSubmit = () => {
    handleSaveBtnClick(form.getFieldsValue());
    console.log("submit", form.getFieldsValue());
  };
  return (
    <>
      <Form name="basic" form={form}>
        {getFormItem(schema)}
        <Form.Item shouldUpdate>
          {() => {
            return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
          }}
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleSubmit}>
        Save
      </Button>
    </>
  );
};
export default Setting;
