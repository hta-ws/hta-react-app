import React, { useEffect } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { getGetReporCodeList } from 'toolkit/actions';
import { selectReportCodeList } from 'toolkit/selectors/adminSelectors';
import PropTypes from 'prop-types';

const SelectReportCode = ({
  value,
  onChange,
  isDisabled,
  isMulti,
  label,
  error,
  touched,
}) => {
  const dispatch = useDispatch();
  const reportCodeList = useSelector(selectReportCodeList);

  useEffect(() => {
    dispatch(getGetReporCodeList());
  }, [dispatch]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused
        ? '#666'
        : error && touched
          ? '#dc3545'
          : base.borderColor,
      '&:hover': {
        borderColor: state.isFocused
          ? '#888'
          : error && touched
            ? '#dc3545'
            : '#aaa',
      },
    }),
  };

  // String değerini Select bileşeni için uygun format array'e çevirme
  const formatValue = (valueString) => {
    if (!valueString || valueString.trim() === '') {
      return [];
    }
    return valueString.split(',').map((code) => ({
      value: code,
      label: reportCodeList.find((item) => item.value === code)?.label || code,
    }));
  };

  // Select bileşeninden gelen yeni değerleri string olarak güncelleme
  const handleChange = (selectedOptions) => {
    let newValue = null;
    if (isMulti) {
      newValue = selectedOptions
        ? selectedOptions.map((option) => option.value).join(',')
        : '';
    } else {
      newValue = selectedOptions.value;
    }

    onChange(newValue);
  };

  return (
    <div className='mb-1'>
      {label && <label htmlFor='select-report-code'>{label}</label>}
      <Select
        id='select-report-code'
        value={formatValue(value)}
        isMulti={isMulti}
        onChange={handleChange}
        options={reportCodeList}
        classNamePrefix='js-example-disabled-multi mb-0'
        isDisabled={isDisabled}
        styles={customStyles}
      />

      {error && touched && <div className='text-danger'>{error}</div>}
    </div>
  );
};

SelectReportCode.propTypes = {
  value: PropTypes.string, // Select value as a comma-separated string
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string, // Formik validation error message
  touched: PropTypes.bool, // Formik touch status
};

SelectReportCode.defaultProps = {
  isDisabled: false,
  isMulti: false,
};

export default SelectReportCode;
