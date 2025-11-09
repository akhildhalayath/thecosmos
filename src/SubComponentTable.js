import React from 'react';
import { Table, Tag } from 'antd';
import SubItemsTable from './SubItemsTable';
import './SubComponentTable.css';

const statusColors = {
  safe: 'green',
  risk: 'orange',
  'moderate risk': 'yellow',
  critical: 'red',
};

const SubComponentTable = ({ items }) => {
  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Risk', dataIndex: 'risk', key: 'risk' },
    { title: 'Moderate', dataIndex: 'moderate', key: 'moderate' },
    { title: 'Safe', dataIndex: 'safe', key: 'safe' },
  ];

  return (
    <Table
      className="sub-table"
      dataSource={items}
      columns={columns}
      pagination={false}
      bordered
      expandable={{
        expandedRowRender: (record) => <SubItemsTable subItems={record.sub_items} />,
        rowExpandable: (record) => record.sub_items.length > 0,
      }}
    />
  );
};

export default SubComponentTable;

