import PropTypes from 'prop-types';
import Select from 'react-select'; // React-select kullanıldığını varsayıyoruz

const CustomSelect = ({ options, field, form, placeholder, onChange }) => {
  const handleChange = (option) => {
    // Formik veya başka bir form yönetim kitaplığı için değeri ayarla
    form.setFieldValue(field.name, option ? option.value : '');

    // Dışarıdan gelen özel onChange fonksiyonunu çağır
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Select
      options={options}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ''
      }
      onChange={handleChange}
      onBlur={field.onBlur}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={false}
      classNamePrefix='js-example-disabled-multi mb-0'
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // onChange opsiyonel bir fonksiyon prop'u olarak eklendi
};

export default CustomSelect;
