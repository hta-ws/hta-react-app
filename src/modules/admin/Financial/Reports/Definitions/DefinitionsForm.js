import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  UncontrolledAlert,
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
// import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@hta/hooks/APIHooks';

import DefinitionsFormTabs from './DefinitionsFormTabs'; // Ensure the path is correct
import { StyledSimpleBarForm } from './styled';
import AppDeleteModal from '@hta/components/AppDeleteModal';
import AppSelectIFRSCodeModal from '@hta/components/AppInputs/AppSelectIFRSCodeModal';
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  report_code: Yup.string().required('Report code is required'),
  label: Yup.string().required('Label is required'),
  ifrs_code: Yup.string().required('IFRS Code is required'),
  id: Yup.number(),
});

const DefinitionsForm = ({
  selectedRow,
  setSelectedRow,
  financialStatementFormatCode,
  setFinancialStatementFormatCode,
  updateApiData,
}) => {
  const id = selectedRow?.id;
  const [deleteModal, setDeleteModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const controller = 'financial-management';
  const actionGet = 'get-report-code-definition'; // GET için varsayılan action
  const actionPost = 'get-report-code-definition'; // POST için action
  const actionPut = 'get-report-code-definition'; // PUT için action
  const actionDelete = 'get-report-code-definition';
  const [{ loading, error, apiData }, { setQueryParams, submitData }] =
    useGetDataApi(
      controller,
      actionGet,
      [], // Başlangıç verisi yok
      { id: selectedRow?.id },
      false, // İlk çağrıda veri çek
      null, // Callback fonksiyonu yok
      'GET', // Veri çekmek için GET metodu
    );
  const [formData, setformData] = useState(apiData || {});

  useEffect(() => {
    if (id) {
      setQueryParams({ id });
    }
  }, [id]);
  const handleDeleteRecord = () => {
    console.log(selectedRow);

    submitData(selectedRow, 'DELETE', actionDelete, () => {
      updateApiData(selectedRow, 'remove');
      setSelectedRow(null);
    });
    setDeleteModal(false);
  };
  const handleSelectRecord = (data) => {
    // Update formData state with the new data
    setformData({
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

  const handleCodeSelected = () => {
    // setSelectedIFRSCode(data.ifrs_code);
    setModalOpen(false);
  };
  useEffect(() => {
    setformData(apiData || {});
  }, [apiData]);

  useEffect(() => {
    if (selectedRow.id) {
      setQueryParams;
      ({ id: selectedRow?.id });
    } else {
      setformData({
        financial_statement_type_id:
          selectedRow?.financial_statement_type_id || '',
        id: 0,
        is_locked: 0,
        bilanco_tipi: 'Listeden seçim yapınız...',
        financial_statement_format_code: financialStatementFormatCode,
      });
    }
  }, [selectedRow]);
  const title = formData?.label || 'Yeni Kayıt Ekle';
  return (
    <Card>
      <AppDeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteRecord}
        onCloseClick={() => setDeleteModal(false)}
        handleCodeSelected={handleCodeSelected}
      />
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>{title}</h5>

        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={() => setSelectedRow(null)}
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
              financial_statement_format_code: financialStatementFormatCode,
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
                        onClick={() => setSelectedRow(null)}
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
          <Row className='mt-2'>
            <Col>
              <DefinitionsFormTabs formData={formData} />
            </Col>
          </Row>

          {isModalOpen && (
            <AppSelectIFRSCodeModal
              isOpen={isModalOpen}
              toggle={() => setModalOpen(!isModalOpen)}
              onReportCodeSelect={handleSelectRecord}
              financialStatementFormatCode={financialStatementFormatCode}
              setFinancialStatementFormatCode={setFinancialStatementFormatCode}
            />
          )}
        </StyledSimpleBarForm>
      </CardBody>
    </Card>
  );
};

DefinitionsForm.propTypes = {
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func.isRequired,
  refreshTable: PropTypes.func.isRequired,
  updateApiData: PropTypes.func.isRequired,
  financialStatementFormatCode: PropTypes.number.isRequired,
  setFinancialStatementFormatCode: PropTypes.func.isRequired,
};

export default DefinitionsForm;
