import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Row,
  Col,
} from 'reactstrap';

const WidgetForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number().required('ID is required'),
    type: Yup.string().required('Type is required'),
    title: Yup.string(),
    sort_order: Yup.number().required('Sort order is required'),
    page_id: Yup.number().required('Page ID is required'),
    dataSource: Yup.object().shape({
      reportCode: Yup.string().required('Report Code is required'),
      valueType: Yup.string().required('Value Type is required'),
    }),
    properties: Yup.object().shape({
      label: Yup.string().required('Label is required'),
      dataSource: Yup.object().shape({
        reportCode: Yup.string().required('Report Code is required'),
        valueType: Yup.string().required('Value Type is required'),
      }),
      format: Yup.object().shape({
        type: Yup.string().required('Format type is required'),
        decimal: Yup.number().required('Decimal is required'),
        prefix: Yup.string(),
        suffix: Yup.string(),
      }),
    }),
    financialData: Yup.mixed().nullable(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='id'>ID</Label>
                <Field name='id'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      id='id'
                      invalid={touched.id && !!errors.id}
                    />
                  )}
                </Field>
                <ErrorMessage name='id' component={FormFeedback} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='type'>Type</Label>
                <Field name='type'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='type'
                      invalid={touched.type && !!errors.type}
                    />
                  )}
                </Field>
                <ErrorMessage name='type' component={FormFeedback} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Field name='title'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='title'
                      invalid={touched.title && !!errors.title}
                    />
                  )}
                </Field>
                <ErrorMessage name='title' component={FormFeedback} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='sort_order'>Sort Order</Label>
                <Field name='sort_order'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      id='sort_order'
                      invalid={touched.sort_order && !!errors.sort_order}
                    />
                  )}
                </Field>
                <ErrorMessage name='sort_order' component={FormFeedback} />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='page_id'>Page ID</Label>
                <Field name='page_id'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      id='page_id'
                      invalid={touched.page_id && !!errors.page_id}
                    />
                  )}
                </Field>
                <ErrorMessage name='page_id' component={FormFeedback} />
              </FormGroup>
            </Col>
          </Row>

          <h3>Data Source</h3>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='dataSource.reportCode'>Report Code</Label>
                <Field name='dataSource.reportCode'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='dataSource.reportCode'
                      invalid={
                        touched.dataSource?.reportCode &&
                        !!errors.dataSource?.reportCode
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='dataSource.reportCode'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='dataSource.valueType'>Value Type</Label>
                <Field name='dataSource.valueType'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='dataSource.valueType'
                      invalid={
                        touched.dataSource?.valueType &&
                        !!errors.dataSource?.valueType
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='dataSource.valueType'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>
          </Row>

          <h3>Properties</h3>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='properties.label'>Label</Label>
                <Field name='properties.label'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.label'
                      invalid={
                        touched.properties?.label && !!errors.properties?.label
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.label'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>
          </Row>

          <h4>Data Source</h4>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='properties.dataSource.reportCode'>
                  Report Code
                </Label>
                <Field name='properties.dataSource.reportCode'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.dataSource.reportCode'
                      invalid={
                        touched.properties?.dataSource?.reportCode &&
                        !!errors.properties?.dataSource?.reportCode
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.dataSource.reportCode'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='properties.dataSource.valueType'>Value Type</Label>
                <Field name='properties.dataSource.valueType'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.dataSource.valueType'
                      invalid={
                        touched.properties?.dataSource?.valueType &&
                        !!errors.properties?.dataSource?.valueType
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.dataSource.valueType'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>
          </Row>

          <h4>Format</h4>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='properties.format.type'>Type</Label>
                <Field name='properties.format.type'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.format.type'
                      invalid={
                        touched.properties?.format?.type &&
                        !!errors.properties?.format?.type
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.format.type'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='properties.format.decimal'>Decimal</Label>
                <Field name='properties.format.decimal'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='number'
                      id='properties.format.decimal'
                      invalid={
                        touched.properties?.format?.decimal &&
                        !!errors.properties?.format?.decimal
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.format.decimal'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='properties.format.prefix'>Prefix</Label>
                <Field name='properties.format.prefix'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.format.prefix'
                      invalid={
                        touched.properties?.format?.prefix &&
                        !!errors.properties?.format?.prefix
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.format.prefix'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label for='properties.format.suffix'>Suffix</Label>
                <Field name='properties.format.suffix'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='properties.format.suffix'
                      invalid={
                        touched.properties?.format?.suffix &&
                        !!errors.properties?.format?.suffix
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='properties.format.suffix'
                  component={FormFeedback}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for='financialData'>Financial Data</Label>
                <Field name='financialData'>
                  {({ field }) => (
                    <Input
                      {...field}
                      type='text'
                      id='financialData'
                      invalid={touched.financialData && !!errors.financialData}
                    />
                  )}
                </Field>
                <ErrorMessage name='financialData' component={FormFeedback} />
              </FormGroup>
            </Col>
          </Row>

          <Button type='submit' color='primary' disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WidgetForm;
