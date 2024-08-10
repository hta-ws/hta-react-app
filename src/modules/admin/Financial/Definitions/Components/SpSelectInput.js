import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { getFsProcedureList } from 'toolkit/actions';
import { selectFsProcedureList } from 'toolkit/selectors';

const SpSelectInput = ({ name, label, formik, onChange }) => {
  const dispatch = useDispatch();
  const financialStatementProcedureList = useSelector(selectFsProcedureList);

  useEffect(() => {
    if (financialStatementProcedureList.length === 0) {
      dispatch(getFsProcedureList());
    }
  }, [dispatch, financialStatementProcedureList.length]);

  if (!formik) {
    return <div>Loading...</div>;
  }

  const options = financialStatementProcedureList.map((procedure) => ({
    value: procedure.id,
    label: procedure.label,
  }));

  const handleChange = (option) => {
    const value = option ? option.value : '';
    formik.setFieldValue(name, value);
    if (onChange) onChange(value);
  };

  const error = formik.errors[name];
  const touched = formik.touched[name];
  if (!formik || !formik.values) {
    return <div>Loading form data...</div>;
  }

  return (
    <div className='mb-1'>
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        options={options}
        onChange={handleChange}
        value={
          name in formik.values
            ? options.find((option) => option.value === formik.values[name])
            : null
        }
        classNamePrefix='react-select'
        placeholder={label}
        isClearable={true}
        name={name}
        isDisabled={formik.isSubmitting}
      />
      {error && touched && <div className='text-danger'>{error}</div>}
    </div>
  );
};

SpSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

export default SpSelectInput;
