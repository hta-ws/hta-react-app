import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Widgets = ({ label, data }) => {
  return (
    <Card className='m-1 m-sm-0'>
      <CardBody className='d-flex align-items-center '>
        <div className='flex-grow-1 ms-3 d-flex flex-row flex-sm-column align-items-center'>
          <p className='text-uppercase fw-bold fs-12 text-muted mb-0 me-2 mb-sm-1 me-sm-0'>
            {label || 'Label'}
          </p>
          <h5 className='mb-0 ms-auto ms-sm-0'>
            <span>{data || 'N/A'}</span>
          </h5>
        </div>
      </CardBody>
    </Card>
  );
};

export default Widgets;
