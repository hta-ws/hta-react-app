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
  setFinancialStatementFormatCode,
} from 'toolkit/actions';

const FormatSelect = () => {
  const dispatch = useDispatch();
  const { financialStatementFormatList, financialStatementFormatId } =
    useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getFinancialStatementFormatList());
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(setFinancialStatementFormatCode(id));
  };

  const activeLabel =
    financialStatementFormatList.find(
      (item) => item.id === financialStatementFormatId,
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
