import "./TabBar.css";
import { type FC } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";
import { type RenderServerUnit } from "../modules/renderServerUnitsApi";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { setAuthenticatedAction } from "../slices/userSlice"

interface Props {
  cards: RenderServerUnit[];
}

export const TabBar: FC<Props> = ({ cards }) => {
  const isAuth = useSelector((s: any) => s.user.isAuthenticated)
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const location = useLocation();

  const isList = location.pathname === ROUTES.LIST;
  const isDetail = location.pathname.startsWith(ROUTES.DETAIL);
  const isAdd = location.pathname === ROUTES.ADD;
  const isLogin = location.pathname === ROUTES.LOGIN;

  const goToList = () => navigate(ROUTES.LIST);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/sign-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Ошибка выхода", error);
    } finally {
      // локально выходим в любом случае, даже если запрос не прошёл
      localStorage.removeItem("access_token");
      dispatch(setAuthenticatedAction(false));
      navigate(ROUTES.LOGIN);
    }
  };

  const goToDetail = () => {
    const firstId = cards[0]?.id;
    if (firstId) {
      navigate(`${ROUTES.DETAIL}/${firstId}`);
    }
  };

  return (
    <Navbar fixed="bottom" className="tabBar">
      <Nav className="tabBarNav">
        <Nav.Link active={isDetail} onClick={goToDetail}>
          <img className="tabBarIcon" src="/home.png" alt="Лента" />
        </Nav.Link>
        <Nav.Link active={isAdd} disabled={!isAuth} onClick={() => navigate(ROUTES.ADD)}>
          <img className="tabBarIcon" src="/add.png" alt="Добавление" />
        </Nav.Link>
        <Nav.Link active={isList} onClick={goToList}>
          <img className="tabBarIcon" src="/grid.png" alt="Плитка" />
        </Nav.Link>
        {isAuth ? (
          <Nav.Link onClick={handleLogout}>
            <img className="tabBarIcon" src="/logout.png" alt="Выход" />
          </Nav.Link>
        ) : (
          <Nav.Link active={isLogin} onClick={() => navigate(ROUTES.LOGIN)}>
            <img className="tabBarIcon" src="/auth.png" alt="Вход" />
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};