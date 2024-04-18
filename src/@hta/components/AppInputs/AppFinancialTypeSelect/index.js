import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks'; // API helper hook'unun import edilmesi

const AppFinancialTypeSelect = ({
  financialStatementTypeId,
  setfinancialStatementTypeId,
}) => {
  const [data, { setQueryParams }] = useGetDataApi(
    'financial-management',
    'get-financial-statement-types',
    [],
    {},
    false,
  );

  // Seçilen öğenin id'sini kaydetmek
  const handleSelect = (id) => {
    setfinancialStatementTypeId(id);
  };
  useEffect(() => {
    setQueryParams();
  }, []);
  // Aktif financial type'ın label'ını bulmak
  const activeLabel =
    data.apiData?.find((item) => item.id === financialStatementTypeId)?.label ||
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
          {data.loading ? (
            <DropdownItem className='dropdown-item'>Loading...</DropdownItem>
          ) : (
            data.apiData.map((item) => (
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
          {data.error && (
            <DropdownItem className='dropdown-item text-danger'>
              Error: {data.error}
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

AppFinancialTypeSelect.propTypes = {
  financialStatementTypeId: PropTypes.number, // financialStatementTypeId olarak number türünde olmalı
  setfinancialStatementTypeId: PropTypes.func.isRequired,
};

export default AppFinancialTypeSelect;
