import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const ChartForm = ({ initialValues, onSubmit }) => {
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

ChartForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChartForm;
