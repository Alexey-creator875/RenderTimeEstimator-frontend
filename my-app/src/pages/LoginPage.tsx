import "./LoginPage.css";
import { type FC, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROUTES } from "../Routes";
import { setAuthenticatedAction } from "../slices/userSlice";

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/sign-in", { login, password });
      localStorage.setItem("access_token", response.data.access_token);
      dispatch(setAuthenticatedAction(true));
      navigate(ROUTES.LIST);
    } catch (error) {
      console.error("Ошибка аутентификации", error);
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
        </Form.Group>
        <Form.Group controlId="password" className="loginField">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            disabled={loading}
          />
        </Form.Group>
        <Button
          type="button"
          className="loginButton"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Войти"}
        </Button>
      </Form>
    </div>
  );
};
