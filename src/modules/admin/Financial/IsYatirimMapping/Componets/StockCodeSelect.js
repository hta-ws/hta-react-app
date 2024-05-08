import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Select from 'react-select';
import { useGetDataApi } from '@hta/hooks/APIHooks'; // Adjust the path as necessary

const StockCodeSelect = ({
  selectedStockCode,
  setSelectedStockCode,
  ...rest
}) => {
  const [{ apiData: stockCodes, loading, error }, apiActions] = useGetDataApi({
    controller: 'financial-mapping',
    action: 'get-stock-codes',
    method: 'POST',
    initialData: [],
    initialCall: true,
  });

  useEffect(() => {
    // This will ensure the API is called on component mount
    apiActions.setQueryParams({});
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedStockCode(selectedOption ? selectedOption.value : null);
  };

  if (error) {
    return <div>Error loading stock codes: {error.message}</div>;
  }

  return (
    <Select
      value={stockCodes.find((option) => option.value === selectedStockCode)}
      options={stockCodes}
      onChange={handleChange}
      isLoading={loading}
      placeholder='Select a stock code'
      isClearable={true}
      isSearchable={true}
      {...rest}
    />
  );
};

StockCodeSelect.propTypes = {
  selectedStockCode: PropTypes.string,
  setSelectedStockCode: PropTypes.func.isRequired,
};

export default StockCodeSelect;
