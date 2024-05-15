import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'reactstrap';
import Widgets from './components/Widgets';
import { useGetDataApi } from '@hta/hooks/APIHooks';

// Recursive component to render nested structures
const RecursiveRenderer = ({ item }) => {
  if (item.type === 'Row') {
    const numChildren = item.children ? item.children.length : 1;
    let colSize = Math.round(12 / numChildren);
    colSize = Math.min(colSize, 12); // Ensure colSize does not exceed 12

    return (
      <>
        {item.title && (
          <div className='col-12 col-md-6 col-lg-2'>
            <div className='m-1 m-sm-0 card d-sm-none border-0'>
              <div className='card-body'>
                <h3 className='text-center mb-0 text-uppercase fw-bold fs-12 text-muted'>
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        )}
        <Row className='mb-3'>
          {item.children.map((child) => (
            <Col key={child.id} xs='12' md='6' lg={colSize}>
              <RecursiveRenderer item={child} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

  if (item.type === 'widget') {
    return <Widgets label={item.metadata.Label} data={item.metadata.data} />;
  }

  return null; // Return nothing if item type isn't recognized
};

// Adding PropTypes and defaultProps
RecursiveRenderer.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    metadata: PropTypes.object,
  }),
};

RecursiveRenderer.defaultProps = {
  item: {
    children: [],
    metadata: {},
  },
};

const Ozet = () => {
  const [apiStates, apiActions] = useGetDataApi({
    controller: 'report',
    action: 'get-report-data',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });

  const { apiData, loading, error } = apiStates;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data!</div>;
  }

  return (
    <Container fluid>
      {apiData.map((item) => (
        <RecursiveRenderer key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Ozet;
