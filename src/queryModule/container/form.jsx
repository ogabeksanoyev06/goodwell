import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { isArray } from "lodash";
import usePost from "queryHooks/usePost";
import React from "react";
import * as Yup from "yup";
const FormContent = ({
  url,
  method,
  name,
  onSuccess = () => {},
  onError = () => {},
  children,
  fields = [],
  params,
  // queryOptions,
}) => {
  const queryClient = useQueryClient();
  const mutatePost = usePost();

  return (
    <div>
      <Formik
        initialValues={
          isArray(fields)
            ? fields.reduce(
                (prev, curr) => ({
                  ...prev,
                  [curr.name]: curr.value ? curr.value : "",
                }),
                {}
              )
            : {}
        }
        enableReinitialize={true}
        validationSchema={() => {
          if (!isArray(fields)) {
            return Yup.object().shape({});
          }

          let validationFields = {};

          fields.forEach(field => {
            let validationField;

            switch (field.type) {
              case "string":
                validationField = Yup.string().typeError("Должна быть строка");
                break;
              case "object":
                validationField = Yup.object();
                break;
              case "number":
                validationField = Yup.number().typeError("Должен быть числом");
                break;
              case "array":
                validationField = Yup.array().typeError("Должен быть массивом");
                break;
              case "boolean":
                validationField = Yup.boolean().typeError(
                  "Должен быть булевым"
                );
                break;
              case "date":
                validationField = Yup.date().typeError("Должен быть датой");
                break;
              default:
                validationField = Yup.string();
            }

            if (field.required) {
              validationField = validationField.required("Требуется ввод");
            }

            if (field.min) {
              validationField = validationField.min(
                field.min,
                "Слишком короткий!"
              );
            }

            if (field.max) {
              validationField = validationField.max(
                field.max,
                "Слишком длинный!"
              );
            }

            validationField = validationField.nullable();

            validationFields[field.name] = validationField;
          });

          return Yup.object().shape(validationFields);
        }}
        onSubmit={(values, { resetForm }) => {
          values = { ...values };
          fields.forEach(field => {
            if (field.hasOwnProperty("onSubmitValue")) {
              if (typeof field.onSubmitValue === "function") {
                if (field.hasOwnProperty("onSubmitKey")) {
                  values[field.onSubmitKey] = field.onSubmitValue(
                    values[field.name],
                    values
                  );
                  delete values[field.name];
                } else {
                  values[field.name] = field.onSubmitValue(
                    values[field.name],
                    values
                  );
                }
              }
            }
            if (field.hasOwnProperty("disabled")) {
              if (field.disabled) {
                delete values[field.name];
              }
            }
          });
          mutatePost.mutate(
            {
              url,
              method,
              data: values,
              params,
            },
            {
              onSuccess: data => {
                onSuccess(data.data, resetForm, queryClient);
                if (name) {
                  queryClient.invalidateQueries({ queryKey: [`${name}`] });
                }
              },
              onError: err => {
                onError(err.response);
              },
            }
          );
        }}
      >
        {props => {
          return (
            <Form onSubmit={props.handleSubmit}>
              {children({ ...props, ...mutatePost })}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormContent;
