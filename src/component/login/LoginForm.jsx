import { useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

import "./LoginForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
      setErrorMessage("");

      navigate('/')
      location.reload();
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h1>Увійти в акаунт</h1>
        <p>Форма для введення даних</p>
        <label htmlFor="email">
          <b>E-скринька</b>
        </label>
        <input
          type="email"
          value={email}
          placeholder="Введіть адресу е-скриньки"
          id="email"
          onChange={handleEmailChange}
        />
        <label htmlFor="psw">
          <b>Пароль</b>
        </label>
        <input
          type="password"
          value={password}
          placeholder="Введіть адресу пароль"
          id="psw"
          onChange={handlePasswordChange}
        />
        <button type="submit" className="registerbtn">
          Увійти в акаунт
        </button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="container signin">
        <p>Ще не маєте акаунт?</p>
        <Link to="/registration">Зареєструватись</Link>
      </div>
    </form>
  );
};

export default Login;
