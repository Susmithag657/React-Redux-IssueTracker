import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Prompt, useHistory } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { addUser } from "../../actions/ActionCreators";
import toastr from "toastr";

const SignUpForm = ({ addUser }) => {
  const history = useHistory();
  const onSubmit = (values, action) => {
    action.setSubmitting = true;
    console.log("values :" + values);
    addUser(values)
      .then((res) => {
        console.log(res);
        action.setSubmitting = false;
        toastr.success("Registered Successfully!", { timeOut: 5000 });
        action.resetForm();
        history.push("/Home");
      })
      .catch((err) => console.log(err));
  };
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Please provide First Name"),
    lastName: yup.string().required("Please provide First Name"),
    email: yup.string().email("Invalid email").required("Required"),
    // .test("Unique Email", "This email already exists", function(value){
    //     axios.get(`http://localhost:3001/users/?email=${value}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.length > 0) {
    //         return false;
    //       }
    //       return true;
    //     })
    // }),
    mobileNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password should be 8 chars minimum.")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Passord must have one uppercase, one number and one special case character"
      ),
    location: yup.string().required("Required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match")
      })
  });
  return (
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-6">
          <div className="card shadow mt-5 ml-5" style={{ width: "auto" }}>
            <div className="card-body">
              <h1 className="card-title">Sign Up!</h1>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  mobileNumber: "",
                  location: "",
                  password: "",
                  confirmPassword: ""
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isValid, isSubmitting }) => (
                  <Form>
                    <Prompt
                      when={!isValid}
                      message="You have unsaved changes, are you sure you want to leave?"
                    />
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="firstName"
                        id="firstName"
                        placeHolder="First Name"
                        className="form-control"
                      />
                      <label htmlFor="firstName">First Name</label>
                      <span>
                        <ErrorMessage
                          className="alert alert-danger"
                          name="firstName"
                        >
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="lastName"
                        id="lastName"
                        placeHolder="Last Name"
                        className="form-control"
                      />
                      <label htmlFor="lastName">Last Name</label>
                      <span>
                        <ErrorMessage name="lastName">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="email"
                        id="email"
                        placeHolder="User Name"
                        className="form-control"
                      />
                      <label htmlFor="email">Email</label>

                      <span>
                        <ErrorMessage name="email">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeHolder="Mobile Number"
                        className="form-control"
                      />
                      <label htmlFor="mobileNumber">Mobile Number</label>

                      <span>
                        <ErrorMessage name="mobileNumber">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="location"
                        id="location"
                        placeHolder="Location"
                        className="form-control"
                      />
                      <label htmlFor="location">Location</label>

                      <span>
                        <ErrorMessage name="location">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="password"
                        id="password"
                        placeHolder="Password"
                        className="form-control"
                      />
                      <label htmlFor="password">Password</label>

                      <span>
                        <ErrorMessage name="password">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        type="input"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeHolder="Password"
                        className="form-control"
                      />
                      <label htmlFor="confirmPassword">Confirm</label>
                      <span>
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <div className="alert alert-danger">{msg}</div>
                          )}
                        </ErrorMessage>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary rounded"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user))
  };
};
export default connect(null, mapDispatchToProps)(SignUpForm);
