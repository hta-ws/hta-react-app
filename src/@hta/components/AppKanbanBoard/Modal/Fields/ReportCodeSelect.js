import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useGetDataApi } from '@hta/hooks/APIHooks';

const ReportCodeSelect = ({ field, form, onChangeField }) => {
  const [{ loading, apiData }, { setQueryParams }] = useGetDataApi({
    controller: 'report',
    action: 'get-report-code-list',
    initialData: [],
    initialCall: true,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setQueryParams({}); // Trigger the initial fetch
  }, [setQueryParams]);

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      const initialOption = apiData.find(
        (option) => option.value === field.value,
      );
      setSelectedOption(initialOption || null);
    }
  }, [apiData, field.value]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    form.setFieldValue(field.name, selected ? selected.value : '');

    // OnChange eventini işlemek için handleFieldChange fonksiyonunu çağırın
    if (onChangeField) {
      const { targetField, action } = onChangeField;
      if (action === 'setLabelWithSelectedValue') {
        form.setFieldValue(targetField, `Label: ${selected.label}`);
      }
    }
  };

  return (
    <Select
      isLoading={loading}
      options={apiData}
      value={selectedOption}
      onChange={handleChange}
      placeholder='Select a report code'
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
    />
  );
};

ReportCodeSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  onChangeField: PropTypes.shape({
    targetField: PropTypes.string,
    action: PropTypes.string,
  }),
};

export default ReportCodeSelect;
