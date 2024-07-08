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
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFsTemplateList } from 'toolkit/selectors';
import AppDataTable from '@hta/components/AppDataTable';
import { TableColumns } from './TableColumns';
import { TableViewBar, SearchBox } from '../../Components';

const DefinitionList = ({ apiState, apiActions }) => {
  const { template, id } = useParams(); // URL parametrelerinden template ve id'yi alıyoruz
  const navigate = useNavigate();
  const fsTemplateList = useSelector(selectFsTemplateList) || [];
  // const [apiState, apiActions] = useGetDataApi({
  //   controller: 'definition',
  //   action: 'get-code-definition-list',
  //   initialData: [],
  //   params: {},
  //   initialCall: false,
  //   method: 'POST',
  // });
  const [selectedRow, setSelectedRow] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(''); // Global filter state

  useEffect(() => {
    if (template) {
      // Template ID'yi almak için fsTemplateList'ten template slug ile eşleşen template'i bul
      const matchedTemplate = fsTemplateList.find(
        (item) => item.slug === template,
      );
      if (matchedTemplate) {
        apiActions.setQueryParams({ fs_template_id: matchedTemplate.id });
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

  const cardStyle = {
    height: 'calc(100vh - 400px)',
    backgroundColor: 'var(--vz-body-bg)',
  };

  const handleSelectRow = (row) => {
    setSelectedRow(row);
    navigate(
      `/admin/financial-result-management/code-definition/${template}/${row.id}`,
    );
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
          <Col md={6}>
            <SearchBox value={globalFilter} onChange={setGlobalFilter} />
          </Col>
          <Col className='col-md-auto ms-auto'>
            <Button
              className='btn btn-soft-info nav-link btn-icon fs-14 active filter-button material-shadow-none btn btn-info'
              onClick={refreshData}
            >
              <i className='ri-refresh-line align-bottom me-1'></i>
            </Button>
          </Col>
        </Row>
        <TableViewBar>
          {apiState.apiData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <AppDataTable
              columns={TableColumns(selectedRow)}
              data={apiState.apiData}
              loading={apiState.loading}
              onSelectRow={handleSelectRow}
              selectedRecord={selectedRow}
              isDraggable={false}
              reorderRow={(fromId, toId) => {
                console.log(`Reorder from ${fromId} to ${toId}`);
              }}
              setGlobalFilter={setGlobalFilter} // SearchBox'dan gelen filtreleme işlevi
              debouncedSearchTerm={globalFilter}
            />
          )}
        </TableViewBar>
      </CardBody>
    </Card>
  );
};

export default DefinitionList;
