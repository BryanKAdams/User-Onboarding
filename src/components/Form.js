import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import PeopleCard from "./PeopleCard"
const UserForm = ({ values, errors, touched, status }) => {
    const [people, setPeople] = useState([]);
    useEffect(() => {
        status && setPeople(people => [...people, status]);
    }, [status]);
    return (
        <div className="people-form">
            <Form>
                <label className="nameLabel">
                    Name:
        <Field type="text" name="name" placeholder="name" />
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>
                <label className="emailLabel">
                    Email:
        <Field type="email" autoComplete="email" name="email" placeholder="email" />
                    {errors.name && touched.email && errors.email && <p className="errors">{errors.email}</p>}
                </label>
                <label className="passwordLabel">
                    Password:
        <Field type="password" name="password" autoComplete="new-password" placeholder="password" />
                    {touched.password && errors.password && <p className="errors">{errors.password}</p>}
                </label>

                <label className="checkbox-container">
                    Terms of Service
          <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    {touched.terms && errors.terms  && <p className="errors">{errors.terms}</p>}
                    <span className="checkmark" />
                </label>
                <button type="submit">Submit!</button>
            </Form>
            <PeopleCard people={people} />
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms, }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(8, 'Too short!').max(16, 'Too Long!').required(),
        terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        //values is our object with all our data on it
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;
