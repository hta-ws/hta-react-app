import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  UncontrolledAlert,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { setCurrentPopulationRecord } from 'toolkit/actions'; // Make sure to import this action
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  report_code: Yup.string().required('Report code is required'),
  label: Yup.string().required('Label is required'),
  ifrs_code: Yup.string().required('IFRS Code is required'),
  id: Yup.number(),
});
import AppDeleteModal from '@hta/components/AppDeleteModal';
import IfrsCodeSelect from '../../Components/IfrsCodeSelect';
import { StyledSimpleBarForm } from '../styled';
const FormView = ({ updateApiData }) => {
  const dispatch = useDispatch();
  const {
    financialStatementFormatId = null,
    selectedPopulationRecord: selectedRow = null,
  } = useSelector((state) => state.admin || {});
  // Extract ID from the selectedRow, if it exists
  const id = selectedRow?.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const controller = 'financial-management';
  const actionGet = 'get-report-code-definition'; // Default action for GET
  const actionDelete = 'get-report-code-definition';
  const actionPost = 'get-report-code-definition'; // POST için action
  const actionPut = 'get-report-code-definition'; // PUT için action

  const [{ loading, error, apiData }, { setQueryParams, submitData }] =
    useGetDataApi(
      controller,
      actionGet,
      [], // Initial data is empty
      { id }, // Parameters for the GET request
      true, // Fetch data on initial call
      null, // No callback function
      'GET', // Method for fetching data
    );

  // Local state for managing form data, defaulting to apiData or an empty object
  const [formData, setFormData] = useState(apiData || {});

  // Effect to update form data when apiData changes
  useEffect(() => {
    if (apiData) {
      setFormData(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    if (selectedRow?.id) {
      setQueryParams({ id: selectedRow.id });
    } else {
      // If there's no selected row, you might want to reset the form data or set it to default values.
      setFormData({
        financial_statement_type_id: '',
        id: 0,
        is_locked: 0,
        bilanco_tipi: 'Listeden seçim yapınız...',
        financial_statement_format_id: financialStatementFormatId || '',
      });
    }
  }, [selectedRow, setQueryParams, financialStatementFormatId]);

  const title = formData?.label || 'New Record';

  // Function to clear the selected row
  const clearSelectedRow = () => {
    dispatch(setCurrentPopulationRecord(null));
  };
  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', actionDelete, () => {
      updateApiData(formData, 'remove');
      clearSelectedRow(null);
    });
    setDeleteModal(false);
  };
  const handleCodeSelected = () => {
    // setSelectedIFRSCode(data.ifrs_code);
    setModalOpen(false);
  };
  const handleSelectRecord = (data) => {
    console.log('data', data);
    // Update formData state with the new data
    setFormData({
      ...formData,
      report_code: data?.slug || '', // Assuming 'slug' is the 'report_code' you want to use
      label: data?.label || '',
      ifrs_code: data?.ifrs_code || '',
      bilanco_tipi: data?.bilanco_tipi || '',
      financial_statement_type_id: data?.financial_statement_type_id || '',
    });

    // Close the modal after selection
    setModalOpen(false);
  };
  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>{title}</h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={clearSelectedRow}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
        <StyledSimpleBarForm>
          <Formik
            initialValues={{
              report_code: formData?.report_code || '',
              label: formData?.label || '',
              ifrs_code: formData?.ifrs_code || '',
              id: formData?.id || 0,
              financial_statement_type_id: formData.financial_statement_type_id,
              // financial_statement_format_code: financialStatementFormatCode,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const method = formData.id ? 'POST' : 'PUT'; // Seçili satır varsa PUT, yoksa POST
              const action = formData.id ? actionPut : actionPost; // Action'ı dinamik olarak ayarla

              submitData(values, method, action, (responseData) => {
                updateApiData(responseData.items);

                setSubmitting(false);
                resetForm();
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='mb-3'>
                  <label htmlFor='report_code'>Repor Kodu</label>
                  <Field
                    name='report_code'
                    type='text'
                    className='form-control'
                    disabled={formData?.is_locked == 1}
                  />
                  <ErrorMessage
                    name='report_code'
                    component='div'
                    className='field-error'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='label'>Açıklama</label>
                  <Field name='label' type='text' className='form-control' />
                  <ErrorMessage
                    name='label'
                    component='div'
                    className='field-error'
                  />
                </div>
                <div className='mb-3'>
                  <div className='input-group'>
                    <Field
                      name='ifrs_code'
                      type='text'
                      className='form-control'
                      placeholder='IFRS Code'
                      aria-label='IFRS Code'
                      aria-describedby='button-addon-ifrs'
                      disabled={formData?.is_locked === 1}
                      readOnly
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => setModalOpen(true)}
                      disabled={formData?.is_locked === 1}
                    >
                      <i className='ri-search-line search-icon align-bottom me-1'></i>
                      Listeden seç
                    </button>
                  </div>
                  <ErrorMessage
                    name='ifrs_code'
                    component='div'
                    className='field-error'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='bilanco_tipi'>Bilanço Tipi</label>
                  <span className='form-control'>{formData?.bilanco_tipi}</span>
                </div>
                <Row>
                  <Col> </Col>
                  <Col className='auto'>
                    <div className='hstack gap-2 justify-content-end'>
                      {isSubmitting && loading && (
                        <span>
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>
                          Data işleniyor...
                        </span>
                      )}
                      <button type='submit' className='btn btn-primary'>
                        {formData?.id ? 'Kaydet' : 'Ekle'}
                      </button>
                      <button
                        type='button'
                        className='btn btn-soft-success'
                        onClick={() => clearSelectedRow(null)}
                      >
                        İptal
                      </button>
                      {formData?.is_locked != 1 && formData.id ? (
                        <button
                          type='button'
                          className='btn btn-danger'
                          onClick={() => setDeleteModal(true)}
                        >
                          Sil
                        </button>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                {isSubmitting && error && (
                  <Row className='mt-2'>
                    <Col md='12'>
                      <UncontrolledAlert
                        color='danger'
                        className='alert-solid alert-dismissible bg-danger text-white alert-label-icon fade show material-shadow mb-xl-0'
                      >
                        <i className='ri-error-warning-line label-icon'></i>
                        <strong>Hata</strong> - {error}
                      </UncontrolledAlert>
                    </Col>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </StyledSimpleBarForm>
        <AppDeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteRecord}
          onCloseClick={() => setDeleteModal(false)}
          handleCodeSelected={handleCodeSelected}
        />
        {isModalOpen && (
          <IfrsCodeSelect
            isOpen={isModalOpen}
            toggle={() => setModalOpen(!isModalOpen)}
            onReportCodeSelect={handleSelectRecord}
            // financialStatementFormatCode={financialStatementFormatCode}
            // setFinancialStatementFormatCode={setFinancialStatementFormatCode}
          />
        )}
      </CardBody>
    </Card>
  );
};
FormView.propTypes = {
  updateApiData: PropTypes.func.isRequired,
};
export default FormView;
