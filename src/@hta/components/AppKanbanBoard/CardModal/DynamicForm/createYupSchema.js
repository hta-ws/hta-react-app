import * as yup from 'yup';

export function createYupSchema(schema, config) {
  const { name, validationType, validations = [] } = config;

  if (!yup[validationType]) {
    return schema;
  }

  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type] || !params) {
      return;
    }
    validator = validator[type](...params);
  });

  schema[name] = validator;
  return schema;
}

export function createNestedYupSchema(fields) {
  if (!Array.isArray(fields)) {
    console.error('Fields should be an array:', fields);
    return {};
  }

  return fields.reduce((acc, field) => {
    const {
      name,
      validationType,
      validations = [],
      fields: nestedFields,
    } = field;

    if (nestedFields) {
      const nestedSchema = createNestedYupSchema(nestedFields);
      acc[name] = yup.object().shape(nestedSchema);
    } else {
      createYupSchema(acc, {
        name,
        validationType,
        validations,
      });
    }

    return acc;
  }, {});
}

export function createRootYupSchema(schemaConfig) {
  const schema = {};

  for (const key in schemaConfig) {
    if (schemaConfig.hasOwnProperty(key)) {
      const fields = schemaConfig[key].fields;
      schema[key] = yup.object().shape(createNestedYupSchema(fields));
    }
  }

  return yup.object().shape(schema);
}
