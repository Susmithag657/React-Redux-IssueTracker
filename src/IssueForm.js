import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Descrition is required"),
  status: Yup.string(),
  severity: Yup.string()
});
//const intialValues
export default class IssueForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = function (values, { actions }) {
    //actions.setSubmitting=false;
    console.log(values);
  };
  render() {
    return (
      <>
        <Formik
          intialValues={
            (intialValues = {
              description: "",
              severity: "",
              status: ""
            })
          }
          validationSchema={validationSchema}
        >
          <Form>
            <label htmlFor="description">Description:</label>
            <Field type="input" name="description" id="description" />
            <ErrorMessage name="description" />
            <br />
            <label htmlFor="status">Status:</label>
            <Field name="status" as="select">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="InProgress">InProgress</option>
            </Field>
            <br />
            <button type="submit">Save</button>
          </Form>
        </Formik>
      </>
    );
  }
}
