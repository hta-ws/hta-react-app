import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import DynamicField from '../components/DynamicField';
import { createRootYupSchema } from './createYupSchema'; // Adjust the import path accordingly

const DynamicForm = ({
  formSchema,
  initialValues,
  onSubmit,
  onTypeChange,
  validationSchema,
}) => {
  const [formStructure, setFormStructure] = useState(formSchema);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);

  useEffect(() => {
    setFormStructure(formSchema);
    setFormInitialValues(initialValues);
  }, [formSchema, initialValues]);

  useEffect(() => {
    console.log('Validation Schema:', validationSchema);
  }, [validationSchema]);

  // const validationYupSchema = createRootYupSchema(validationSchema);

  const createYupSchema = (schema) => {
    const shape = {};
    Object.keys(schema).forEach((key) => {
      if (schema[key].type === 'object' && schema[key].fields) {
        shape[key] = Yup.object().shape(createYupSchema(schema[key].fields));
      } else {
        let validator = Yup[schema[key].type];
        if (typeof validator !== 'function') {
          console.error(
            `Yup validation type ${schema[key].type} is not a function`,
          );
          return;
        }
        validator = validator();
        if (Array.isArray(schema[key].validations)) {
          schema[key].validations.forEach((validation) => {
            if (typeof validator[validation.type] !== 'function') {
              console.error(
                `Yup validation method ${validation.type} is not a function on type ${schema[key].type}`,
              );
              return;
            }
            validator = validator[validation.type](...validation.params);
          });
        }
        shape[key] = validator;
      }
    });
    return shape;
  };

  const validationYupSchema = createYupSchema(validationSchema);
  console.log('validationYupSchema', validationYupSchema);

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      validationSchema={validationYupSchema}
      onSubmit={(values, { setSubmitting }) => {
        const submitValues = {
          ...values,
          properties: values.properties,
        };
        onSubmit(submitValues);
        setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form id='dynamic-form' onSubmit={formikProps.handleSubmit}>
          {formStructure.layout?.cards.map((card, cardIndex) => (
            <Card key={cardIndex} className='mb-4'>
              <CardBody>
                <CardTitle>{card.title}</CardTitle>
                {card.fields.map((row, rowIndex) => (
                  <Row key={rowIndex} className='mb-3'>
                    {row.map((field, fieldIndex) => (
                      <Col key={fieldIndex} md={Math.floor(12 / row.length)}>
                        <DynamicField field={field} formikProps={formikProps} />
                      </Col>
                    ))}
                  </Row>
                ))}
              </CardBody>
            </Card>
          ))}
          <div className='d-flex justify-content-end'>
            <Button
              type='button'
              color='secondary'
              className='mr-2'
              onClick={() => {
                formikProps.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
