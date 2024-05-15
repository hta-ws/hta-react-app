import React from 'react';
import { Row, Col, Table, Container, Card, CardBody } from 'reactstrap';
import Widgets from './components/Widgets';
import { useGetDataApi } from '@hta/hooks/APIHooks';
// Recursive component to render nested structures
const RecursiveRenderer = ({ item }) => {
  if (item.type === 'Row') {
    return (
      <Row className='mb-3'>
        {item.children &&
          item.children.map((child) => (
            <Col key={child.id} xs='12' md='6' lg='4'>
              <RecursiveRenderer item={child} />
            </Col>
          ))}
      </Row>
    );
  }

  // Assume "widget" type is used for actual widgets/cards
  if (item.type === 'widget') {
    return (
      <Card className='mb-3'>
        <CardBody>
          <h5>{item.metadata.Label || 'Widget'}</h5>
          <p>Data: {item.metadata.data || 'N/A'}</p>
        </CardBody>
      </Card>
    );
  }

  return null; // Return nothing if item type isn't recognized
};
const Ozet = () => {
  const [apiStates, apiActions] = useGetDataApi({
    controller: 'report',
    action: 'get-report-data',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });
  const divs = Array.from({ length: 6 }, (_, index) => index + 1);
  const { apiData, loading } = apiStates;
  console.log(apiData);
  return (
    <Container fluid>
      {apiData &&
        apiData.map((item) => <RecursiveRenderer key={item.id} item={item} />)}
      <Row>
        <h1>title</h1>
      </Row>
      <div className='d-none d-md-block'>
        <Row>
          {divs.map((num) => (
            <Widgets key={num} />
          ))}
        </Row>
      </div>
      <Row className='d-xs-block d-md-none'>
        <Col xs='12' md='6' lg='2'>
          <Card>
            <CardBody>
              <Table striped className=' w-100'>
                <tbody>
                  {divs.map((num, index) => (
                    <tr key={index}>
                      <td>
                        <p className='text-uppercase fw-bold fs-12 text-muted mb-0 me-2 mb-sm-1 me-sm-0'>
                          FK
                        </p>
                      </td>
                      <td className='text-end'>
                        <h5 className='mb-0 ms-auto ms-sm-0'>
                          <span>424.005.000₺</span>
                        </h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Ozet;
