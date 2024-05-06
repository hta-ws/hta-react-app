import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Row, Col } from 'reactstrap';
import { TableColumns } from './TableColumns';
import DataTable from 'modules/admin/Financial/Reports/Components/DataTable';

const TableView = ({ data, loading }) => {
  console.log(loading);
  const columns = TableColumns();
  return (
    <Row>
      <Col>
        <DataTable data={data} columns={columns} loading={loading} />
      </Col>
    </Row>
  );
};

// Define the prop types
TableView.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool, // Assuming 'data' is an array; adjust accordingly if not
};

export default TableView;
