import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Table,
  Input,
  Row,
  Col,
} from 'reactstrap';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';
import { useDebounce } from '@hta/hooks/useDebounce';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import AppFinancialSampleStockSelect from '../AppFinancialSampleStockSelect';
import AppFinancialTypeSelect from '../AppFinancialTypeSelect';

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const searchValue = row.getValue(columnId).toLocaleLowerCase('tr-TR');
  const filterValue = value.toLocaleLowerCase('tr-TR');
  console.log('serchValue', searchValue, 'filterValue', filterValue);
  const itemRank = rankItem(searchValue, filterValue);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};
const columns = [
  {
    accessorFn: (row) => row.id,
    id: 'id',
    header: () => <span>id</span>,
    cell: (info) => info.getValue(),
    enableSorting: true,
    filterFn: fuzzyFilter,
  },
  {
    accessorFn: (row) => row.label,
    id: 'label',
    header: () => <span>Açıklama</span>,
    cell: (info) => info.row.original.taxonomy_title_content_tr,
    enableSorting: true,
    filterFn: 'fuzzyFilter',
  },
  {
    accessorFn: (row) => row.value1,
    id: 'v1',
    header: () => <span>Bu Dönem</span>,
    cell: (info) =>
      typeof info.getValue() === 'number' && info.getValue() !== 0
        ? numberFormatter.format(info.getValue())
        : '',
    cellStyle: { textAlign: 'right' },
    enableSorting: true,
    enableGlobalFilter: false,
  },
  {
    accessorFn: (row) => row.value2,
    id: 'v2',
    header: () => <span>Önceki Dönem</span>,
    cell: (info) =>
      typeof info.getValue() === 'number' && info.getValue() !== 0
        ? numberFormatter.format(info.getValue())
        : '',
    cellStyle: { textAlign: 'right' },
    enableSorting: true,
    enableGlobalFilter: false,
  },
];

export const StyledSimpleBar = styled(SimpleBar)`
  height: calc(100vh - 276px);
`;

function AppSelectIFRSCodeModal({
  isOpen,
  toggle,
  financialStatementFormatCode,
  onReportCodeSelect,
}) {
  const [sorting, setSorting] = useState([]);
  const [isDisabled, setIsDisabled] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');
  const [globalFilter, setGlobalFilter] = React.useState('');
  const debouncedSearchTerm = useDebounce(globalFilter, 500);
  const [financialStatementTypeId, setfinancialStatementTypeId] = useState(-1);
  const [selectedStockCode, setSelectedStockCode] = useState(null);
  const [{ apiData }, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-financial-data',
    [],
    {
      stockCode: selectedStockCode,
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

  const table = useReactTable({
    data: apiData || [],
    columns,
    state: {
      sorting,
      globalFilter: debouncedSearchTerm,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableSorting: true,
    onGlobalFilterChange: setGlobalFilter,
  });
  const clearInput = () => {
    setGlobalFilter('');
  };

  useEffect(() => {
    if (financialStatementTypeId && selectedStockCode) {
      setQueryParams({
        stockCode: selectedStockCode,
        financialStatementTypeId: financialStatementTypeId,
        isDisabled: isDisabled,
      });
    }
  }, [financialStatementTypeId, selectedStockCode, isDisabled]);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     console.log('Arama yapılıyor:', debouncedSearchTerm);
  //     // Burada API arama işlemini gerçekleştirebilirsiniz
  //   }
  // }, [debouncedSearchTerm]);
  const handleToggleIsDisabled = () => {
    setIsDisabled(isDisabled === 0 ? 1 : 0);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable={true} size={'xl'}>
      <ModalHeader toggle={toggle} className='py-2'>
        Bilanço Kalemi seçimi
      </ModalHeader>
      <ModalBody className='py-1'>
        <Card>
          <CardBody className='border-0'>
            <Row className='justify-content-between gy-1'>
              <Col lg={4}>
                <div className='search-box position-relative'>
                  <Input
                    type='text'
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className='form-control'
                    placeholder='Arama yapın...'
                  />
                  {globalFilter && (
                    <button
                      type='button'
                      className='btn-close position-absolute top-50 end-0 translate-middle-y me-2'
                      aria-label='Clear'
                      onClick={clearInput}
                    ></button>
                  )}
                  <i className='ri-search-line search-icon position-absolute top-50 start-0 translate-middle-y ms-3'></i>
                </div>
              </Col>
              <Col className='col-lg-auto'>
                <div className='d-flex gap-2 flex-wrap'>
                  <div className='form-check form-switch form-switch-right form-switch-md align-self-center'>
                    <label className='form-label text-muted'>
                      Tüm Kalemleri Göster
                    </label>
                    <input
                      className='form-check-input code-switcher'
                      type='checkbox'
                      checked={isDisabled}
                      onChange={handleToggleIsDisabled}
                    />
                  </div>
                  <AppFinancialSampleStockSelect
                    financialStatementFormatCode={financialStatementFormatCode}
                    setSelectedStockCode={setSelectedStockCode}
                    selectedStockCode={selectedStockCode}
                  />
                  <AppFinancialTypeSelect
                    financialStatementTypeId={financialStatementTypeId}
                    setfinancialStatementTypeId={setfinancialStatementTypeId}
                  />
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
            <StyledSimpleBar>
              <Table className='table-hover table-striped mt-2'>
                <thead className='bg-light sticky-top'>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          style={header.column.columnDef.cellStyle}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getIsSorted() && (
                            <span>
                              {header.column.getIsSorted() === 'desc'
                                ? ' 🔽'
                                : ' 🔼'}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        onReportCodeSelect(row.original);
                        toggle(); // This will close the modal when a row is clicked
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={cell.column.columnDef.cellStyle}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </StyledSimpleBar>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}

AppSelectIFRSCodeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  financialStatementFormatCode: PropTypes.number.isRequired,
  onReportCodeSelect: PropTypes.func.isRequired,
};

export default AppSelectIFRSCodeModal;
