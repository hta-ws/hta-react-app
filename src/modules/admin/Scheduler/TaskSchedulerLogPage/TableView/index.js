import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Row, Col } from 'reactstrap';
import { TableColumns } from './TableColumns';
import DataTable from 'modules/admin/Financial/Reports/Components/DataTable';

const TableView = ({ data }) => {
  const columns = TableColumns();
  return (
    <Row>
      <Col>
        <DataTable
          data={data}
          columns={columns}
          //   onSelectRow={setSelectedRow}
          //   debouncedSearchTerm={debouncedSearchTerm}
          //   setGlobalFilter={setGlobalFilter}
          //   loading={loading}
        />
      </Col>
    </Row>
  );
};

// Define the prop types
TableView.propTypes = {
  data: PropTypes.array.isRequired, // Assuming 'data' is an array; adjust accordingly if not
};

export default TableView;
