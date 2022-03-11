import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Form,
  Input,
  Image,
  Button,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/auth";

import {
  AGRIMACHINERY,
  GROWING,
  BREEDING,
  FARMLIFE,
} from "../../constants/tags";
import cookie from "../../models/cookie";
import { getUserCookie } from "../../actions/utils";
//popola i dati con quelli dal cookie salvato e modificali inviando il tutto e poi obbligando al rientro
const UserModalForUpdate = (props: {
  user: cookie | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenModalPassword:Dispatch<SetStateAction<boolean>>
}) => {

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tags: [""],
    isCreator: false,
    _id:""
  });
  const [errors, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    tags: false,
    isCreator: false,
  });

  const setOpenPasswordAndCloseThis = () => {
    props.setOpenModal(false);
    props.setOpenModalPassword(true);
  }


  useEffect(() => {
    if (getUserCookie()) {
      let cookie = getUserCookie();
      setFormData({
        firstName: cookie.result.firstName,
        lastName: cookie.result.lastName,
        email: cookie.result.email,
        tags: cookie.result.tags,
        isCreator: cookie.result.isCreator,
        _id: cookie.result._id
      });
    }
  }, [props.user]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setOpenModal(false)
    if (checkFormChangeData()) {
      dispatch(updateUser(formData,navigate) );
    }
  };
  const changeTags = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    var newTags = formData.tags;
    if (e.target.checked) {
      newTags.push(value);
      setFormData({ ...formData, tags: newTags });
    } else {
      newTags = newTags.filter((e: string) => e !== value);
      setFormData({ ...formData, tags: newTags });
    }
  };

  const isCreator = () => {
    setFormData({ ...formData, isCreator: !formData.isCreator });
  };

  const checkFormChangeData = () => {
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
  return (
    <Modal
      onClose={() => props.setOpenModal(false)}
      onOpen={() => props.setOpenModal(true)}
      open={props.openModal}
    >
      <Modal.Header>Modifica il tuo profilo</Modal.Header>
      <Form className="auth-container" onSubmit={handleSubmit}>
        <div className="title-icon">
          <Image>
            <Icon name="lock" />
          </Image>
          Modifica
        </div>
        <Form.Group widths="equal">
          <Form.Field
            error={errors.firstName}
            control={Input}
            placeholder="Nome"
            name="firstName"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <Form.Field
            control={Input}
            error={errors.lastName}
            placeholder="Cognome"
            name="lastName"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            error={errors.email}
            placeholder="e-mail"
            name="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Group>
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
        <>
          <div className="checkbox-group-modal-title">
            Scegli i tuoi argomenti di interesse
          </div>
          <Form.Group grouped className="checkbox-group">
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTags(e, FARMLIFE)
              }
              label={FARMLIFE}
              checked={formData.tags.includes(FARMLIFE)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTags(e, GROWING)
              }
              label={GROWING}
              checked={formData.tags.includes(GROWING)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTags(e, BREEDING)
              }
              label={BREEDING}
              checked={formData.tags.includes(BREEDING)}
            />
            <Form.Field
              error={errors.tags}
              control="input"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                changeTags(e, AGRIMACHINERY)
              }
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
      
      <Modal.Actions>
      <Button onClick={() => setOpenPasswordAndCloseThis()}>vuoi modificare la tua password?</Button>
        <Button onClick={() => props.setOpenModal(false)}>Annulla</Button>
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
