import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppAlert from '@hta/components/AppAlert';
import AppDeleteModal from '@hta/components/AppDeleteModal';
import IfrsCodeSelect from '../../../Components/IfrsCodeSelect';
import { StyledSimpleBarForm } from 'modules/admin/Financial/Reports/Components/styled';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { selectFsTemplateId } from 'toolkit/selectors';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';

const validationSchema = Yup.object().shape({
  report_code: Yup.string().required('Rapor kodu zorunludur'),
  label: Yup.string().required('Açıklama zorunludur'),
  ifrs_code: Yup.string().required('IRFS kodu zorunludur'),
  id: Yup.number(),
});

const FormTab = ({ updateApiData, onClose, showNewForm }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { template, id } = useParams();

  const selectedTemplateId = useSelector(selectFsTemplateId);

  const [apiState, apiActions] = useGetDataApi({
    controller: 'definition',
    action: 'get-code-definition',
    initialData: null,
    params: {},
    initialCall: false,
    method: 'POST',
  });
  const { submitData } = apiActions;
  const { error: apiError, apiData: formData } = apiState;
  const [formDataState, setFormData] = useState(formData || {});

  useEffect(() => {
    if (id) {
      apiActions.setQueryParams({
        id: parseInt(id, 10),
        fs_template_id: selectedTemplateId,
      });
    } else {
      setFormData({});
    }
  }, [id]);

  useEffect(() => {
    setFormData(formData);
  }, [formData]);

  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', 'delete-code-definition', (responseData) => {
      if (responseData?.code == 0) {
        toast.success(responseData?.message, {
          autoClose: 3000, // Closes automatically after 3 seconds
        });
        updateApiData(formData, 'remove');
        navigate(`${getBasePath()}/${template}`);
      } else {
        let errorMessage = 'HATA ALINDI';

        if (responseData?.error) {
          // If response contains an error object, check its structure
          if (typeof responseData.error === 'object') {
            errorMessage = Object.values(responseData.error).flat().join(', ');
          } else {
            errorMessage = responseData.error.toString();
          }
        } else if (responseData?.message) {
          // If response contains a direct message
          errorMessage = responseData.message;
        }

        // Display the error message in a toast
        toast.error(errorMessage, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
    setDeleteModal(false);
  };

  const handleCodeSelected = () => {
    // Code seçimi için gerekli fonksiyonlar
  };

  const handleSelectRecord = (data) => {
    // Update formData state with the new data
    setFormData({
      ...formDataState,
      report_code: data?.slug || '', // Assuming 'slug' is the 'report_code' you want to use
      label: data?.label || '',
      ifrs_code: data?.ifrs_code || '',
      fs_type_name: data?.fs_type_name || '',
      fs_type_id: data?.fs_type_id || '',
    });

    // Close the modal after selection
    setModalOpen(false);
  };

  const getBasePath = () => {
    const parts = location.pathname.split('/');
    if (template && id) {
      return parts.slice(0, -2).join('/');
    } else if (template) {
      return parts.slice(0, -1).join('/');
    }
    return parts.join('/');
  };

  const handleSlugify = (setFieldValue, values) => {
    const sLabelValue = slugify(values.label, { delimiter: '_' });
    setFieldValue('report_code', sLabelValue);
  };

  return (
    <Card>
      <CardBody>
        {apiError && !showNewForm && !id ? (
          <Row className='mt-2'>
            <Col md='12'>
              <AppAlert
                color='danger'
                strongMessage='İşleminiz sırasında bir hata oluştu:'
                message={apiError}
              />
            </Col>
          </Row>
        ) : (
          <StyledSimpleBarForm>
            <Formik
              initialValues={{
                report_code: formDataState?.report_code || '',
                label: formDataState?.label || '',
                ifrs_code: formDataState?.ifrs_code || '',
                id: formDataState?.id || 0,
                fs_type_id: formDataState?.fs_type_id || '',
                fs_template_id:
                  formDataState?.fs_template_id || selectedTemplateId,
                template_id: selectedTemplateId || '', // Include template_id
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                const method = values.id ? 'POST' : 'POST';
                const action = values.id
                  ? 'update-code-definition'
                  : 'create-code-definition';

                // Submit işlemi için gerekli fonksiyonlar

                submitData(values, method, action, (responseData) => {
                  if (responseData?.code == 0) {
                    toast.success(responseData?.message, {
                      autoClose: 3000, // 3 saniye sonra otomatik kapanır
                    });
                    updateApiData(responseData.items);
                    setFormData(responseData.items);
                    const newId = responseData.items.id;
                    if (!values.id)
                      navigate(`${getBasePath()}/${template}/${newId}`);
                  } else {
                    let errorMessage = 'HATA ALINDI';

                    if (responseData?.error) {
                      // If response contains an error object, check its structure
                      if (typeof responseData.error === 'object') {
                        errorMessage = Object.values(responseData.error)
                          .flat()
                          .join(', ');
                      } else {
                        errorMessage = responseData.error.toString();
                      }
                    } else if (responseData?.message) {
                      // If response contains a direct message
                      errorMessage = responseData.message;
                    }

                    // Display the error message in a toast
                    toast.error(errorMessage, {
                      autoClose: 3000,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form autoComplete='off'>
                  <div className='mb-3'>
                    <label htmlFor='label'>Açıklama</label>
                    <div className='input-group'>
                      <Field
                        name='label'
                        type='text'
                        className='form-control'
                      />
                      <button
                        className='btn btn-outline-secondary'
                        type='button'
                        onClick={() => handleSlugify(setFieldValue, values)}
                      >
                        Slug Oluştur
                      </button>
                    </div>
                    <ErrorMessage
                      name='label'
                      component='div'
                      className='field-error text-warning'
                    />
                  </div>
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
        )}
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
  apiError: PropTypes.string,
  showNewForm: PropTypes.bool.isRequired, // Adding apiError prop type
};

export default FormTab;
