import { type FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { type ITunesMusic } from "./modules/itunesApi";
import { TabBar } from "./components/TabBar";
import "./MobileApp.css";

export interface AppOutletContext {
  cards: ITunesMusic[];
  setCards: (cards: ITunesMusic[]) => void;
}

export const AppLayout: FC = () => {
  const [cards, setCards] = useState<ITunesMusic[]>([]);

  return (
    <div className="appShell">
      <main className="appContent">
        <Outlet context={{ cards, setCards }} />
      </main>
      <TabBar cards={cards} />
    </div>
  );
};