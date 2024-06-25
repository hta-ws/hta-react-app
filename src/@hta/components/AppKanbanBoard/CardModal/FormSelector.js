import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import WidgetForm from './WidgetForm';
import TableForm from './TableForm';
import ChartForm from './ChartForm';

const FormSelector = ({ initialValues, onSubmit, pageId }) => {
  const [selectedType, setSelectedType] = useState(initialValues.type);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  useEffect(() => {
    console;
    setSelectedType(initialValues.type);
    setFormInitialValues(initialValues);
  }, [initialValues]);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setFormInitialValues({
      ...initialValues,
      type: newType,
    });
  };

  const renderSubForm = () => {
    switch (selectedType) {
      case 'widget':
        return (
          <WidgetForm
            initialValues={formInitialValues}
            onSubmit={onSubmit}
            pageId={pageId} // pageId'yi pass edin
          />
        );
      case 'table':
        return (
          <TableForm
            initialValues={formInitialValues}
            onSubmit={onSubmit}
            pageId={pageId} // pageId'yi pass edin
          />
        );
      case 'chart':
        return (
          <ChartForm
            initialValues={formInitialValues}
            onSubmit={onSubmit}
            pageId={pageId} // pageId'yi pass edin
          />
        );
      default:
        return <p>Please select a type</p>;
    }
  };

  return (
    <>
      <Card className='mb-4'>
        <CardBody>
          <Row>
            <Col md='6'>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-muted flex-shrink-0 fw-bold'>
                  Komponent Tipi :{' '}
                </span>
                <Input
                  type='select'
                  name='type'
                  id='type'
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value=''>Select Type</option>
                  <option value='widget'>Widget</option>
                  <option value='table'>Table</option>
                  <option value='chart'>Chart</option>
                </Input>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {renderSubForm()}
    </>
  );
};

FormSelector.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pageId: PropTypes.number.isRequired, // pageId prop tipi
};

export default FormSelector;
