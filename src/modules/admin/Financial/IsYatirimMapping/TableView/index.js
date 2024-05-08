import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Row, Col } from 'reactstrap';
import { financialDataColumns } from './FinancialDataColumns';
import DataTable from '../../Reports/Components/DataTable';
import SelectIfrsCode from '../SelectIfrsCode';
import AppApiStatusHandler from '@hta/components/AppApiStatusHandler';

const TableView = ({
  data,
  loading,
  handleRefresh,
  error,
  debouncedSearchTerm,
  setGlobalFilter,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const columns = React.useMemo(() => financialDataColumns(), []);

  const onSelectRow = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Row>
        <Col>
          {error ? (
            <AppApiStatusHandler
              loading={loading}
              error={error}
              onRetry={handleRefresh}
            />
          ) : (
            <Row>
              <Col md={12}>
                <DataTable
                  data={data}
                  columns={columns}
                  loading={loading}
                  onSelectRow={onSelectRow}
                  debouncedSearchTerm={debouncedSearchTerm}
                  setGlobalFilter={setGlobalFilter}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <SelectIfrsCode
        isOpen={modalOpen}
        toggle={toggleModal}
        selectedRowData={selectedRow}
        handleRefresh={handleRefresh}
      />
    </>
  );
};

// Define the prop types
TableView.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  handleRefresh: PropTypes.func.isRequired,
  error: PropTypes.any, // Ensure this function is passed to the component
  debouncedSearchTerm: PropTypes.string,
  setGlobalFilter: PropTypes.func,
};

export default TableView;
