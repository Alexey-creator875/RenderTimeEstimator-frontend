import "./LoginPage.css";
import { type FC, useState } from "react";
import { Button, Form } from "react-bootstrap";

export const LoginPage: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: axios-запрос на бэкенд
  };

  return (
    <div className="loginPage">
      <h2 className="loginTitle">Вход</h2>
      <Form>
        <Form.Group controlId="login" className="loginField">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </Form.Group>
        <Form.Group controlId="password" className="loginField">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Button type="button" className="loginButton" onClick={handleLogin}>
          Войти
        </Button>
      </Form>
    </div>
  );
};
