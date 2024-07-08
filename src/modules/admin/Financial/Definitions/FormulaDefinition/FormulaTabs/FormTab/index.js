import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  selectSelectedFormulaRecord,
  selectFsSpMetadataList,
  selectFsTemplateId,
} from 'toolkit/selectors';
import { getFsSpMetadataList } from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { Row, Col } from 'reactstrap';
import AppAlert from '@hta/components/AppAlert';
import { setSelectedFormulaRecord } from 'toolkit/actions';
import SpSelectInput from 'modules/admin/Financial/Reports/Components/SpSelectInput';
import TextDivider from 'modules/admin/Financial/Reports/Components/TextDivider';
import SelectReportCode from '../../../Components/SelectReportCode';
import FormikInput from 'modules/admin/Financial/Reports/Components/FormikInput';
import InputForReportCode from 'modules/admin/Financial/Reports/Components/InputForReportCode';
import FormulaView from './FormulaView';
import AppDeleteModal from '@hta/components/AppDeleteModal';

const FormulaForm = ({ updateApiData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const selectedRecord = useSelector(selectSelectedFormulaRecord);
  const spMetadataList = useSelector(selectFsSpMetadataList);
  const selectedTemplateId = useSelector(selectFsTemplateId);
  console.log('spMetadataList', spMetadataList);

  const [formData, setFormData] = useState();
  const [validationSchema, setValidationSchema] = useState();
  const [spId, setSpId] = useState();

  const [apiStates, apiActions] = useGetDataApi({
    controller: 'formula-definition',
    action: 'get-formula',
    method: 'POST',
    initialData: {
      fs_template_id: selectedTemplateId,
      p_multiplier: 100,
    },
  });

  const { apiData, error, loading } = apiStates;
  const { setQueryParams, submitData } = apiActions;

  useEffect(() => {
    if (id) {
      setQueryParams({ id, fs_template_id: selectedTemplateId });
    } else {
      const initialValues = {
        ...getInitialValues(),
        sp_id: 1,
        fs_template_id: selectedTemplateId,
      };
      setFormData(initialValues);
      setSpId(1);
    }
  }, [id, setQueryParams, spMetadataList, selectedTemplateId]);

  useEffect(() => {
    dispatch(getFsSpMetadataList());
  }, [dispatch]);

  useEffect(() => {
    setFormData(apiData);
    setSpId(apiData?.sp_id);
    const newSchema = createValidationSchema(spMetadataList, apiData?.sp_id);
    setValidationSchema(newSchema);
  }, [apiData, spMetadataList]);

  useEffect(() => {
    const newSchema = createValidationSchema(spMetadataList, spId);
    setValidationSchema(newSchema);
  }, [spId, spMetadataList]);

  const handleSpChange = (value) => {
    console.log('spId', value);
    setSpId(value);
  };

  const handleCodeSelected = () => {
    setDeleteModal(false);
  };

  const handleDeleteRecord = () => {
    submitData(formData, 'DELETE', 'delete-formula', (response) => {
      if (response?.code === 0) {
        updateApiData(formData, 'remove');
        dispatch(setSelectedFormulaRecord(null));
      }
    });
    setDeleteModal(false);
  };
  console.log('formData', formData);
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const method = values.id ? 'PUT' : 'POST';
      const action = values.id ? 'update-formula' : 'create-formula';
      values.fs_template_id = selectedTemplateId;
      submitData(values, method, action, (responseData) => {
        if (responseData?.code === 0) {
          updateApiData(responseData.items);
          if (!values.id) {
            dispatch(setSelectedFormulaRecord(responseData.items));
          }
          setSubmitting(false);
        }
        setSubmitting(false);
      });
    },
    enableReinitialize: true,
  });

  const getInitialValues = () => {
    const initialValues = spMetadataList.reduce((values, meta) => {
      return {
        ...values,
        [meta.parameter_name]:
          meta.parameter_name === 'p_multiplier' ? 100 : '',
      };
    }, {});
    return initialValues;
  };

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <SpSelectInput
        name='sp_id'
        label='Hesaplamada Kullanılacak Formul Seçiniz..... '
        formik={formik}
        onChange={handleSpChange}
      />
      <TextDivider text='Rapor Tanımları' />
      {spMetadataList
        .filter((meta) => meta.fs_sp_definition_id === spId)
        .map((meta) => (
          <React.Fragment key={meta.parameter_name}>
            {meta.parameter_name === 's_report_code' ? (
              <InputForReportCode
                field={formik.getFieldProps(meta.parameter_name)}
                form={formik}
                label={meta.label || meta.parameter_name}
                buttonText='Açıklamadan al'
              />
            ) : meta.type === 'multi-select' ? (
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
            ) : meta.type === 'select' ? (
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
    (meta) => meta.fs_sp_definition_id === spId,
  );

  console.log('Relevant Metadata:', relevantMetadata); // Debugging: Log relevant metadata

  return Yup.object().shape(
    relevantMetadata.reduce(
      (acc, meta) => {
        console.log(
          `Parameter: ${meta.parameter_name}, Required: ${meta.required}`,
        ); // Debugging: Log parameter name and its required value
        let validator;

        if (meta.required) {
          validator = Yup.string().required(
            `${meta.label} doldurulması zorunlu alandır.`,
          );
        } else {
          validator = Yup.string();
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

FormulaForm.propTypes = {
  updateApiData: PropTypes.func.isRequired,
};

export default FormulaForm;
