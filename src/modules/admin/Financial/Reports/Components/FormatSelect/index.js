import React, { useEffect } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFinancialStatementFormatList,
  setFinancialStatementFormatId,
} from 'toolkit/actions';

import {
  selectFinancialStatementFormatList,
  selectFinancialStatementFormatId,
} from 'toolkit/selectors/adminSelectors';
const FormatSelect = () => {
  const dispatch = useDispatch();
  const financialStatementFormatList = useSelector(
    selectFinancialStatementFormatList,
  );
  const financialStatementFormatId = useSelector(
    selectFinancialStatementFormatId,
  );

  useEffect(() => {
    // Listeyi null kontrolü, boş olup olmadığı ve uzunluğunun 0 olup olmadığını kontrol eder
    if (
      financialStatementFormatList === null ||
      financialStatementFormatList.length === 0
    ) {
      dispatch(getFinancialStatementFormatList());
    }
  }, [dispatch]); // Bağımlılık dizisinde doğrudan listeyi kullanıyoruz

  const handleSelect = (id) => {
    dispatch(setFinancialStatementFormatId(id));
  };

  const activeLabel =
    financialStatementFormatList.find(
      (item) => item.id === financialStatementFormatId,
    )?.label || 'Bilanço Formatını Seçiniz....';

  return (
    <div className='flex-shrink-0'>
      <UncontrolledDropdown className='dropdown'>
        <DropdownToggle
          className='btn text-muted fs-14 dropdown-toggle'
          tag='button'
          type='button'
        >
          <strong>{activeLabel}</strong>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu'>
          {financialStatementFormatList.length > 0 ? (
            financialStatementFormatList.map((item) => (
              <li key={item.id}>
                <DropdownItem
                  className='dropdown-item'
                  onClick={() => handleSelect(item.id)}
                >
                  {item.label}
                </DropdownItem>
              </li>
            ))
          ) : (
            <DropdownItem className='dropdown-item'>
              No data available
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default FormatSelect;
