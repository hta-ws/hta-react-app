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
import {
  selectFsType,
  selectFsTemplateId,
  selectFsStock,
} from 'toolkit/selectors';
import { useDebounce } from '@hta/hooks/useDebounce';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import AppDataTable from '@hta/components/AppDataTable';
import TypeSelect from './TypeSelect';
import { getTableColumns } from './TableColumns';
import { SearchBox } from '../SearchBox';
import StockSelect from './StockSelect';
import { useGetDataApi } from '@hta/hooks/APIHooks';

export const StyledSimpleBar = styled(SimpleBar)`
  height: calc(100vh - 276px);
`;

function IfrsCodeSelect({ isOpen, toggle, onReportCodeSelect }) {
  const fsType = useSelector(selectFsType);
  const selectedStock = useSelector(selectFsStock);
  const [isDisabled, setIsDisabled] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const columns = useMemo(() => getTableColumns(), []);
  const [disclosureIndex, setDisclosureIndex] = useState(null);

  const [{ apiData, loading, error }, { setQueryParams }] = useGetDataApi({
    controller: 'definition',
    action: 'get-ifrs-code-list',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });

  useEffect(() => {
    if (fsType && selectedStock) {
      setQueryParams({
        stockCode: selectedStock,
        fs_type_id: fsType,
        isDisabled: isDisabled,
      });
    }
  }, [fsType, selectedStock, isDisabled, setQueryParams]);

  useEffect(() => {
    setDisclosureIndex(
      apiData && apiData.length > 0 ? apiData[0].disclosure_index : null,
    );
  }, [apiData]);

  const handleToggleIsDisabled = () => {
    setIsDisabled(isDisabled === 0 ? 1 : 0);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable={true} size={'xl'}>
      <ModalHeader toggle={toggle} className='py-2'>
        Bilanço Kalemi seçimi...
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
                  <StockSelect />
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
                  <AppDataTable
                    columns={columns}
                    data={apiData || []}
                    loading={loading}
                    error={error} // Pass error prop
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
  onReportCodeSelect: PropTypes.func.isRequired,
};

export default IfrsCodeSelect;
