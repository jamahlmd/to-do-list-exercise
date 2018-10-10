import React from 'react';
import { Row, Col } from 'antd';


const Header = () => (
  <div className="header">
      <Row>
          <Col md={{span: 8, offset:8}} xs={{span: 20, offset:2}}>
              Todo list
          </Col>
      </Row>
  </div>
);

export default Header;