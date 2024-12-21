import React from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[0-9]+$/, "Invalid format")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    id: "",
    name: "",
    phone: "",
  };
  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      phone: values.phone,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };
  return (
    <div className={s.forma}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
        initialValues={initialValues}
      >
        <Form>
          <label className={s.label}>
            <span>Name</span>
            <Field
              className={s.input}
              type="text"
              name="name"
              placeholder="name"
            />
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
          <label className={s.label}>
            <span>Phone</span>
            <Field
              className={s.input}
              type="text"
              name="phone"
              placeholder="phone"
            />
            <ErrorMessage name="phone" component="span" className={s.error} />
          </label>
          <button className={s.button} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
