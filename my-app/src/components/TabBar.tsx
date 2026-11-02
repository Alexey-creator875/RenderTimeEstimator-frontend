import "./TabBar.css";
import { type FC } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../Routes";
import { type RenderServerUnit } from "../modules/renderServerUnitsApi";

interface Props {
  cards: RenderServerUnit[];
}

export const TabBar: FC<Props> = ({ cards }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isList = location.pathname === ROUTES.LIST;
  const isDetail = location.pathname.startsWith(ROUTES.DETAIL);

  const goToList = () => navigate(ROUTES.LIST);

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
        <Nav.Link disabled>
          <img className="tabBarIcon" src="/add.png" alt="Добавление" />
        </Nav.Link>
        <Nav.Link active={isList} onClick={goToList}>
          <img className="tabBarIcon" src="/grid.png" alt="Плитка" />
        </Nav.Link>
        <Nav.Link disabled>
          <img className="tabBarIcon" src="/auth.png" alt="Вход" />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};