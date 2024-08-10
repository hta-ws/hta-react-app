import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from 'reactstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFsTemplateList } from 'toolkit/selectors';
import AppDataTable from '@hta/components/AppDataTable';
import { TableColumns } from './TableColumns';
import { TableViewBar, SearchBox, DragToggleHeader } from '../../Components'; // Added DragToggleHeader
import PropTypes from 'prop-types';

const DefinitionList = ({ apiState, apiActions }) => {
  const { template, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fsTemplateList = useSelector(selectFsTemplateList) || [];

  const [selectedRow, setSelectedRow] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(''); // Global filter state
  const [isDraggable, setIsDraggable] = useState(false); // State to manage draggable
  const [isSortable, setIsSortable] = useState(true); // State to manage sortable
  const [data, setData] = useState(apiState.apiData); // State to manage table data
  const [isChanged, setIsChanged] = useState(false); // State to manage save button visibility

  useEffect(() => {
    if (template) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      if (matchedTemplate) {
        apiActions.setQueryParams({ fs_template_id: matchedTemplate.id });
        setIsChanged(false); // Reset isChanged when template changes
        setIsDraggable(false); // Reset isDraggable when template changes
        setIsSortable(true); // Ensure sorting is enabled initially
      }
    }
  }, [template]);

  useEffect(() => {
    if (id && apiState.apiData.length > 0) {
      const matchedRow = apiState.apiData.find(
        (row) => row.id === parseInt(id),
      );
      setSelectedRow(matchedRow || null);
    } else {
      setSelectedRow(null);
    }
  }, [id, apiState.apiData]);

  useEffect(() => {
    setData(apiState.apiData);
  }, [apiState.apiData]);

  const handleSelectRow = (row) => {
    if (!isDraggable) {
      setSelectedRow(row);
      navigate(
        `/admin/financial-result-management/code-definition/${template}/${row.id}`,
      );
    }
  };

  const refreshData = () => {
    if (template) {
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      if (matchedTemplate) {
        apiActions.setQueryParams({ fs_template_id: matchedTemplate.id });
      }
    }
  };

  const handleToggleDrag = () => {
    setIsDraggable(!isDraggable);
    setIsSortable(!isSortable);
    // Set sortable to the opposite of draggable
    if (!isDraggable) {
      navigate(`${getBasePath()}/${template}`);
      setGlobalFilter('');
    }
    refreshData();
  };

  const getBasePath = () => {
    const parts = location.pathname.split('/');
    if (template && id) {
      return parts.slice(0, -2).join('/');
    } else if (template) {
      return parts.slice(0, -1).join('/');
    }
    return parts.join('/');
  };

  const reorderRow = (fromId, toId) => {
    const updatedData = [...data];

    const fromIndex = updatedData.findIndex((item) => item.id === fromId);
    const toIndex = updatedData.findIndex((item) => item.id === toId);

    if (fromIndex === -1 || toIndex === -1) {
      console.error('Invalid indices for reordering');
      return;
    }

    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);

    // Update sort_order values
    const sortedData = updatedData.map((item, index) => ({
      ...item,
      sort_order: (index + 1) * 10,
    }));

    setData(sortedData);
    setIsChanged(true); // Show save button
  };

  const handleSaveOrder = () => {
    const sortedData = data.map((item, index) => ({
      id: item.id,
      sort_order: index + 1,
    }));

    apiActions.submitData(
      sortedData,
      'POST',
      'save-definition-order',
      (response) => {
        if (response?.code == 0) {
          setIsChanged(false); // Hide save button after save
          setIsSortable(true);
          refreshData();
          setIsDraggable(false);
        }
      },
    );
  };

  if (apiState.loading) {
    return <Spinner color='primary' />;
  }

  if (apiState.error) {
    return <Alert color='danger'>{apiState.error}</Alert>;
  }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Bilanço Rasyo Tanımlama</h5>
      </CardHeader>
      <CardBody>
        <Row className='mb-3'>
          {!isDraggable && (
            <Col md={6}>
              <SearchBox value={globalFilter} onChange={setGlobalFilter} />
            </Col>
          )}
          <Col className='col-md-auto ms-auto d-flex align-items-center'>
            <DragToggleHeader
              isDraggable={isDraggable}
              onToggleDrag={handleToggleDrag}
            />

            <Button
              className='btn btn-ghost-secondary btn-icon btn-sm fs-16 material-shadow-none'
              onClick={refreshData}
            >
              <i className='ri-refresh-line align-bottom'></i>
            </Button>
            {isChanged && (
              <Button
                className='btn btn-success ms-2'
                onClick={handleSaveOrder}
              >
                <i className='ri-save-line align-bottom me-1'></i>
                Save Order
              </Button>
            )}
          </Col>
        </Row>
        <TableViewBar>
          {apiState.apiData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <AppDataTable
              columns={TableColumns(selectedRow)}
              data={data}
              loading={apiState.loading}
              onSelectRow={handleSelectRow}
              selectedRecord={selectedRow}
              isDraggable={isDraggable} // Set draggable state
              isSortable={isSortable} // Set sortable state
              reorderRow={reorderRow} // Reorder row function
              setGlobalFilter={setGlobalFilter} // SearchBox'dan gelen filtreleme işlevi
              debouncedSearchTerm={globalFilter}
            />
          )}
        </TableViewBar>
      </CardBody>
    </Card>
  );
};

DefinitionList.propTypes = {
  apiState: PropTypes.shape({
    apiData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  apiActions: PropTypes.shape({
    setQueryParams: PropTypes.func.isRequired,
    submitData: PropTypes.func.isRequired,
  }).isRequired,
};

export default DefinitionList;
