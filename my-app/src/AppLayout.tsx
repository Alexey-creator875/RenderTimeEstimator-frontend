import { type FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { type HandlerRenderServerUnitListItem } from "./api/Api";
import { TabBar } from "./components/TabBar";
import "./MobileApp.css";

export interface AppOutletContext {
  cards: HandlerRenderServerUnitListItem[];
  setCards: (cards: HandlerRenderServerUnitListItem[]) => void;
}

export const AppLayout: FC = () => {
  const [cards, setCards] = useState<HandlerRenderServerUnitListItem[]>([]);

  return (
    <div className="appShell">
      <main className="appContent">
        <Outlet context={{ cards, setCards }} />
      </main>
      <TabBar cards={cards} />
    </div>
  );
};