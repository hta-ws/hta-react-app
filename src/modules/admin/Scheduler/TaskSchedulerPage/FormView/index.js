import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReUnixCron, Tab } from '@sbzen/re-cron';
import { localization } from 'shared/localization/cron';
import { toast } from 'react-toastify';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Card
import {
  getSchedulerMethodList,
  getSchedulerStatusList,
} from 'toolkit/actions';
import {
  selectSchedulerMethodList,
  selectSchedulerStatusList,
} from 'toolkit/selectors/adminSelectors';
import { useGetDataApi } from '@hta/hooks/APIHooks';
import { useSelectOptionsFromTableData } from '@hta/hooks/useSelectOptionsFromTableData';
import CustomSelect from './CustomSelect';
import { FormViewBar } from '../styled';
const FormView = ({ onRefreshTable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const schedulerMethodList = useSelector(selectSchedulerMethodList);
  const schedulerStatusList = useSelector(selectSchedulerStatusList);

  useEffect(() => {
    if (schedulerMethodList.length === 0) dispatch(getSchedulerMethodList());
    if (schedulerStatusList.length === 0) dispatch(getSchedulerStatusList());
  }, []);
  const title = id ? 'Formul Güncelleme' : 'Formul Ekleme';
  const [apiStates, apiActions] = useGetDataApi({
    controller: 'scheduler',
    action: 'get-task',
    method: 'POST',
    initialData: {},
  });
  const { apiData: schedulerTask, loading } = apiStates;

  const { setQueryParams, resetData, submitData } = apiActions;
  const sourceOptions = useSelectOptionsFromTableData(
    schedulerMethodList,
    'class',
    'className',
    { value: '', label: 'Kaynak Seçiniz' },
  );
  useEffect(() => {
    if (id) {
      setQueryParams({ id: id });
    } else {
      resetData();
    }
  }, [id]);

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      source: (schedulerTask && schedulerTask.source) || '',
      method: (schedulerTask && schedulerTask.method) || '',
      comment: (schedulerTask && schedulerTask.comment) || '',
      status_id: (schedulerTask && schedulerTask.status_id) || 1,
      cron_time: (schedulerTask && schedulerTask.cron_time) || '*/5 * * * *',
      //   date: (schedulerTask && schedulerTask.date) || '',
      //   tags: (schedulerTask && schedulerTask.tags) || '',
    },
    validationSchema: Yup.object({
      method: Yup.string().required('Required'),
      comment: Yup.string().required('Please Enter Company'),

      // date: Yup.string().required("Please Enter Date"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Seçili satır varsa PUT, yoksa POST
      const action = values.id ? 'update-task' : 'create-task'; // Action'ı dinamik olarak ayarla

      submitData(values, 'POST', action, (response) => {
        if (response?.code === 0) {
          // İşlem başarılıysa, başarılı bildirimi yap
          toast.success('Görev başarıyla başlatıldı!', {
            autoClose: 3000, // 3 saniye sonra otomatik kapanır
          });
          if (!values.id) navigate('/admin/task/edit/' + response?.items?.id);
          onRefreshTable({});
        } else {
          // İşlem başarısızsa, hata bildirimi yap
          toast.error(response?.message || 'Görev başlatılamadı', {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        setSubmitting(false);
      });

      // submitData(values, method, action, (responseData) => {
      //   if (responseData?.code == 0) {
      //     // updateApiData(responseData.items);
      //     // if (!values.id)
      //     // dispatch(setCurrentPopulationRecord(responseData.items));
      //   }
      //   setSubmitting(false);
      // });
    },
  });
  const filteredItems = schedulerMethodList.filter(
    (item) => item.class === formik.values.source,
  );
  const { errors, dirty, isSubmitting } = formik;
  // Öncelikle handleChangeMethod fonksiyonunuzu tanımlayın
  const handleChangeMethod = (option) => {
    // option, react-select tarafından sağlanan seçilen öğenin objesi
    if (option) {
      // filteredItems içinden seçilen değere göre başka bir alanı güncelle
      const selectedOption = filteredItems.find(
        (item) => item.value === option.value,
      );
      if (selectedOption) {
        formik.setFieldValue('comment', selectedOption.label);
      } else {
        formik.setFieldValue('comment', '');
      }
    } else {
      // Eğer seçim kaldırılırsa, ilgili alanları temizle
      formik.setFieldValue('method', '');
    }

    // Formun doğrulamasını yap
    formik.validateForm();
  };

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-center'>
        <h5 className='mb-0'>
          <span className=''> {title}</span>
          {/* <span className='text-muted fw-normal fs-13 fw-500'>
            {title}
          </span>{' '} */}
        </h5>
        <button
          type='button'
          className='btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email material-shadow-none'
          onClick={() => navigate('/admin/task/list')}
        >
          <i className='ri-close-fill align-bottom'></i>
        </button>
      </CardHeader>
      <CardBody>
        <FormViewBar>
          <Form
            className='tablelist-form'
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              return false;
            }}
          >
            <Row className='mx-0'>
              <Col xxl={4} md={12} className='mb-1'>
                <Label htmlFor='source' className='form-label'>
                  Kaynak
                </Label>
                <CustomSelect
                  options={sourceOptions}
                  field={formik.getFieldProps('source')}
                  form={formik}
                  placeholder='Kaynak Seçiniz'
                />
                {formik.touched.source && formik.errors.source && (
                  <div className='error'>{formik.errors.source}</div>
                )}
              </Col>

              <Col xxl={8} md={6} className='mb-1'>
                {/* <Label htmlFor='method' className='form-label'>
                İşlem
              </Label>
              <CustomSelect
                options={filteredItems}
                field={formik.getFieldProps('method')}
                form={formik}
                placeholder='Method Seçiniz'
              />
              {formik.touched.method && formik.errors.method && (
                <div className='error'>{formik.errors.method}</div>
              )} */}

                <Label htmlFor='status_id' className='form-label'>
                  Görev Durumu
                </Label>
                <CustomSelect
                  options={filteredItems}
                  field={formik.getFieldProps('method')}
                  form={formik}
                  placeholder='İşlem Seçiniz'
                  onChange={handleChangeMethod}
                />
                {formik.touched.status_id && formik.errors.status_id && (
                  <div className='error'>{formik.errors.status_id}</div>
                )}
              </Col>
              <Col xxl={12} md={6} className='mb-1'>
                <Col>
                  <Label
                    htmlFor='exampleFormControlTextarea5'
                    className='form-label'
                  >
                    Acıklama
                  </Label>
                  <Input
                    name='comment'
                    type='textarea'
                    className='form-control'
                    rows='2'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment || ''}
                    invalid={
                      formik.touched.comment && formik.errors.comment
                        ? true
                        : false
                    }
                  ></Input>
                </Col>
              </Col>
              <Col xxl={4} md={6} className='mb-1'>
                <Label htmlFor='method' className='form-label'>
                  İşlem
                </Label>
                <CustomSelect
                  options={schedulerStatusList}
                  field={formik.getFieldProps('status_id')}
                  form={formik}
                  placeholder='Method Seçiniz'
                />
                {formik.touched.method && formik.errors.method && (
                  <div className='error'>{formik.errors.method}</div>
                )}
              </Col>
              <Col xxl={8} className='mb-1'>
                <Col>
                  <Label htmlFor='readonlyPlaintext' className='form-label'>
                    Cron Bilgisi
                  </Label>
                  <Input
                    name='cron_time'
                    value={formik.values.cron_time || ''}
                    type='text'
                    onChange={formik.handleChange}
                    className='form-control   '
                    id='valueInput'
                    // disabled
                  />
                </Col>
              </Col>
              <Col sm={12} className='mt-2'>
                <ReUnixCron
                  value={formik.values.cron_time || ''}
                  onChange={(cron) => {
                    formik.setFieldValue('cron_time', cron);
                  }}
                  localization={localization}
                  tabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY]}
                />
              </Col>
            </Row>
            <div className=' mt-4 d-grid gap-2 d-md-flex justify-content-md-end'>
              {/* <Link
              to={`/admin/scheduler/list`}
              className='btn btn btn-light me-md-2'
              type='button'
            >
              İptal
            </Link> */}
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
              {!dirty && (
                <>
                  <Link
                    to={`/admin/task/list`}
                    className='btn btn btn-light me-md-2'
                    type='button'
                  >
                    Kapat
                  </Link>
                  {id && (
                    <Link
                      to={`/admin/task/edit`}
                      className='btn btn btn-success me-md-2'
                      type='button'
                    >
                      <i className='ri-add-line align-bottom me-1'></i>
                      Yeni Görev Ekle
                    </Link>
                  )}
                </>
              )}

              {dirty && (
                <>
                  <Link
                    to={`/admin/task/list`}
                    className='btn btn btn-light me-md-2'
                    type='button'
                  >
                    <i className=' ri-arrow-go-back-line align-bottom me-1'></i>
                    iptal
                  </Link>
                  <Button
                    className='btn btn-success'
                    type='submit'
                    disabled={!dirty || Object.keys(errors).length > 0}
                  >
                    <i className=' ri-save-3-line align-bottom me-1'></i>
                    {id ? 'Kaydet' : 'Yeni Görev Oluştur'}
                  </Button>
                </>
              )}
            </div>
          </Form>
        </FormViewBar>
      </CardBody>
    </Card>
  );
};

FormView.propTypes = {
  onRefreshTable: PropTypes.func.isRequired,
};
export default FormView;
