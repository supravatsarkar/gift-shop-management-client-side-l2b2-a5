import React from "react";
import { useGetMangersQuery } from "../../../redux/features/admin/adminApi";
import { Space, Table, TableProps, Tag } from "antd";

interface DataType {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date | string;
  isDeleted: boolean;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Is Deleted",
    dataIndex: "isDeleted",
    key: "isDeleted",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        {/* <a>Invite {record.name}</a> */}
        <a>{!record.isDeleted ? "Restore" : "Delete"}</a>
      </Space>
    ),
  },
];

export default function Managers() {
  const { data, isError } = useGetMangersQuery(undefined);
  console.log({ isError });
  const managers = data?.data as DataType[];
  console.log({ managers });
  const items: DataType[] = managers?.length
    ? managers.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toDateString(),
      }))
    : [];
  return <Table pagination={false} columns={columns} dataSource={items} />;
}
