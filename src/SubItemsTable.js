// import React from 'react';
// import { Table, Tag } from 'antd';

// const statusColors = {
//   safe: '#237804', // Darker green
//   risk: '#ad4e00', // Darker orange
//   moderate: '#d4b106', // Darker yellow
//   critical: '#a8071a', // Darker red
// };

// const formatDate = (epochTime) => {
//   const date = new Date(epochTime * 1000); // Convert epoch time to milliseconds
//   const options = { day: '2-digit', month: 'long', year: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// };

// const SubItemsTable = ({ subItems }) => {
//   // Extract column keys from the first subItem, excluding the 'key' column
//   const dynamicColumns = subItems.length > 0 ? Object.keys(subItems[0]).filter(key => key !== 'key') : [];

//   // Create columns dynamically based on keys
//   const columns = dynamicColumns.map((key) => {
//     if (key === 'status') {
//       return {
//         title: key.charAt(0).toUpperCase() + key.slice(1),
//         dataIndex: key,
//         key: key,
//         render: (status) => (
//           <Tag
//             style={{ 
//               backgroundColor: statusColors[status.toLowerCase()], 
//               color: 'white', 
//               fontWeight: 'bold',
//             }}
//           >
//             {status.toUpperCase()}
//           </Tag>
//         ),
//       };
//     } else if (key === 'expiry_date') {
//       return {
//         title: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
//         dataIndex: key,
//         key: key,
//         render: (expiry_date) => formatDate(expiry_date),
//       };
//     } else {
//       return {
//         title: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
//         dataIndex: key,
//         key: key,
//       };
//     }
//   });

//   return (
//     <Table
//       className="sub-items-table"
//       dataSource={subItems}
//       columns={columns}
//       pagination={false}
//       bordered
//     />
//   );
// };

// export default SubItemsTable;

import React from 'react';
import { Table, Tag, Popover, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const statusColors = {
  safe: '#237804', // Darker green
  risk: '#ad4e00', // Darker orange
  moderate: '#d4b106', // Darker yellow
  critical: '#a8071a', // Darker red
  healthy: '#237804', // Darker green
};

const formatDate = (epochTime) => {
  const date = new Date(epochTime * 1000); // Convert epoch time to milliseconds
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const SubItemsTable = ({ subItems }) => {
  // Ensure subItems is an array
  if (!Array.isArray(subItems)) {
    console.error("subItems is not an array", subItems);
    return null;
  }

  // Extract column keys from the first subItem, excluding the 'key' column
  const dynamicColumns = subItems.length > 0 ? Object.keys(subItems[0]).filter(key => key !== 'key') : [];

  // Create columns dynamically based on keys
  const columns = dynamicColumns.map((key) => {
    if (key === 'status') {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (status) => (
          <Tag
            style={{
              backgroundColor: statusColors[status.toLowerCase()],
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {status.toUpperCase()}
          </Tag>
        ),
      };
    } else if (key === 'expiry_date') {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
        dataIndex: key,
        key: key,
        render: (expiry_date) => formatDate(expiry_date),
      };
    } else if (key === 'inspections' || key === 'services') {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
        render: (items) => {
          // Ensure items is an array
          if (!Array.isArray(items)) {
            console.error(`${key} is not an array`, items);
            return <span>0</span>;
          }

          return (
            <>
              <span>{items.length}</span>
              <Popover
                content={(
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                title={`${key.charAt(0).toUpperCase() + key.slice(1)} Details`}
              >
                  <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
              </Popover>
            </>
          );
        },
      };
    } else {
      return {
        title: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
        dataIndex: key,
        key: key,
      };
    }
  });

  return (
    <Table
      className="sub-items-table"
      dataSource={subItems}
      columns={columns}
      pagination={false}
      bordered
    />
  );
};

export default SubItemsTable;
