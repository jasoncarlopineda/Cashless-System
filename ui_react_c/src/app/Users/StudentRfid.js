import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Icon, Label } from "semantic-ui-react";
import { history } from "../..";
import agent from "../../agent";
import { ErrorMessage } from "../Commons/ErrorMessage";

export const StudentRfid = () => {
  let { id } = useParams();

  const [formValues, setFormValues] = useState({ rfid: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const loadUser = async (id) => {
    const response = await agent.User.find(id);
    setUser(response);

    if (response.student.rfid) {
      setFormValues({ ...formValues, rfid: response.student.rfid.rfid });
    }
  };

  useEffect(() => {
    loadUser(id);
  }, []);

  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    setLoading(true);
    setFormErrors(null);

    try {
      console.log(user.student.id);
      await agent.Rfid.enroll({
        rfid: formValues.rfid,
        student_id: user.student.id,
      });
      success = true;
    } catch (err) {
      console.log(err);
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
      {user && (
        <Label
          color="yellow"
          size="small"
          style={{ display: "inline-block", marginBottom: "1em" }}
        >
          Student
          <Label.Detail>{user.name}</Label.Detail>
        </Label>
      )}

      {formErrors && <ErrorMessage errors={formErrors} />}
      <Form loading={!user || loading} onSubmit={onFormSubmit}>
        <Form.Input
          width={16}
          name="rfid"
          label="RFID"
          placeholder="RFID"
          value={formValues.rfid}
          onChange={handleInput}
          readOnly={user && user.student.rfid}
        />
        <Button
          disabled={user && user.student.rfid}
          icon
          labelPosition="left"
          type="submit"
          primary
          size="small"
        >
          <Icon name="save" />
          Save
        </Button>
      </Form>
    </>
  );
};
