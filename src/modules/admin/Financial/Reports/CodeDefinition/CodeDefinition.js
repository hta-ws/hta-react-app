import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';

import AppMetaTags from '@hta/components/AppMetaTags';
import DefinitionList from './DefinitionList';
import DefinitionForm from './DefinitionForm';

const CodeDefinition = () => {
  const { id } = useParams(); // URL parametresinden id alınıyor
  const title = 'Rapor Formul ve Hesaplama Tanımlamaları';
  const description = 'Rapor Kodları ve Etiketleri Tanımlamak için kullanılır';

  const cardStyle = {
    height: 'calc(100vh - 200px)',
    backgroundColor: 'var(--vz-body-bg)',
  };

  return (
    <>
      <AppMetaTags title={title} description={description} />
      <Card style={cardStyle}>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <h2>{title}</h2>
          <div>
            <Button color='primary' className='me-2'>
              Action 1
            </Button>
            <Button color='secondary'>Action 2</Button>
          </div>
        </CardHeader>
        <CardBody className='p-0'>
          <Row className='gx-1'>
            {' '}
            {/* 'gx-3' className'i kolonsal boşluk ekler */}
            <Col md={id ? '6' : '12'}>
              <DefinitionList />
            </Col>
            {id && (
              <Col md={6}>
                <DefinitionForm />
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default CodeDefinition;
