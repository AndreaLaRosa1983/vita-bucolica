import React, { useState } from "react";
import { Form, Input, Image, Button, Icon, Label } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";
import {
  AGRIMACHINERY,
  GROWING,
  BREEDING,
  FARMLIFE,
} from "../../constants/tags";
const Auth = () => {
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])(?=.{8,})"
  );
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    tags: [],
    isCreator: false,
  });
  const [errors, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    tags: false,
    isCreator: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (checkFormSignUp()) {
        dispatch(signup(formData, navigate));
      }
    } else {
      if (checkFormSignIn()) {
        dispatch(signin(formData, navigate));
      }
    }
  };

  const checkFormSignIn = () => {
    var values = formData;
    var checkedErrors = errors;
    var valid = true;
    if (values.email === "") {
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
    if (values.password === "") {
      valid = false;
      checkedErrors.password = true;
    } else {
      checkedErrors.password = false;
    }
    setError({ ...checkedErrors });
    return valid;
  };
  const changeTags = (e, value) => {
    var newTags = formData.tags;
    if (e.target.checked) {
      newTags.push(value);
      setFormData({ ...formData, tags: newTags });
    } else {
      newTags = newTags.filter((e) => e !== value);
      setFormData({ ...formData, tags: newTags });
    }
  };

  const isCreator = () => {
    setFormData({ ...formData, isCreator: !formData.isCreator });
  };

  const checkFormSignUp = () => {
    var values = formData;
    var checkedErrors = errors;
    var valid = true;

    if (values.firstName === "") {
      valid = false;
      checkedErrors.firstName = true;
    } else {
      checkedErrors.firstName = false;
    }
    if (values.lastName === "") {
      valid = false;
      checkedErrors.lastName = true;
    } else {
      checkedErrors.lastName = false;
    }
    if (values.email === "") {
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
    if (!emailRegex.test(values.email)) {
      valid = false;
      checkedErrors.email = true;
    } else {
      checkedErrors.email = false;
    }
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
    if (values.tags.length <= 0) {
      valid = false;
      checkedErrors.tags = true;
    } else {
      checkedErrors.tags = false;
    }
    if (values.isCreator !== true && values.isCreator !== false) {
      valid = false;
      checkedErrors.isCreator = true;
    } else {
      checkedErrors.isCreator = false;
    }
    setError({ ...checkedErrors });
    return valid;
  };

  const switchMode = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      tags: [],
      isCreator: false,
    });
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  return (
    <Form className="auth-container" onSubmit={handleSubmit}>
      <div className="title-icon">
        <Image>
          <Icon name="lock" />
        </Image>
        {isSignup ? "Iscriviti" : "Accedi"}
      </div>

      {isSignup && (
        <Form.Group widths="equal">
          <Form.Field
            error={errors.firstName}
            control={Input}
            placeholder="Nome"
            name="firstName"
            value={FormData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <Form.Field
            control={Input}
            error={errors.lastName}
            placeholder="Cognome"
            name="lastName"
            value={FormData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Form.Group>
      )}
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          error={errors.email}
          placeholder="e-mail"
          name="email"
          value={FormData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          type="password"
          control={Input}
          error={errors.password}
          placeholder="Password"
          name="password"
          value={FormData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {isSignup && (
          <Form.Field
            type="password"
            control={Input}
            error={errors.confirmPassword}
            placeholder="Conferma password"
            name="confirmPassword"
            value={FormData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        )}
      </Form.Group>
      {isSignup && (
        <>
          <Form.Group grouped className="checkbox-group">
            <Form.Field
              error={errors.isCreator}
              control="input"
              type="checkbox"
              onChange={() => isCreator()}
              label={"sei un creatore di articoli?"}
              checked={formData.isCreator}
            />
          </Form.Group>
        </>
      )}
      {isSignup && (
        <>
          <Form.Group grouped className="checkbox-group">
            <div>Scegli i tuoi argomenti di interesse</div>
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e) => changeTags(e, FARMLIFE)}
              label={FARMLIFE}
              checked={formData.tags.includes(FARMLIFE)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e) => changeTags(e, GROWING)}
              label={GROWING}
              checked={formData.tags.includes(GROWING)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e) => changeTags(e, BREEDING)}
              label={BREEDING}
              checked={formData.tags.includes(BREEDING)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e) => changeTags(e, AGRIMACHINERY)}
              label={AGRIMACHINERY}
              checked={formData.tags.includes(AGRIMACHINERY)}
            />
          </Form.Group>
          {errors.tags ? (
            <Label pointing="above" className="error-tips">
              Seleziona Almeno uno dei Tags
            </Label>
          ) : null}
        </>
      )}
      <Form.Group>
        <Form.Field control={Button} type="submit">
          {isSignup ? "Iscriviti" : "Accedi"}
        </Form.Field>

        <Form.Field className="have-account" onClick={switchMode}>
          {isSignup
            ? "Hai già un account? Accedi"
            : "Non hai un account? Iscriviti"}
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

export default Auth;
