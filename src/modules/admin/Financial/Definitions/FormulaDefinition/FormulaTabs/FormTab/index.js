import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { selectFsSpMetadataList, selectFsTemplateId } from 'toolkit/selectors';
import { getFsSpMetadataList, setSelectedFormulaRecord } from 'toolkit/actions';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { Row, Col } from 'reactstrap';
import AppAlert from '@hta/components/AppAlert';
import SpSelectInput from '../../../Components/SpSelectInput';
import TextDivider from '../../../Components/TextDivider';
import SelectReportCode from '../../../Components/SelectReportCode';
import FormikInput from '../../../Components/FormikInput';
import InputForReportCode from '../../../Components/InputForReportCode';
import FormulaView from './FormulaView';
import AppDeleteModal from '@hta/components/AppDeleteModal';
import { toast } from 'react-toastify';

const FormulaForm = ({ updateApiData }) => {
  const dispatch = useDispatch();
  const { template, id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const spMetadataList = useSelector(selectFsSpMetadataList);
  const selectedTemplateId = useSelector(selectFsTemplateId);
  const navigate = useNavigate();

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

  const getBasePath = () => {
    const parts = location.pathname.split('/');
    if (template && id) {
      return parts.slice(0, -2).join('/');
    } else if (template) {
      return parts.slice(0, -1).join('/');
    }
    return parts.join('/');
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const method = values.id ? 'PUT' : 'POST';
      const action = values.id ? 'update-formula' : 'create-formula';
      values.fs_template_id = selectedTemplateId;
      submitData(values, method, action, (responseData) => {
        if (responseData?.code === 0) {
          toast.success(responseData?.message, {
            autoClose: 3000,
          });
          updateApiData(responseData.items);
          setFormData(responseData.items);
          const newId = responseData.items.id;
          if (!values.id) navigate(`${getBasePath()}/${template}/${newId}`);
          updateApiData(responseData.items);
          setSubmitting(false);
        } else {
          let errorMessage = 'HATA ALINDI';

          if (responseData?.error) {
            if (typeof responseData.error === 'object') {
              errorMessage = Object.values(responseData.error)
                .flat()
                .join(', ');
            } else {
              errorMessage = responseData.error.toString();
            }
          } else if (responseData?.message) {
            errorMessage = responseData.message;
          }

          toast.error(errorMessage, {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
            ) : meta.parameter_type === 'number' ? (
              <FormikInput
                type='number'
                step='0.0001'
                min='-1000000000000'
                field={formik.getFieldProps(meta.parameter_name)}
                form={formik}
                label={meta.label || meta.parameter_name}
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

  return Yup.object().shape(
    relevantMetadata.reduce(
      (acc, meta) => {
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
