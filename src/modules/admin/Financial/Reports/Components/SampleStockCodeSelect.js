import React, { useEffect } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFinancialStatementSampleStockCodeList,
  setFinancialStatementSampleStockCode,
} from 'toolkit/actions';

const SampleStockCodeSelect = () => {
  const dispatch = useDispatch();
  const {
    financialStatementSampleStockCodeList,
    selectedSampleStockCode,
    financialStatementFormatId,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (
      !financialStatementSampleStockCodeList ||
      financialStatementSampleStockCodeList.length === 0
    ) {
      dispatch(
        getFinancialStatementSampleStockCodeList({
          financialStatementFormatId: financialStatementFormatId,
        }),
      );
    }
  }, [dispatch, financialStatementFormatId]);

  useEffect(() => {
    if (
      financialStatementSampleStockCodeList &&
      financialStatementSampleStockCodeList.length > 0 &&
      !selectedSampleStockCode
    ) {
      dispatch(
        setFinancialStatementSampleStockCode(
          financialStatementSampleStockCodeList[0].id,
        ),
      );
    }
  }, [financialStatementSampleStockCodeList, dispatch]);

  const handleSelect = (id) => {
    dispatch(setFinancialStatementSampleStockCode(id));
  };

  const activeLabel =
    financialStatementSampleStockCodeList.find(
      (item) => item.id === selectedSampleStockCode,
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
          {financialStatementSampleStockCodeList.length > 0 ? (
            financialStatementSampleStockCodeList.map((item) => (
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

export default SampleStockCodeSelect;
