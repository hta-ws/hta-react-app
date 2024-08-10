import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getFsStockList, setFsStock } from 'toolkit/actions';
import {
  selectFsStockList,
  selectFsStock,
  selectFsTemplateId,
} from 'toolkit/selectors';

const StockSelect = () => {
  const dispatch = useDispatch();
  const financialStatementSampleStockCodeList = useSelector(selectFsStockList);
  const selectedSampleStockCode = useSelector(selectFsStock);
  const financialStatementFormatId = useSelector(selectFsTemplateId);

  useEffect(() => {
    dispatch(
      getFsStockList({
        fs_template_id: financialStatementFormatId,
      }),
    );
  }, [dispatch, financialStatementFormatId]);

  useEffect(() => {
    if (
      financialStatementSampleStockCodeList &&
      financialStatementSampleStockCodeList.length > 0 &&
      !selectedSampleStockCode
    ) {
      dispatch(setFsStock(financialStatementSampleStockCodeList[0].id));
    }
  }, [
    financialStatementSampleStockCodeList,
    selectedSampleStockCode,
    dispatch,
  ]);

  const handleSelect = (selectedOption) => {
    dispatch(setFsStock(selectedOption.value));
  };

  const options = financialStatementSampleStockCodeList.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  const defaultValue = options.find(
    (option) => option.value === selectedSampleStockCode,
  );

  return (
    <div className='flex-shrink-0'>
      <Select
        className='react-select-container'
        classNamePrefix='react-select'
        value={defaultValue}
        onChange={handleSelect}
        options={options}
        placeholder='Stok Kodu Seçiniz...'
      />
    </div>
  );
};

export default StockSelect;
