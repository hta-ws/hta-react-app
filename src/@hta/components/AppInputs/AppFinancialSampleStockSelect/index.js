import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooksOld'; // API helper hook'unun import edilmesi

const AppFinancialSampleStockSelect = ({
  financialStatementFormatCode,
  selectedStockCode,
  setSelectedStockCode,
}) => {
  const [{ apiData, loading, error }, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-sample-stock-codes',
    [],

    { financialStatementFormatCode: financialStatementFormatCode },
    false,
  );

  // Seçilen öğenin id'sini kaydetmek
  const handleSelect = (id) => {
    setSelectedStockCode(id);
  };
  useEffect(() => {
    setQueryParams({
      financialStatementFormatCode: financialStatementFormatCode,
    });
  }, [financialStatementFormatCode]);

  useEffect(() => {
    // Check if selectedStockCode is null and data is loaded
    if (selectedStockCode === null && apiData && apiData.length > 0) {
      setSelectedStockCode(apiData[0].id);
    }
  }, [apiData]);

  // Aktif financial type'ın label'ını bulmak
  const activeLabel =
    apiData?.find((item) => item.id == selectedStockCode)?.label ||
    'Bilanço Tipi Seçiniz....';

  return (
    <div className='flex-shrink-0'>
      <UncontrolledDropdown className='dropdown'>
        <DropdownToggle
          className='btn text-muted fs-14 dropdown-toggle'
          tag='button'
          type='button'
        >
          <strong>{activeLabel} </strong>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu'>
          {loading ? (
            <DropdownItem className='dropdown-item'>Loading...</DropdownItem>
          ) : (
            apiData.map((item) => (
              <li key={item.id}>
                <DropdownItem
                  className='dropdown-item'
                  onClick={() => handleSelect(item.id)}
                >
                  {item.label}
                </DropdownItem>
              </li>
            ))
          )}
          {apiData.error && (
            <DropdownItem className='dropdown-item text-danger'>
              Error: {error}
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

AppFinancialSampleStockSelect.propTypes = {
  financialStatementFormatCode: PropTypes.number, // financialStatementFormatCode olarak number türünde olmalı
  selectedStockCode: PropTypes.string,
  setSelectedStockCode: PropTypes.func.isRequired,
};

export default AppFinancialSampleStockSelect;
