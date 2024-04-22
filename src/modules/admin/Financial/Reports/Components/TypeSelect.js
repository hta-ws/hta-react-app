import React, { useEffect } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFinancialStatementTypeList,
  setFinancialStatementTypeCode,
} from 'toolkit/actions';

const TypeSelect = () => {
  const dispatch = useDispatch();
  const { financialStatementTypeList, financialStatementTypeId } = useSelector(
    (state) => state.admin,
  );

  useEffect(() => {
    // financialStatementTypeList'in boş olup olmadığını kontrol et
    if (
      !financialStatementTypeList ||
      financialStatementTypeList.length === 0
    ) {
      dispatch(getFinancialStatementTypeList());
    }
  }, [financialStatementTypeList, dispatch]);

  const handleSelect = (id) => {
    dispatch(setFinancialStatementTypeCode(id));
  };

  const activeLabel =
    financialStatementTypeList.find(
      (item) => item.id === financialStatementTypeId,
    )?.label || 'Select a Financial Statement Type';

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
          {financialStatementTypeList.length > 0 ? (
            financialStatementTypeList.map((item) => (
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

export default TypeSelect;
