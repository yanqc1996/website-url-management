/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useRef } from "react";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown } from "antd";
import { getTableList, addUrlList } from "@services/table";
// import { useHistory } from "react-router";
import { createHashHistory } from "history";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const editor = (record: any) => {
  // const history = useHistory();
  const history = createHashHistory();
  console.log(record, 99999);
  history.push("/editor");
};
export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const addUrl = async () => {
  // Todo:创建页面 待补充弹窗
  console.log("addUrl");
  await addUrlList({ url: "/lp/test", des: "test" });
};

type GithubIssueItem = {
  id: string;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
  updated_at: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    editable: false,
    title: "页面地址",
    dataIndex: "url",
    copyable: true,
    ellipsis: true,
  },
  {
    editable: false,
    title: "页面描述",
    dataIndex: "des",
    // copyable: true,
    ellipsis: true,
  },
  {
    title: "创建时间",
    key: "showTime",
    dataIndex: "created_at",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "最后修改时间",
    key: "updateTime",
    dataIndex: "update_at",
    valueType: "date",
    sorter: true,
    hideInSearch: true,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a key="editable" onClick={() => editor(record)}>
        编辑
      </a>,
      <a key="view">查看</a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        await waitTime(500);

        const res = await getTableList();
        console.log(res);
        return {
          data: res.data,
          // success 请返回 true，
          // 不然 table 会停止解析数据，即使有数据
          success: true,
          // success: res.code === 200,
          // 不传会使用 data 的长度，如果是分页一定要传
          // total: number,
        };
      }}
      editable={{
        type: "multiple",
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            addUrl();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: "1st item",
                key: "1",
              },
              {
                label: "2nd item",
                key: "2",
              },
              {
                label: "3rd item",
                key: "3",
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default TablePage;
