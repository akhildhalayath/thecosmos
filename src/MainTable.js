import React, { useState, useEffect } from 'react';
import { Table, Radio, Select, Row, Col, Button, Modal, Progress, Tooltip, Spin } from 'antd';
import RowCharts from './RowCharts';
import SubComponentTable from './SubComponentTable';
import { fetchDataSource } from './apiService';
import './MainTable.css';

const { Option } = Select;
const statusOptions = ['Safe', 'Moderate Risk', 'High Risk', 'Critical'];

const MainTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [expandAllSelected, setExpandAllSelected] = useState(false);
  const [selectedVIN, setSelectedVIN] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchDataSource();
        setDataSource(data.data);
        setFilteredData(data.data);
      } catch (error) {
        console.error('Failed to fetch data source:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const filtered = dataSource.filter((record) => {
      const vinMatch = selectedVIN.length === 0 || selectedVIN.includes(record.vin);
      const healthMatch = selectedHealth.length === 0 || selectedHealth.includes(record.vehicle_health);
      return vinMatch && healthMatch;
    });

    setFilteredData(filtered);
    setExpandedRowKeys([]);
    setExpandAllSelected(false);
  };

  const handleFilterChange = (values, key) => {
    if (key === 'vin') {
      setSelectedVIN(values);
    } else if (key === 'vehicle_health') {
      setSelectedHealth(values);
    }
  };

  const resetFilters = () => {
    setSelectedVIN([]);
    setSelectedHealth([]);
    setFilteredData(dataSource);
    setExpandedRowKeys([]);
    setExpandAllSelected(false);
  };

  const onRadioChange = (e) => {
    const { value } = e.target;
    if (value === 'expand') {
      setExpandedRowKeys(filteredData.map((item) => item.key));
    } else {
      setExpandedRowKeys([]);
    }
    setExpandAllSelected(value === 'expand');
  };

  const showModal = (items) => {
    setModalItems(items);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getHealthProgress = (health) => {
    switch (health.toLowerCase()) {
      case 'safe':
        return { percent: 80, status: 'active', strokeColor: '#52c41a', tooltip: 'Vehicle is in safe condition.' };
      case 'moderate risk':
        return { percent: 60, status: 'active', strokeColor: '#faad14', tooltip: 'Vehicle has some moderate risks.' };
      case 'high risk':
        return { percent: 40, status: 'exception', strokeColor: '#fa541c', tooltip: 'Vehicle is at risk.' };
      case 'critical':
        return { percent: 20, status: 'exception', strokeColor: '#f5222d', tooltip: 'Vehicle is in critical condition.' };
      default:
        return { percent: 0, status: 'normal', strokeColor: '#d9d9d9', tooltip: 'Unknown vehicle health status.' };
    }
  };

  const columns = [
    { title: 'VIN', dataIndex: 'vin', key: 'vin', fixed: 'left', width: 200 },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Make', dataIndex: 'make', key: 'make' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    {
      title: 'Previous Mileage',
      dataIndex: 'previous_mileage',
      key: 'previous_mileage',
      sorter: (a, b) => a.previous_mileage - b.previous_mileage,
    },
    {
      title: 'Estimated Current Mileage',
      dataIndex: 'estimated_current_mileage',
      key: 'estimated_current_mileage',
      sorter: (a, b) => a.estimated_current_mileage - b.estimated_current_mileage,
    },
    {
      title: 'Vehicle Health',
      dataIndex: 'vehicle_health',
      key: 'vehicle_health',
      render: (health) => {
        const progress = getHealthProgress(health);
        return (
          <Tooltip title={progress.tooltip}>
            <Progress percent={progress.percent} status={progress.status} strokeColor={progress.strokeColor} />
          </Tooltip>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record.items)}>
          Show Charts
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Row gutter={16} align="middle">
            <Col>
              <Select
                mode="multiple"
                placeholder="Filter by VIN"
                style={{ width: 180 }}
                value={selectedVIN}
                onChange={(values) => handleFilterChange(values, 'vin')}
              >
                {dataSource.map((record) => (
                  <Option key={record.vin} value={record.vin}>
                    {record.vin}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Select
                mode="multiple"
                placeholder="Filter by Vehicle Health"
                style={{ width: 180 }}
                value={selectedHealth}
                onChange={(values) => handleFilterChange(values, 'vehicle_health')}
              >
                {statusOptions.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col>
              <Button onClick={applyFilters} type="primary">
                Apply Filters
              </Button>
            </Col>
            <Col>
              <Row align="middle">
                <Button onClick={resetFilters} style={{ marginLeft: 8 }}>
                  Reset Filters
                </Button>
                <strong style={{ marginLeft: 16 }}>Total Records: {filteredData.length}</strong>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Radio.Group onChange={onRadioChange} value={expandAllSelected ? 'expand' : 'collapse'}>
            <Radio value="expand">Expand All</Radio>
            <Radio value="collapse">Collapse All</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Table
        className="custom-table"
        dataSource={filteredData}
        columns={columns}
        bordered
        scroll={{ y: 400, x: '100%' }}
        pagination={{ pageSize: 50 }}  // Set pagination with 50 records per page
        expandable={{
          expandedRowRender: (record) => <SubComponentTable items={record.items} />,
          rowExpandable: (record) => record.items.length > 0,
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: (expandedRows) => setExpandedRowKeys(expandedRows),
        }}
      />
      <Modal
        title="Charts"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1190}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <RowCharts items={modalItems} />
      </Modal>
    </div>
  );
};

export default MainTable;

