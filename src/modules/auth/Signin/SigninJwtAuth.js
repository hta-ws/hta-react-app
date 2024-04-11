import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import AppAlert from '@hta/components/AppAlert';
// import AppInfoView from '@veo/components/AppInfoView';
// import { useNavigate } from 'react-router-dom';

import IntlMessages from '@hta/helpers/IntlMessages';
import { useIntl } from 'react-intl';

import { useAuthMethod } from '@hta/hooks/AuthHooks';
// import { common } from '@mui/material/colors';

const validationSchema = yup.object({
  username: yup
    .string()
    // .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.userNameRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninJwtAuth = () => {
  const { messages } = useIntl();
  // const navigate = useNavigate();
  const { signInUser } = useAuthMethod();
  const { error, message } = useSelector(({ common }) => common);

  const [passwordShow, setPasswordShow] = useState(false);
  // const onGoToForgetPassword = () => {
  //   navigate('/forget-password', { tab: 'jwtAuth' });
  // };

  return (
    <Row className='justify-content-center'>
      <Col md={8} lg={6} xl={5}>
        <Card className='mt-4'>
          <CardBody className='p-4'>
            <div className='text-center mt-2'>
              <h5 className='text-primary'>
                <IntlMessages id='sign.welcomeBack' />
              </h5>
              <p className='text-muted'>
                <IntlMessages id='sign.signInTo' />
              </p>
            </div>
            {error && error ? (
              <AppAlert color='danger' message={message} />
            ) : null}
            <Formik
              validateOnChange={true}
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                signInUser({
                  username: data.username,
                  password: data.password,
                }).finally(() => {
                  setSubmitting(false); // Ensure setSubmitting is called in a finally block
                });
              }}
            >
              {(formik) => (
                <Form
                  style={{ textAlign: 'left' }}
                  noValidate
                  autoComplete='off'
                >
                  <div className='mb-3'>
                    <Label htmlFor='email' className='form-label'>
                      <IntlMessages id='common.userName' />
                    </Label>
                    <Input
                      id='username'
                      name='username'
                      className='form-control'
                      placeholder={messages['placeholder.enterUserName']}
                      type='email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      invalid={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <FormFeedback type='invalid'>
                        {formik.errors.username}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className='mb-3'>
                    <div className='float-end'>
                      {/* <Link to='/forgot-password' className='text-muted'>
                        <IntlMessages id='common.forgetPassword' />
                      </Link> */}
                    </div>
                    <Label className='form-label' htmlFor='password-input'>
                      <IntlMessages id='common.password' />
                    </Label>
                    <div className='position-relative auth-pass-inputgroup mb-3'>
                      <Input
                        id='password-input'
                        name='password'
                        value={formik.values.password || ''}
                        type={passwordShow ? 'text' : 'password'}
                        className='form-control pe-5'
                        placeholder={messages['placeholder.enterPassword']}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <FormFeedback type='invalid'>
                          {formik.errors.password}
                        </FormFeedback>
                      ) : null}
                      <button
                        className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                        type='button'
                        id='password-addon'
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        <i className='ri-eye-fill align-middle'></i>
                      </button>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <div className='form-check'>
                      <Input
                        id='auth-remember-check'
                        type='checkbox'
                        className='form-check-input'
                        // Add handling for checkbox state if needed
                      />
                      <Label
                        for='auth-remember-check'
                        className='form-check-label'
                      >
                        <IntlMessages id='common.rememberMe' />
                      </Label>
                    </div>
                  </div>
                  {/* Password input should go here similarly to email */}
                  <div className='mt-4'>
                    <Button
                      type='submit'
                      disabled={formik.isSubmitting}
                      className='btn btn-success w-100 btn btn-success'
                    >
                      <IntlMessages id='common.signIn' />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SigninJwtAuth;
