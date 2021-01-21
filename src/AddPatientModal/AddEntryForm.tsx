import { Field, Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, TextField } from "./FormField";

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched, handleSubmit, handleChange }) => {

      return (
        <Form className="form ui" onSubmit={handleSubmit}>
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
            onChange={handleChange}
          />
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
            onChange={handleChange}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
            onChange={handleChange}
          />
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
            onChange={handleChange}
          />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    

          <Button
            type="submit"
            color="green"
            disabled={!dirty || !isValid}
          >Submit</Button>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;