import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import PreviewCardHeader from './PreviewCardHeader';
import ReportCodeSelect from './components/ReportCodeSelect';
import SelectField from './components/SelectField';

const valueTypeOptions = [
  { value: 'c', label: 'Çeyreksel' },
  { value: 'd', label: 'Dönemsel' },
  { value: 'y', label: 'Yıllıklandırılmış' },
];

const formatTypeOptions = [
  { value: 'number', label: 'Number' },
  { value: 'string', label: 'String' },
];

const WidgetForm = ({ initialValues = {}, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    type: Yup.string().required('Tip zorunlu alandır'),
    title: Yup.string().required('Başlık zorunlu alandır'),
    sort_order: Yup.number(),
    page_id: Yup.number(),

    properties: Yup.object().shape({
      label: Yup.string().required('Etiket zorunlu alandır'),
      dataSource: Yup.object().shape({
        reportCode: Yup.string().required('Rapor Kodu zorunlu alandır'),
        valueType: Yup.string().required('Değer Türü zorunlu alandır'),
      }),
      format: Yup.object().shape({
        type: Yup.string().required('Format türü zorunlu alandır'),
        decimal: Yup.number().required('Ondalık zorunlu alandır'),
        prefix: Yup.string(),
        suffix: Yup.string(),
      }),
    }),
  });

  const defaultValues = {
    id: '',
    type: '',
    title: '',
    sort_order: '',
    page_id: '',

    properties: {
      label: '',
      dataSource: {
        reportCode: '',
        valueType: '',
      },
      format: {
        type: '',
        decimal: '',
        prefix: '',
        suffix: '',
      },
    },
  };

  const mergedInitialValues = { ...defaultValues, ...initialValues };

  return (
    <Formik
      initialValues={mergedInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        values,
      }) => (
        <Form>
          <Row>
            <Col xxl={12}>
              <Card>
                <PreviewCardHeader title='Horizontal Form' />
                <CardBody>
                  <div className='live-preview'>
                    <Row>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for='type'>Tip</Label>
                          <Field name='type'>
                            {({ field }) => (
                              <Input
                                {...field}
                                type='text'
                                id='type'
                                invalid={touched.type && !!errors?.type}
                                disabled
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name='type'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={8}>
                        <FormGroup>
                          <Label for='title'>Başlık</Label>
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
                          <ErrorMessage
                            name='title'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h4 className='my-4'>Data Kaynağı</h4>
                    <Row>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for='properties.dataSource.reportCode'>
                            Rapor Kodu
                          </Label>
                          <Field name='properties.dataSource.reportCode'>
                            {({ field }) => (
                              <ReportCodeSelect
                                {...field}
                                name='properties.dataSource.reportCode'
                                value={values.properties.dataSource.reportCode}
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur}
                                touched={touched}
                                error={
                                  errors.properties?.dataSource?.reportCode
                                }
                                onChange={(selected) => {
                                  setFieldValue(
                                    'properties.dataSource.reportCode',
                                    selected ? selected.value : '',
                                  );
                                  setFieldValue(
                                    'properties.label',
                                    selected ? selected.label : '',
                                  );
                                  setFieldValue(
                                    'title',
                                    selected ? selected.label : '',
                                  );
                                }}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name='properties.dataSource.reportCode'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for='properties.label'>Etiket</Label>
                          <Field name='properties.label'>
                            {({ field }) => (
                              <Input
                                {...field}
                                type='text'
                                id='properties.label'
                                invalid={
                                  touched.properties?.label &&
                                  !!errors.properties?.label
                                }
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name='properties.label'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4}>
                        <FormGroup>
                          <Label for='properties.dataSource.valueType'>
                            Değer Türü
                          </Label>
                          <Field name='properties.dataSource.valueType'>
                            {({ field }) => (
                              <SelectField
                                {...field}
                                name='properties.dataSource.valueType'
                                value={values.properties.dataSource.valueType}
                                options={valueTypeOptions}
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur}
                                touched={touched}
                                error={errors.properties?.dataSource?.valueType}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name='properties.dataSource.valueType'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h4 className='my-4'>Format</h4>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label for='properties.format.type'>Tip</Label>
                          <Field name='properties.format.type'>
                            {({ field }) => (
                              <SelectField
                                {...field}
                                name='properties.format.type'
                                value={values.properties.format.type}
                                options={formatTypeOptions}
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur}
                                touched={touched}
                                error={errors.properties?.format?.type}
                              />
                            )}
                          </Field>
                          <ErrorMessage
                            name='properties.format.type'
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label for='properties.format.decimal'>Ondalık</Label>
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
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label for='properties.format.prefix'>Önek</Label>
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
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label for='properties.format.suffix'>Sonek</Label>
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
                            component='div'
                            className='text-danger'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
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
