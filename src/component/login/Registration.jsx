import { useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

const Register = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error.message);
        return;
      }
      setErrorMessage("");
      const data = await response.json();
      localStorage.setItem("token", data.idToken);
      navigate('/')
      location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
      <div className="container">
        <h1>Зареєструватись</h1>
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
        Зареєструватись
        </button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <div className="container signin">
        <p>Вже маєте акаунт?</p>
        <Link to="/login">Увійти</Link>
      </div>
    </form>
  );
};

export default Register;
