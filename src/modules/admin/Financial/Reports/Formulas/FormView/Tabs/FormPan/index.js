import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  selectSelectedFormulaRecord,
  selectFinancialStatementFormatId,
  selectSpMetadata,
} from 'toolkit/selectors/adminSelectors';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { Row, Col } from 'reactstrap';
import AppAlert from '@hta/components/AppAlert';
import { setSelectedFormulaRecord } from 'toolkit/actions';
import SpSelectInput from 'modules/admin/Financial/Reports/Components/SpSelectInput';
import TextDivider from 'modules/admin/Financial/Reports/Components/TextDivider';
import SelectReportCode from 'modules/admin/Financial/Reports/Components/SelectReportCode';
import FormikInput from 'modules/admin/Financial/Reports/Components/FormikInput';
import InputForReportCode from 'modules/admin/Financial/Reports/Components/InputForReportCode';
import FormulaView from 'modules/admin/Financial/Reports/Components/FormulaView';
import AppDeleteModal from '@hta/components/AppDeleteModal';
const FormPan = ({ updateTableData }) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const selectedRecord = useSelector(selectSelectedFormulaRecord);
  const spMetadataList = useSelector(selectSpMetadata);
  const financialStatementFormatId = useSelector(
    selectFinancialStatementFormatId,
  );

  const [formData, setFormData] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [spId, setSpId] = useState();

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'financial-statement-management',
    action: 'get-formula',
    method: 'POST',
    initialData: {
      financial_statement_format_id: financialStatementFormatId,
      p_multiplier: 100,
    },
  });

  const { apiData, error, loading } = apiStates;

  const { setQueryParams, submitData } = apiActions;
  useEffect(() => {
    if (selectedRecord?.id) {
      setQueryParams({ id: selectedRecord.id });
    } else {
      const initialValues = {
        ...getInitialValues(),
        sp_id: 1,
        financial_statement_format_id: financialStatementFormatId,

        // 'sp_id' alanını ekleyip değerini 1 olarak ayarla
      }; // Fonksiyonu doğru parametre ile çağır

      setFormData(initialValues);
      setSpId(1);
    }
  }, [
    selectedRecord,
    setQueryParams,
    spMetadataList,
    financialStatementFormatId,
  ]);
  useEffect(() => {
    setFormData(apiData);
    setSpId(apiData?.sp_id);
    const newSchema = createValidationSchema(spMetadataList, apiData?.sp_id);

    setValidationSchema(newSchema);
  }, [apiData]);

  useEffect(() => {
    const newSchema = createValidationSchema(spMetadataList, spId);
    setValidationSchema(newSchema);
  }, [spId]);
  const handleSpChange = (value) => {
    setSpId(value);
  };
  // useEffect(() => {
  //   const newSchema = createValidationSchema(spMetadata, spId);
  //   console.log('spId', spId, 'newSchema', newSchema, 'formData', formData);
  //   setValidationSchema(newSchema);
  // }, [spMetadata, spId]);
  const handleCodeSelected = () => {
    // setSelectedIFRSCode(data.ifrs_code);
    setDeleteModal(false);
  };
  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', 'delete-formula', (response) => {
      if (response?.code == 0) {
        updateTableData(formData, 'remove');
        dispatch(setSelectedFormulaRecord(null));
      }
    });
    setDeleteModal(false);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Correctly assign HTTP method based on the presence of formData.id
      const method = values.id ? 'POST' : 'PUT'; // Use PUT for update, POST for create
      const action = values.id ? 'update-formula' : 'create-formula'; // Dynamically set the action based on formData.id
      values.financial_statement_format_id = financialStatementFormatId;
      submitData(values, method, action, (responseData) => {
        if (responseData?.code == 0) {
          updateTableData(responseData.items);
          if (!values.id)
            dispatch(setSelectedFormulaRecord(responseData.items));

          setSubmitting(false);
        }
        setSubmitting(false);
      });
    },
    enableReinitialize: true,
  });

  const getInitialValues = () => {
    const initialValues = spMetadataList.reduce((values, meta) => {
      // Check if the parameter_name is 'p_multiplier' and set its value to 100, otherwise set it as ''
      return {
        ...values,
        [meta.parameter_name]:
          meta.parameter_name === 'p_multiplier' ? 100 : '',
      };
    }, {});

    // You mentioned adding financial_statement_format_id,
    // Assuming you want to add this with a default value (e.g., an empty string or a specific value)
    // initialValues['financial_statement_format_id'] = ''; // Set default value accordingly

    return initialValues;
  };

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <SpSelectInput
        name='sp_id'
        label='Hesaplamada Kullanılacak Formul Seçiniz..... '
        formik={formik}
        onChange={handleSpChange} // Assume handleSpChange updates state or calls some other function
      />
      <TextDivider text='Rapor Tanımları' />

      {spMetadataList
        .filter((meta) => meta.sp_definition_id === spId)
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
      <Row className='my-4'>
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
              {formik.values?.id ? 'Kaydet' : 'Ekle'}
            </button>
            <button
              type='button'
              className='btn btn-soft-success'
              onClick={() => dispatch(setSelectedFormulaRecord(null))}
            >
              Cancel
            </button>
            {formik.values?.id && formik.values?.is_locked !== 1 && (
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
      <Row className='mt-2'>
        <Col md='12'>
          {formData?.id && <FormulaView formikValues={formik.values} />}
        </Col>
      </Row>
      <AppDeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteRecord}
        onCloseClick={() => setDeleteModal(false)}
        handleCodeSelected={handleCodeSelected}
      />
    </form>
  );
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
FormPan.propTypes = {
  updateTableData: PropTypes.func.isRequired,
};

export default FormPan;
