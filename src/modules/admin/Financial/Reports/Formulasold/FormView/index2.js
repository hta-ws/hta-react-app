import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  FormGroup,
  Label,
  Input,
  Button,
  CardBody,
} from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';
import SelectComponent from './SelectComponent';

const FormView2 = ({ selectedRow, setSelectedRow }) => {
  const id = selectedRow?.id;
  const controller = 'financial-management';
  const actionGet = 'get-report-calculation-definition';

  const [{ loading, error, apiData }, { setQueryParams, submitData }] =
    useGetDataApi(
      controller,
      actionGet,
      [],
      { id: selectedRow?.id },
      false,
      null,
      'GET',
    );

  const [formData, setFormData] = useState(apiData || {});

  useEffect(() => {
    if (id) {
      setQueryParams({ id });
    }
  }, [id]);

  useEffect(() => {
    setFormData(apiData || {});
  }, [apiData]);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    report_code: Yup.string().required('Report code is required'),
    label: Yup.string().required('Label is required'),
    p_positive_codes: Yup.array()
      .of(Yup.string())
      .required('At least one positive code is required'),
  });

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>{formData.label || 'New Record'}</h5>
        <Button onClick={() => setSelectedRow(null)} color='danger' outline>
          <i className='ri-close-fill align-bottom'></i>
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            report_code: formData.report_code || '',
            label: formData.label || '',
            p_positive_codes: formData.p_positive_codes || [],
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values) => {
            submitData(
              controller,
              'update-report-calculation-definition',
              values,
            );
            console.log('Submitted values:', values);
            setSelectedRow(null);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <SelectComponent label='Select Report Method' name='sp_id' />
              <FormGroup>
                <Label for='report_code'>Report Code</Label>
                <Field
                  name='report_code'
                  as={Input}
                  invalid={touched.report_code && !!errors.report_code}
                />
                {touched.report_code && errors.report_code && (
                  <div className='invalid-feedback'>{errors.report_code}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='label'>Label</Label>
                <Field
                  name='label'
                  as={Input}
                  invalid={touched.label && !!errors.label}
                />
                {touched.label && errors.label && (
                  <div className='invalid-feedback'>{errors.label}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='p_positive_codes'>Positive Codes</Label>
                <Field
                  name='p_positive_codes'
                  as={Input}
                  type='select'
                  multiple
                  invalid={
                    touched.p_positive_codes && !!errors.p_positive_codes
                  }
                >
                  {[
                    'kisa_vadeli_borclanmalar',
                    'uzun_vadeli_borclanmalar',
                    'uzun_vadeli_borclanmalarin_kisa_vadeli_kisimlari',
                  ].map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </Field>
                {touched.p_positive_codes && errors.p_positive_codes && (
                  <div className='invalid-feedback'>
                    {errors.p_positive_codes}
                  </div>
                )}
              </FormGroup>
              <Button type='submit' color='primary'>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

FormView2.propTypes = {
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func.isRequired,
};

export default FormView2;
