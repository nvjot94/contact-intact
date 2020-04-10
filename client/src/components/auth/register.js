import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
export const Register = props => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "user already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    if (name === "" || password === "" || email === "" || password2 === "") {
      setAlert("please enter all details", "danger");
    } else if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };
  const { name, email, password, password2 } = user;
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block"></input>
      </form>
    </div>
  );
};

export default Register;
