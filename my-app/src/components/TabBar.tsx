import "./TabBar.css";
import { type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { type ITunesMusic } from "../modules/itunesApi";

interface Props {
  cards: ITunesMusic[];
}

export const TabBar: FC<Props> = ({ cards }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isList = location.pathname === ROUTES.LIST;
  const isDetail = location.pathname.startsWith(ROUTES.DETAIL);

  const goToList = () => navigate(ROUTES.LIST);

  const goToDetail = () => {
    const firstId = cards[0]?.trackId;
    if (firstId) {
      navigate(`${ROUTES.DETAIL}/${firstId}`);
    }
  };

  return (
    <nav className="tabBar">
      <button
        type="button"
        className={`tabBarItem ${isList ? "tabBarItemActive" : ""}`}
        onClick={goToList}
      >
        <img className="tabBarIcon" src="./grid.png" alt="Список" />
      </button>
      <button
        type="button"
        className={`tabBarItem ${isDetail ? "tabBarItemActive" : ""}`}
        onClick={goToDetail}
      >
        <img className="tabBarIcon" src="./home.png" alt="Подробнее" />
      </button>
      <button
        type="button"
        className={`tabBarItem`}
        onClick={() => {}}
      >
        <img className="tabBarIcon" src="./add.png" alt="Добавить" />
      </button>
      <button
        type="button"
        className={`tabBarItem`}
        onClick={() => {}}
      >
        <img className="tabBarIcon" src="./auth.png" alt="Войти" />
      </button>
    </nav>
  );
};