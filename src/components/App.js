import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import './App.css';
import Form from "./Form";
import User from "./User";
import schema from "../validation/formSchema";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  termsOfService: false,
}

const intialFormErrors = {
  name: "",
  email: "",
  password: "",
  role: "",
}

const initialDisabled = true;

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(intialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {
        console.log("something went wrong!", err);
      });
  }

  const postNewUser = newUser => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then(res => {
        console.log(res.data);
        setUsers([res.data, ...users]);
      })
      .catch(err => {
        console.log("something went wrong!", err);
      });
  }

  const changeInput = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role.trim(),
      termsOfService: formValues.termsOfService,
    }
    postNewUser(newUser);
    setFormValues(initialFormValues);
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header><h1>Onboard Users App</h1></header>
      <Form
        values={formValues}
        change={changeInput}
        submit={submitForm}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}

export default App;
