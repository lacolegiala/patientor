import { Field, Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, NumberField, TextField } from "./FormField";

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
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
  sickLeaveStart: "",
  sickLeaveEnd: "",
  dischargeDate: "",
  dischargeCriteria: ""
};

const AddEntryForm: React.FC<EntryProps> = ({ onSubmit }) => {
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
          if (values.type === "Hospital") {
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            }
            else if (!isDate(values.dischargeDate)) {
              errors.dischargeDate = wrongFormatError;
            }
            if (!values.dischargeCriteria) {
              errors.dischargeCriteria = requiredError;
            }
          }
          if (values.type === "HealthCheck") {
            if (!values.healthCheckRating && values.healthCheckRating !== 0) {
              errors.healthCheckRating = requiredError;
            }
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
            <div>
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
                onChange={handleChange}
              />
              <Field
                label="Sick leave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveStart"
                component={TextField}
                onChange={handleChange}
              />
              <Field
                label="Sick leave end date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveEnd"
                component={TextField}
                onChange={handleChange}
              />
            </div>
          }
          {values.type === "Hospital" &&
            <div>
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
                onChange={handleChange}
              />
              <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="dischargeCriteria"
                component={TextField}
                onChange={handleChange}
              />
            </div>
          }
          {values.type === "HealthCheck" &&
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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