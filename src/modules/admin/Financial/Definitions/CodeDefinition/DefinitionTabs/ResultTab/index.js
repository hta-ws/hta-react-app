import React from 'react';
import PropTypes from 'prop-types';

const ResultTab = ({ formData }) => {
  return (
    <div>
      {/* Örnek sonuçlar içeriğini burada oluşturun */}
      <p>Örnek sonuçlar: {JSON.stringify(formData)}</p>
    </div>
  );
};

ResultTab.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default ResultTab;
