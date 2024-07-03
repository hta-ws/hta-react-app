import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col, Alert } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AppAlert from '@hta/components/AppAlert';
import AppDeleteModal from '@hta/components/AppDeleteModal';
import IfrsCodeSelect from '../../../Components/IfrsCodeSelect';
import { StyledSimpleBarForm } from 'modules/admin/Financial/Reports/Components/styled';
// import InformationTabs from './InformationTabs/InformationTabs';

const validationSchema = Yup.object().shape({
  report_code: Yup.string().required('Rapor kodu zorunludur'),
  label: Yup.string().required('Açıklama zorunludur'),
  ifrs_code: Yup.string().required('IRFS kodu zorunludur'),
  id: Yup.number(),
});

const FormTab = ({ formData, updateApiData, onClose, apiError }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formDataState, setFormData] = useState(formData || {});
  console.log('formData', formData);
  useEffect(() => {
    setFormData(formData);
  }, [formData]);

  const handleDeleteRecord = () => {
    // Delete işlemi için gerekli fonksiyonlar
  };

  const handleCodeSelected = () => {
    // Code seçimi için gerekli fonksiyonlar
  };

  const handleSelectRecord = (data) => {
    // Record seçimi için gerekli fonksiyonlar
  };

  return (
    <Card>
      <CardBody>
        <StyledSimpleBarForm>
          <Formik
            initialValues={{
              report_code: formDataState?.report_code || '',
              label: formDataState?.label || '',
              ifrs_code: formDataState?.ifrs_code || '',
              id: formDataState?.id || 0,
              financial_statement_type_id:
                formDataState?.financial_statement_type_id || '',
              financial_statement_format_id:
                formDataState?.financial_statement_format_id || '',
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const method = values.id ? 'POST' : 'PUT';
              const action = values.id
                ? 'update-code-definition'
                : 'create-code-definition';

              // Submit işlemi için gerekli fonksiyonlar
              submitData(values, method, action, (responseData) => {
                updateApiData(responseData);
                setSubmitting(false);
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete='off'>
                <div className='mb-3'>
                  <label htmlFor='report_code'>Repor Kodu</label>
                  <Field
                    name='report_code'
                    type='text'
                    className='form-control'
                    disabled={formDataState?.is_locked === 1}
                  />
                  <ErrorMessage
                    name='report_code'
                    component='div'
                    className='field-error text-warning'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='label'>Açıklama</label>
                  <Field name='label' type='text' className='form-control' />
                  <ErrorMessage
                    name='label'
                    component='div'
                    className='field-error text-warning'
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
                      disabled={formDataState?.is_locked === 1}
                      readOnly
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={() => setModalOpen(true)}
                      disabled={formDataState?.is_locked === 1}
                    >
                      <i className='ri-search-line search-icon align-bottom me-1'></i>
                      Listeden seç
                    </button>
                  </div>
                  <ErrorMessage
                    name='ifrs_code'
                    component='div'
                    className='field-error text-warning'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='bilanco_tipi'>Bilanço Tipi</label>
                  <span className='form-control'>
                    {formDataState?.fs_type_name}
                  </span>
                </div>
                <Row>
                  <Col> </Col>
                  <Col className='auto'>
                    <div className='hstack gap-2 justify-content-end'>
                      {isSubmitting && (
                        <span>
                          <span
                            className='spinner-border spinner-border-sm'
                            role='status'
                            aria-hidden='true'
                          ></span>
                          Data işleniyor...
                        </span>
                      )}
                      <button
                        type='submit'
                        className='btn btn-primary'
                        disabled={isSubmitting}
                      >
                        {formDataState?.id ? 'Kaydet' : 'Ekle'}
                      </button>
                      <button
                        type='button'
                        className='btn btn-soft-success'
                        onClick={onClose}
                      >
                        İptal
                      </button>
                      {formDataState?.is_locked !== 1 && formDataState?.id ? (
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

                {apiError && (
                  <Row className='mt-2'>
                    <Col md='12'>
                      <AppAlert
                        color='danger'
                        strongMessage='İşleminiz sırasında bir hata oluştu:'
                        message={apiError}
                      />
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
          />
        )}
      </CardBody>
    </Card>
  );
};

FormTab.propTypes = {
  formData: PropTypes.object,
  updateApiData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  apiError: PropTypes.string, // Adding apiError prop type
};

export default FormTab;
