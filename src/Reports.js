import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CarOutlined } from '@ant-design/icons'; // Import Ant Design car icon
import './Reports.css'; // Import custom styles
import vehicleHealthBanner from './images/vehicle_health_banner.png'; // Adjust path as necessary
import tekionImage from './images/tekionlogo.png'; // Add your sample image

const { Title, Text } = Typography;

const Reports = () => {
  return (
    <div className="reports-container">
      {/* <div className="top-left-image-container">
        <img src={tekionImage} alt="Sample" className="sample-image" />
      </div> */}

      {/* Add the banner image */}
      {/* <div className="banner-container">
        <img src={vehicleHealthBanner} alt="Vehicle Health Management" className="vehicle-banner" />
      </div> */}

      <div className="reports-header">
        {/* Add car logo above the title */}
        <div className="car-logo-container">
          <CarOutlined style={{ fontSize: '48px', color: '#fff' }} />
        </div>
        <Title level={2} style={{ color: '#fff' }}>
          Vehicle Health Management
        </Title>
        <Text style={{ color: '#dcdcdc' }}>Review and manage all Vehicle Health Management Details in one place.</Text>
      </div>

      <div className="reports-content">
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col>
            <Link to="/main-report">
              <Button type="primary" size="large" className="reports-button">
                Go to Main Report
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
