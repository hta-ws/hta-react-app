import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const TableForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    // Diğer alanların doğrulama şemaları
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Field name='title' as={Input} />
            {errors.title && touched.title ? <div>{errors.title}</div> : null}
          </FormGroup>
          {/* Diğer alanlar */}
          <Button type='submit' color='primary'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TableForm;
