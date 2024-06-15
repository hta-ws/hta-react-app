import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TableForm = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Bu alan zorunludur'),
    tableProperty: Yup.string().required('Bu alan zorunludur'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor='title'>Başlık</label>
            <Field name='title' type='text' />
            <ErrorMessage name='title' component='div' />
          </div>
          <div>
            <label htmlFor='tableProperty'>Tablo Özelliği</label>
            <Field name='tableProperty' type='text' />
            <ErrorMessage name='tableProperty' component='div' />
          </div>
          <button type='submit'>Tablo Ekle</button>
          <button type='button' onClick={onCancel}>
            İptal
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TableForm;
