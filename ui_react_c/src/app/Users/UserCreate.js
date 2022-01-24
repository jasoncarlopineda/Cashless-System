import React, { useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import agent from "../../agent";

import { history } from "../../index";
import { ErrorMessage } from "../Commons/ErrorMessage";

export const UserCreate = () => {
  const [formValues, setFormValues] = useState({
    role: "student",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    student_id: "",
  });

  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState(null);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    setLoading(true);
    setFormErrors(null);
    try {
      await agent.Student.create({ ...formValues });
      success = true;
    } catch (err) {
      setFormErrors(err.data.errors);
    } finally {
      setLoading(false);
      if (success) {
        history.push("/users");
      }
    }
  };

  return (
    <>
      {formErrors && <ErrorMessage errors={formErrors} />}
      <Form onSubmit={onFormSubmit} loading={loading}>
        <Form.Select
          label="Role"
          options={[{ key: 0, value: "student", text: "Student" }]}
          onChange={handleInputChange}
          value={formValues.role}
        />
         <Form.Input
            name="student_id"
            label="Student ID"
            placeholder="Student ID"
            width={16}
            onChange={handleInputChange}
            value={formValues.student_id}
          />
        <Form.Group>
          <Form.Input
            name="first_name"
            label="First name"
            placeholder="First Name"
            width={8}
            onChange={handleInputChange}
            value={formValues.first_name}
          />
          <Form.Input
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            width={8}
            onChange={handleInputChange}
            value={formValues.last_name}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            name="email"
            label="Email"
            placeholder="Email"
            width={8}
            onChange={handleInputChange}
            value={formValues.email}
          />
          <Form.Input
            name="phone_number"
            label="Phone Number"
            placeholder="Phone Number"
            width={8}
            onChange={handleInputChange}
            value={formValues.phone_number}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            name="password"
            label="Password"
            placeholder="Password"
            width={8}
            type="password"
            onChange={handleInputChange}
            value={formValues.password}
          />
          <Form.Input
            name="password_confirmation"
            label="Confirm Password"
            placeholder="Confirm Password"
            width={8}
            type="password"
            onChange={handleInputChange}
            value={formValues.password_confirmation}
          />
        </Form.Group>

        <Button type="submit" size="small" primary icon labelPosition="left">
          Save
          <Icon name="user plus" />
        </Button>
      </Form>
    </>
  );
};
