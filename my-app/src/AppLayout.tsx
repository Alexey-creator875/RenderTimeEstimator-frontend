import { type FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { type RenderServerUnit } from "./modules/renderServerUnitsApi";
import { TabBar } from "./components/TabBar";
import "./MobileApp.css";

export interface AppOutletContext {
  cards: RenderServerUnit[];
  setCards: (cards: RenderServerUnit[]) => void;
}

export const AppLayout: FC = () => {
  const [cards, setCards] = useState<RenderServerUnit[]>([]);

  return (
    <div className="appShell">
      <main className="appContent">
        <Outlet context={{ cards, setCards }} />
      </main>
      <TabBar cards={cards} />
    </div>
  );
};