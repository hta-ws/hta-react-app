import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SpSelectInput from './FormInputs/SpSelectInput';
import FormikInput from './FormInputs/FormikInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFinancialStatementProcedureList,
  getSpMetadata,
  setCurrentPopulationRecord,
} from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooksOld';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import {
  selectSpMetadata,
  selectSelectedPopulationRecord,
  selectFinancialStatementProcedureList,
} from 'toolkit/selectors/adminSelectors';
import TextDivider from '../../Components/TextDivider';
import InputForReportCode from './FormInputs/InputForReportCode';
import SelectReportCode from './FormInputs/SelectReportCode';
import AppAlert from '@hta/components/AppAlert';
import AppDeleteModal from '@hta/components/AppDeleteModal';
// import CalculationResults from './components/CalculationResults';

import InformationTabs from '../InformationTabs/InformationTabs';
const FormView = ({ updateApiData }) => {
  const dispatch = useDispatch();
  const spMetadata = useSelector(selectSpMetadata);
  const selectedRow = useSelector(selectSelectedPopulationRecord);
  const [deleteModal, setDeleteModal] = useState(false);
  const financialStatementProcedureList = useSelector(
    selectFinancialStatementProcedureList,
  );

  const [selectedSpId, setSelectedSpId] = useState('');
  const [formValues, setFormValues] = useState({});

  const controller = 'financial-management';
  const actionGet = 'get-report-calculation-code';
  const actionDelete = 'get-report-calculation-code';
  const actionPost = 'get-report-calculation-code'; // POST için action
  const actionPut = 'get-report-calculation-code'; // PUT için action
  const [{ loading, error, apiData }, { setQueryParams, submitData }] =
    useGetDataApi(controller, actionGet, null, {}, false, null, 'GET');
  const [formData, setFormData] = useState();
  useEffect(() => {
    if (formData) {
      setSelectedSpId(formData.sp_id);
      setFormValues(getInitialValues(spMetadata, formData.sp_id, formData));
    }
  }, [formData]);

  useEffect(() => {
    if (!financialStatementProcedureList.length) {
      dispatch(getFinancialStatementProcedureList());
    }
    dispatch(getSpMetadata());
  }, [dispatch, financialStatementProcedureList.length]);

  useEffect(() => {
    if (selectedRow?.id) {
      setQueryParams({ id: selectedRow.id });
    } else {
      // If there's no selected row, you might want to reset the form data or set it to default values.
      setFormData(selectedRow);
      setFormValues(getInitialValues(spMetadata, null, formData));
    }
  }, [selectedRow, setQueryParams]);
  useEffect(() => {
    if (apiData) {
      setFormData(apiData);
    }
  }, [apiData]);
  console.log('formData', formData, 'selectedRow', selectedRow);
  const [validationSchema, setValidationSchema] = useState(
    createValidationSchema(spMetadata, selectedSpId),
  );
  useEffect(() => {
    const newSchema = createValidationSchema(spMetadata, selectedSpId);
    setValidationSchema(newSchema);
  }, [spMetadata, selectedSpId]);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Correctly assign HTTP method based on the presence of formData.id
      const method = values.id ? 'POST' : 'PUT'; // Use PUT for update, POST for create
      const action = values.id ? actionPost : actionPut; // Dynamically set the action based on formData.id

      submitData(values, method, action, (responseData) => {
        updateApiData(responseData.items);
        setSubmitting(false);
        //resetForm();
      });
    },
    enableReinitialize: true,
  });

  const handleSpChange = (value) => {
    setSelectedSpId(value);
  };
  useEffect(() => {
    formik.setValues(formValues);
  }, [formValues]);
  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', actionDelete, (response) => {
      console.log(response);
      if (response?.code == 0) {
        updateApiData(formData, 'remove');
        clearSelectedRow(null);
      }
    });
    setDeleteModal(false);
  };
  const handleCodeSelected = () => {
    // setSelectedIFRSCode(data.ifrs_code);
    setDeleteModal(false);
  };
  const clearSelectedRow = () => {
    dispatch(setCurrentPopulationRecord(null));
  };

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>Report Codes and Labels</h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={() => dispatch(setCurrentPopulationRecord(null))}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <SpSelectInput
            name='sp_id'
            label='Hesaplamada Kullanılacak Formul Seçiniz..... '
            formik={formik}
            onChange={handleSpChange} // Assume handleSpChange updates state or calls some other function
          />
          <TextDivider text='Rapor Tanımları' />
          {spMetadata
            .filter((meta) => meta.sp_definition_id === selectedSpId)
            .map((meta) => (
              <React.Fragment key={meta.parameter_name}>
                {meta.parameter_name === 's_report_code' ? (
                  <InputForReportCode
                    field={formik.getFieldProps(meta.parameter_name)}
                    form={formik}
                    label={meta.label || meta.parameter_name}
                    buttonText='Açıklamadan al' // Buton metnini burada belirleyebilirsiniz
                  />
                ) : meta.type === 'multi-select' ? ( // 'type' özelliğine göre koşullu render
                  <SelectReportCode
                    value={formik.values[meta.parameter_name]}
                    onChange={(value) =>
                      formik.setFieldValue(meta.parameter_name, value)
                    }
                    isMulti={true}
                    label={meta.label}
                    error={formik.errors[meta.parameter_name]}
                    touched={formik.touched[meta.parameter_name]}
                  />
                ) : meta.type === 'select' ? ( // 'type' özelliğine göre koşullu render
                  <SelectReportCode
                    value={formik.values[meta.parameter_name]}
                    onChange={(value) =>
                      formik.setFieldValue(meta.parameter_name, value)
                    }
                    isMulti={false}
                    label={meta.label}
                    error={formik.errors[meta.parameter_name]}
                    touched={formik.touched[meta.parameter_name]}
                  />
                ) : (
                  <FormikInput
                    field={formik.getFieldProps(meta.parameter_name)}
                    form={formik}
                    label={meta.label || meta.parameter_name}
                  />
                )}
                {meta.sort_order === 20 && (
                  <TextDivider text='Rapor Hesaplama Parametreleri' />
                )}
              </React.Fragment>
            ))}
          <Row>
            <Col className='auto'>
              <div className='hstack gap-2 justify-content-end'>
                {formik.isSubmitting && loading && (
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'
                  ></span>
                )}
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting}
                >
                  {formik.values.id ? 'Kaydet' : 'Ekle'}
                </button>
                <button
                  type='button'
                  className='btn btn-soft-success'
                  onClick={() => dispatch(setCurrentPopulationRecord(null))}
                >
                  Cancel
                </button>
                {formik.values.id && formik.values.is_locked !== 1 && (
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => setDeleteModal(true)}
                  >
                    Delete
                  </button>
                )}
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
        </form>
        {formData?.id && (
          <>
            {/* <CalculationResults results={formData.calculationResults || []} /> */}
          </>
        )}
        <Row className='mt-2'>
          <Col>
            <InformationTabs formData={formik.values} />
          </Col>
        </Row>
      </CardBody>
      <AppDeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteRecord}
        onCloseClick={() => setDeleteModal(false)}
        handleCodeSelected={handleCodeSelected}
      />
    </Card>
  );
};

