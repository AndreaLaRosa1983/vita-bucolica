import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
} from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/auth";
import cookie from "../../models/cookie";
import { getUserCookie } from "../../actions/utils";
//popola i dati con quelli dal cookie salvato e modificali inviando il tutto e poi obbligando al rientro
const UserModalForUpdate = (props: {
  user: cookie | undefined;
  openModalPassword:boolean;
  setOpenModalPassword:Dispatch<SetStateAction<boolean>>;
}) => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,})"
  );
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    oldPassword: "",
    _id:"",
  });
  const [errors, setError] = useState({
    password: false,
    confirmPassword: false,
    oldPassword: false,
    _id:false,
  });

  useEffect(() => {
    if (getUserCookie()) {
      let cookie = getUserCookie();
      setFormData({
        password: "",
        confirmPassword: "",
        oldPassword:"",
        _id: cookie.result._id,
      });
    }
  }, [props.user]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setOpenModalPassword(false)
    if (checkFormPw()) {
      dispatch(updateUser(formData,navigate) );
    }
  };

  const checkFormPw = () => {
    var values = formData;
    var checkedErrors = errors;
    var valid = true;

    if (values.password === "") {
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    if (
      values.password !== values.confirmPassword ||
      values.confirmPassword === ""
    ) {
      valid = false;
      checkedErrors.confirmPassword = true;
    } else {
      checkedErrors.confirmPassword = false;
    }

    if (!passwordRegex.test(values.password)) {
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    setError({ ...checkedErrors });
    return valid;
  };
  return (
    <Modal
      onClose={() => props.setOpenModalPassword(false)}
      onOpen={() => props.setOpenModalPassword(true)}
      open={props.openModalPassword}
    >
      <Modal.Header>Modifica il tuo profilo</Modal.Header>
      <Form className="auth-container" onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field
          type="password"
          control={Input}
          error={errors.password}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
          <Form.Field
            type="password"
            control={Input}
            error={errors.confirmPassword}
            placeholder="Conferma password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
      </Form.Group>
      
      <Modal.Actions>
        <Button onClick={() => props.setOpenModalPassword(false)}>Annulla</Button>
        <Button
          color="orange"
          content="Conferma"
          labelPosition="right"
          icon="checkmark"
          type="submit"
        />
      </Modal.Actions>
      </Form>
    </Modal>
  );
};

export default UserModalForUpdate;
