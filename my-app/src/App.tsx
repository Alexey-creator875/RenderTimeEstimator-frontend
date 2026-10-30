import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailPage } from "./pages/DetailPage";
import ITunesPage from "./pages/ITunesPage";
import { ROUTES } from "./Routes";
import { AppLayout } from "./AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.LIST} element={<ITunesPage />} />
          <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;