import React from 'react';

const FormComponent = ({ cardType, cardData, onSubmit }) => {
  return (
    <form>
      {/* Dinamik form alanları burada render edilecek */}
      <div>Form rendering for {cardType}</div>
    </form>
  );
};

export default FormComponent;
