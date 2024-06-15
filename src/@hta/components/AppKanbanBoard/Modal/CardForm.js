import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import GroupedFields from './GroupedFields';

const CardForm = ({ initialValues, formStructure, onSubmit, handleCancel }) => {
  const validationSchema = formStructure?.validationSchema
    ? Yup.object().shape(
        Object.keys(formStructure.validationSchema).reduce((schema, key) => {
          const field = formStructure.validationSchema[key];
          const fieldSchema = field.required
            ? Yup.string().required(field.errorMessage)
            : Yup.string();
          return { ...schema, [key]: fieldSchema };
        }, {}),
      )
    : null;

  const renderFormFields = (values, setFieldValue) => {
    if (!formStructure || !formStructure.fields) return null;

    return Object.keys(formStructure.fields).map((groupKey, groupIndex) => {
      const group = formStructure.fields[groupKey];
      return (
        <GroupedFields
          key={groupIndex}
          group={group}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          properties: values.properties,
        };
        console.log('Submitting Values: ', submitValues);
        onSubmit(submitValues);
        setSubmitting(false);
      }}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, isSubmitting, validateForm }) => (
        <Form>
          <Row>
            <Col xs='12' md='6'>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  value={values.title}
                  onChange={(e) => setFieldValue('title', e.target.value)}
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-danger'
                />
              </FormGroup>
            </Col>
            <Col xs='12' md='6'>
              <FormGroup>
                <Label for='type'>Select Type</Label>
                <Input
                  type='select'
                  name='type'
                  id='type'
                  value={values.type}
                  onChange={(e) => {
                    setFieldValue('type', e.target.value);
                  }}
                >
                  <option value=''>Select</option>
                  <option value='widget'>Widget</option>
                  <option value='table'>Table</option>
                  <option value='chart'>Chart</option>
                </Input>
                <ErrorMessage
                  name='type'
                  component='div'
                  className='text-danger'
                />
              </FormGroup>
            </Col>
          </Row>
          {renderFormFields(values, setFieldValue)}
          <Button type='submit' color='primary' disabled={isSubmitting}>
            Submit
          </Button>
          <Button type='button' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='button'
            color='info'
            onClick={async () => {
              const errors = await validateForm();
              console.log('Validation Errors: ', errors);
            }}
          >
            Validate
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CardForm;
