import React from 'react';
import { Spin, Row } from 'antd';
import './styles.scss';

const Loading = () => {
  return (
    <Row className={'loading'}>
      <Spin />
    </Row>
  );
};
export default Loading;
