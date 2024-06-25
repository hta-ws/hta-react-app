import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import get from 'lodash/get';

function ReportCodeSelect(props) {
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
        (option) => option.value === props.value,
      );
      setSelectedOption(initialOption || null);
    }
  }, [apiData, props.value]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    props.setFieldValue(props.name, selected ? selected.value : '');

    if (props.onChange) {
      props.onChange(selected);
    }
  };

  return (
    <FormGroup>
      {props.label && <Label for={props.name}>{props.label}</Label>}
      <Select
        id={props.name}
        name={props.name}
        isLoading={loading}
        options={apiData}
        value={selectedOption}
        onChange={handleChange}
        onBlur={props.handleBlur}
        placeholder='Select a report code'
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        classNamePrefix='react-select'
      />
      {props.error && get(props.touched, props.name) && (
        <FormFeedback className='d-block'>{props.error}</FormFeedback>
      )}
    </FormGroup>
  );
}

ReportCodeSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.any,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default ReportCodeSelect;
