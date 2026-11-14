import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailPage } from "./pages/DetailPage";
import RenderServerUnitPage from "./pages/RenderServerUnitsPage";
import { ROUTES } from "./Routes";
import { AppLayout } from "./AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { AddPage } from "./pages/AddPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.LIST} element={<RenderServerUnitPage />} />
          <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.ADD} element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;