import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { setCurrentPopulationRecord } from 'toolkit/actions'; // Make sure to import this action
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  report_code: Yup.string().required('Rapor kodu zorunludur'),
  label: Yup.string().required('Açıklama zorunludur'),
  ifrs_code: Yup.string().required('IRFS kodu zorunludur'),
  id: Yup.number(),
});
import AppAlert from '@hta/components/AppAlert';
import AppDeleteModal from '@hta/components/AppDeleteModal';
import IfrsCodeSelect from 'modules/admin/Financial/Reports/Components/IfrsCodeSelect';
import { StyledSimpleBarForm } from 'modules/admin/Financial/Reports/Components/styled';
import InformationTabs from './InformationTabs/InformationTabs';

import {
  selectSelectedPopulationRecord,
  selectFinancialStatementFormatId,
} from 'toolkit/selectors/adminSelectors';
const FromPan = ({ updateApiData }) => {
  const dispatch = useDispatch();

  const financialStatementFormatId = useSelector(
    selectFinancialStatementFormatId,
  );
  const selectedRecord = useSelector(selectSelectedPopulationRecord);

  // Extract ID from the selectedRow, if it exists
  const id = selectedRecord?.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'financial-statement-management',
    action: 'get-population-code',
    method: 'POST',
    initialData: {},
  });
  const { apiData, error, loading } = apiStates;

  const { setQueryParams, submitData } = apiActions;

  // Local state for managing form data, defaulting to apiData or an empty object
  const [formData, setFormData] = useState(apiData || {});

  // Effect to update form data when apiData changes
  useEffect(() => {
    if (apiData) {
      setFormData(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    if (id) {
      setQueryParams({ id: id });
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
  }, [id, setQueryParams, financialStatementFormatId]);

  // Function to clear the selected row
  const clearSelectedRow = () => {
    dispatch(setCurrentPopulationRecord(null));
  };
  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', 'delete-population-code', () => {
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
      financial_statement_format_id: data?.financialStatementFormatId || '',
    });

    // Close the modal after selection
    setModalOpen(false);
  };

  return (
    <Card>
      {/* <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>{title}</h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={clearSelectedRow}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader> */}
      <CardBody>
        <StyledSimpleBarForm>
          <Formik
            initialValues={{
              report_code: formData?.report_code || '',
              label: formData?.label || '',
              ifrs_code: formData?.ifrs_code || '',
              id: formData?.id || 0,
              financial_statement_type_id: formData.financial_statement_type_id,
              financial_statement_format_id: financialStatementFormatId,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const method = values.id ? 'POST' : 'PUT'; // Seçili satır varsa PUT, yoksa POST
              const action = values.id
                ? 'update-population-code'
                : 'create-population-code'; // Action'ı dinamik olarak ayarla

              submitData(values, method, action, (responseData) => {
                if (responseData?.code == 0) {
                  updateApiData(responseData.items);
                  if (!values.id)
                    dispatch(setCurrentPopulationRecord(responseData.items));
                }
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
                    disabled={formData?.is_locked == 1}
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
                    className='field-error text-warning'
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
                      <button
                        type='submit'
                        className='btn btn-primary'
                        disabled={isSubmitting}
                      >
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

                {error && (
                  <Row className='mt-2'>
                    <Col md='12'>
                      <AppAlert
                        color='danger'
                        strongMessage='İşleminiz sırasında bir hata oluştu:'
                        message={error}
                      />
                    </Col>
                  </Row>
                )}
              </Form>
            )}
          </Formik>

          <Row className='mt-2'>
            <Col>
              <InformationTabs formData={formData} />
            </Col>
          </Row>
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
FromPan.propTypes = {
  updateApiData: PropTypes.func.isRequired,
};
export default FromPan;
