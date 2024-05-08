import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppFormatter from '@hta/components/AppFormatter';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import AppPromptModal from '@hta/components/AppPromptModal';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { getTableColumns } from './TableColumns';
import { useDebounce } from '@hta/hooks/useDebounce';
import DataTable from '../../Reports/Components/DataTable';
const SelectIfrsCode = ({ isOpen, toggle, selectedRowData, handleRefresh }) => {
  const [runModal, setRunModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const stockCode = selectedRowData?.stock_code || null;
  const period = selectedRowData?.period || null;
  const value = selectedRowData?.value || '';
  const [globalFilter, setGlobalFilter] = useState(value);
  // const debouncedValue = useDebounce(value, 100);
  const [{ apiData: data }, apiActions] = useGetDataApi({
    controller: 'financial-mapping',
    action: 'get-kap-data',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });
  const { submitData } = apiActions;
  useEffect(() => {
    apiActions.setQueryParams({
      stockCode: stockCode,
      period: period,
    });
  }, [period, stockCode]);

  const onSelectRow = (row) => {
    setSelectedRow(row);
    setRunModal(true);
  };
  useEffect(() => {
    // Önce selectedRowData'nın value değerinin kontrolü yapılıyor
    if (
      selectedRowData &&
      selectedRowData.value &&
      selectedRowData.value !== 0
    ) {
      setGlobalFilter(String(parseInt(selectedRowData.value, 10)));
    } else if (selectedRowData && selectedRowData.item_desc_tr) {
      // item_desc_tr varsa ve value istenilen koşulu sağlamıyorsa,
      // item_desc_tr'nin ilk 25 karakterini al
      setGlobalFilter(selectedRowData.item_desc_tr.substring(0, 25));
    }
  }, [selectedRowData]);
  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const columns = useMemo(() => getTableColumns(), []);

  const handleRunTask = () => {
    let sData = {
      itemCode: selectedRowData?.item_code,
      ifrsCode: selectedRow?.ifrs_code,
    };
    submitData(sData, 'POST', 'update-mapping', (response) => {
      if (response?.code === 0) {
        // İşlem başarılıysa, başarılı bildirimi yap
        toast.success('Görev başarıyla başlatıldı!', {
          autoClose: 3000, // 3 saniye sonra otomatik kapanır
        });
        handleRefresh();
        toggle();
        // handleRefresh();
      } else {
        let errorMessage = 'HATA ALINDI';

        if (response?.error) {
          // If response contains an error object, check its structure
          if (typeof response.error === 'object') {
            errorMessage = Object.values(response.error).flat().join(', ');
          } else {
            errorMessage = response.error.toString();
          }
        } else if (response?.message) {
          // If response contains a direct message
          errorMessage = response.message;
        }

        // Display the error message in a toast
        toast.error(errorMessage, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });

    setRunModal(false);
  };
  const onClickDeleteRow = () => {
    setDeleteModal(true);
  };
  const handleDeleteRecord = () => {
    setDeleteModal(false);
    let sData = {
      itemCode: selectedRowData?.item_code,
      ifrsCode: selectedRowData?.ifrs_code,
    };
    submitData(sData, 'POST', 'delete-mapping', (response) => {
      if (response?.code === 0) {
        // İşlem başarılıysa, başarılı bildirimi yap
        toast.success('Görev başarıyla başlatıldı!', {
          autoClose: 3000, // 3 saniye sonra otomatik kapanır
        });
        handleRefresh();
        toggle();
        // handleRefresh();
      } else {
        let errorMessage = 'HATA ALINDI';

        if (response?.error) {
          // If response contains an error object, check its structure
          if (typeof response.error === 'object') {
            errorMessage = Object.values(response.error).flat().join(', ');
          } else {
            errorMessage = response.error.toString();
          }
        } else if (response?.message) {
          // If response contains a direct message
          errorMessage = response.message;
        }

        // Display the error message in a toast
        toast.error(errorMessage, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} size='xl' fullscreen>
        <ModalHeader toggle={toggle}>
          Kap Bilanço Karşılıgını seçiniz....
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardHeader>
              <Row className='justify-content-between gy-1 mb-2'>
                <Col lg={12}>
                  <Table className='table-warning mb-2'>
                    <thead>
                      <tr>
                        <th className='text-end' style={{ width: '30%' }}>
                          {selectedRowData?.item_desc_tr}
                        </th>
                        <td className='text-start' style={{ width: '10%' }}>
                          {selectedRowData?.value ? (
                            <AppFormatter
                              value={selectedRowData?.value}
                              format={{ type: 'number', decimal: 0 }}
                              Tag='span'
                            />
                          ) : (
                            '-'
                          )}
                        </td>
                        <th className='text-end' style={{ width: '30%' }}>
                          {selectedRowData?.taxonomy_title_content_tr}

                          {selectedRowData?.taxonomy_title_content_tr
                            ? selectedRowData?.taxonomy_title_content_tr
                            : 'Eşleşeme yapılmadı...'}
                        </th>
                        <td className='text-start' style={{ width: '10%' }}>
                          {selectedRowData?.donemsel ? (
                            <AppFormatter
                              value={selectedRowData?.donemsel}
                              format={{ type: 'number', decimal: 0 }}
                              Tag='span'
                            />
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className='text-end' style={{ width: '10%' }}>
                          {selectedRowData?.taxonomy_title_content_tr && (
                            <Button
                              size='sm'
                              color='danger'
                              onClick={() => onClickDeleteRow()}
                            >
                              Eşleştirmeyi Sil
                            </Button>
                          )}
                        </td>
                      </tr>
                    </thead>
                  </Table>
                </Col>
              </Row>
              <Row className='justify-content-between gy-1 mb-2'>
                <Col lg={4}>
                  <SearchBox
                    value={globalFilter}
                    onChange={(value) => setGlobalFilter(value)}
                  />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <DataTable
                columns={columns}
                data={data || []}
                // onRowClick={(selectedData) => {
                //   onReportCodeSelect(selectedData);
                //   toggle();
                // }}
                debouncedSearchTerm={debouncedSearchTerm}
                setGlobalFilter={setGlobalFilter}
                //toggle={toggle}
                onSelectRow={onSelectRow}
              />
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
      {runModal && (
        <AppPromptModal
          title='Eşleştirme Kaydedilecek'
          subject={{
            __html: `${selectedRowData?.item_desc_tr} - ${selectedRow?.taxonomy_title_content_tr} <br/> eşleştirmesi kaydedilecek. Emin misiniz?`,
          }}
          show={runModal}
          onDeleteClick={() => handleRunTask()}
          onCloseClick={() => setRunModal(false)}
        />
      )}
      {deleteModal && (
        <AppPromptModal
          title='Eşleştirme Silinecek'
          subject={{
            __html: `${selectedRowData?.item_desc_tr} - ${selectedRowData?.taxonomy_title_content_tr} <br/> eşleştirmesi silinecek. Emin misiniz?`,
          }}
          show={deleteModal}
          onDeleteClick={() => handleDeleteRecord()}
          onCloseClick={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};

SelectIfrsCode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRowData: PropTypes.object.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  onReportCodeSelect: PropTypes.func.isRequired,
};
export default SelectIfrsCode;
