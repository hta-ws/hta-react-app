import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const WidgetForm = ({ initialValues, onSubmit, onCancel }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Bu alan zorunludur'),
    widgetProperty: Yup.string().required('Bu alan zorunludur'),
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
            <label htmlFor='widgetProperty'>Widget Özelliği</label>
            <Field name='widgetProperty' type='text' />
            <ErrorMessage name='widgetProperty' component='div' />
          </div>
          <button type='submit'>Widget Ekle</button>
          <button type='button' onClick={onCancel}>
            İptal
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WidgetForm;
