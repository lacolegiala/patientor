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

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const initialValues: EntryFormValues = {
  type: "OccupationalHealthcare",  
  description: "",
  date: "",
  specialist: "",
  employerName: "",
  healthCheckRating: 0,
  sickLeave: {
    startDate: "",
    endDate: ""
  },
  discharge: {
    date: "",
    criteria: ""
  }
};

const AddEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const wrongFormatError = "Formatted wrong";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          else if (!isDate(values.date)) {
            errors.date = wrongFormatError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (values.type === "OccupationalHealthcare" && !values.employerName) {
            errors.employerName = requiredError;
          }
          return errors;
      }}
    >
    {({ isValid, dirty, values, setFieldValue, setFieldTouched, handleSubmit, handleChange }) => {

      return (
        <Form className="form ui" onSubmit={handleSubmit}>
          <div id="type-pick">Pick an entry type</div>
          <div role="group" aria-labelledby="type-pick">
            <label>
              <Field type="radio" name="type" value="OccupationalHealthcare" />
              Occupational healthcare
            </label>
            <label>
              <Field type="radio" name="type" value="HealthCheck" />
              Health check
            </label>
            <label>
              <Field type="radio" name="type" value="Hospital" />
              Hospital
            </label>
          </div>
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
          {values.type === "OccupationalHealthcare" &&
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
              onChange={handleChange}
            />
          }
          {values.type === "Hospital" &&
            <Field
              label="Date of discharge"
              placeholder="YYYY-MM-DD"
              name="dateOfDischarge"
              component={TextField}
              onChange={handleChange}
            />
          }

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