const getInitialValues = (metadata, spId, formData) => {
  const staticFields = {
    id: formData?.id || '',
    s_report_code: formData?.s_report_code || '',
    s_label: formData?.s_label || '',
    sp_id: spId || '',
    p_multiplier: formData?.p_multiplier || 1,
    financial_statement_format_id:
      formData?.financial_statement_format_id || '',
  };

  const dynamicFields = metadata
    .filter((meta) => meta.sp_definition_id === spId)
    .reduce(
      (values, meta) => ({
        ...values,
        [meta.parameter_name]: formData[meta.parameter_name] || '',
      }),
      {},
    );

  return { ...staticFields, ...dynamicFields };
};

const createValidationSchema = (metadata, spId) => {
  const relevantMetadata = metadata.filter(
    (meta) => meta.sp_definition_id === spId,
  );

  return Yup.object().shape(
    relevantMetadata.reduce(
      (acc, meta) => {
        let validator;

        if (meta.type === 'multi-selectpp') {
          // Multi-select için bir dizi validator oluştur
          validator = Yup.array()
            .of(
              Yup.object().shape({
                value: Yup.string().required('Seçim zorunludur'),
                label: Yup.string().required('Seçim zorunludur'),
              }),
            )
            .min(1, `${meta.label} en az bir seçim yapılmalıdır.`)
            .required(`${meta.label} doldurulması zorunlu alandır.`);
        } else {
          // Diğer tüm string tipi inputlar için standart bir validator
          validator = meta.required
            ? Yup.string().required(
                `${meta.label} doldurulması zorunlu alandır.`,
              )
            : Yup.string();
        }

        acc[meta.parameter_name] = validator;
        return acc;
      },
      {
        // Initialize the reduction with a validation for sp_id
        sp_id: Yup.number().required(
          'Hesaplamada kullanılacak formul seçim zorunludur',
        ),
      },
    ),
  );
};
FormView.propTypes = {
  updateApiData: PropTypes.func.isRequired,
};
export default FormView;
