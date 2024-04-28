import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Row,
  Col,
} from 'reactstrap';
import ToggleSwitch from './ToggleSwitch';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';
import { useDebounce } from '@hta/hooks/useDebounce';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';

import DataTable from '../DataTable';
import TypeSelect from '../TypeSelect';
import { getTableColumns } from './TableColumns'; // Import columns configuration
import SearchBox from './SearchBox';
import SampleStockCodeSelect from '../SampleStockCodeSelect';
export const StyledSimpleBar = styled(SimpleBar)`
  height: calc(100vh - 276px);
`;

function IfrsCodeSelect({
  isOpen,
  toggle,

  onReportCodeSelect,
}) {
  const { financialStatementTypeId, selectedSampleStockCode } = useSelector(
    (state) => state.admin,
  );
  const [isDisabled, setIsDisabled] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');
  const [globalFilter, setGlobalFilter] = React.useState('');
  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const columns = useMemo(() => getTableColumns(), []);
  const [{ apiData }, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-financial-data',
    [],
    {
      stockCode: 'SASA',
      financialStatementTypeId: financialStatementTypeId,
      isDisabled: isDisabled,
    },
    false,
    null,
    'GET',
  );
  const [disclosureIndex, setDisclosureIndex] = useState(null);

  useEffect(() => {
    setDisclosureIndex(
      apiData && apiData.length > 0 ? apiData[0].disclosure_index : null,
    );
  }, [apiData]);

  useEffect(() => {
    if (financialStatementTypeId && selectedSampleStockCode) {
      setQueryParams({
        stockCode: selectedSampleStockCode,
        financialStatementTypeId: financialStatementTypeId,
        isDisabled: isDisabled,
      });
    }
  }, [financialStatementTypeId, selectedSampleStockCode, isDisabled]);

  const handleToggleIsDisabled = () => {
    setIsDisabled(isDisabled === 0 ? 1 : 0);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable={true} size={'xl'}>
      <ModalHeader toggle={toggle} className='py-2'>
        Bilanço Kalemi seçimill
      </ModalHeader>
      <ModalBody className='py-1'>
        <Card>
          <CardBody className='border-0'>
            <Row className='justify-content-between gy-1 mb-2'>
              <Col lg={4}>
                <SearchBox
                  value={globalFilter}
                  onChange={(value) => setGlobalFilter(value)}
                />
              </Col>
              <Col className='col-lg-auto'>
                <div className='d-flex gap-2 flex-wrap'>
                  <ToggleSwitch
                    isChecked={isDisabled}
                    onChange={handleToggleIsDisabled}
                    label='Tüm Kalemler'
                  />
                  <SampleStockCodeSelect />
                  <TypeSelect />
                  {disclosureIndex && (
                    <div className='flex-shrink-0'>
                      <button
                        type='button'
                        className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
                        onClick={() =>
                          window.open(
                            `https://www.kap.org.tr/Bildirim/${disclosureIndex}`,
                            '_blank',
                          )
                        }
                      >
                        <i className='ri-external-link-fill align-bottom'></i>
                      </button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <StyledSimpleBar>
                  <DataTable
                    columns={columns}
                    data={apiData || []}
                    onRowClick={(selectedData) => {
                      onReportCodeSelect(selectedData);
                      toggle();
                    }}
                    debouncedSearchTerm={debouncedSearchTerm}
                    setGlobalFilter={setGlobalFilter}
                    toggle={toggle}
                    onSelectRow={onReportCodeSelect}
                  />
                </StyledSimpleBar>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}

IfrsCodeSelect.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  financialStatementFormatCode: PropTypes.number.isRequired,
  onReportCodeSelect: PropTypes.func.isRequired,
};

export default IfrsCodeSelect;
