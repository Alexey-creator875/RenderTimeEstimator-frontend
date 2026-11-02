import "./ITunesPage.css";
import { type FC, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getRenderServerUnitsByRam } from "../modules/renderServerUnitsApi";
import { InputField } from "../components/InputField";
import { ROUTES } from "../Routes";
import { RenderServerUnitCard } from "../components/RenderServerUnitCard";
import { type AppOutletContext } from "../AppLayout";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";

const RenderServerUnitsPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [renderServerUnits, setRenderServerUnits] = useState(RENDER_SERVER_UNITS_MOCK.renderServerUnits);
  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    setCards(RENDER_SERVER_UNITS_MOCK.renderServerUnits);
  }, [setCards]);

  const applyMock = () => {
    const results = RENDER_SERVER_UNITS_MOCK.renderServerUnits.filter((item) =>
      item.ram.toString().startsWith(searchValue)
    );
    const list = results.length ? results : RENDER_SERVER_UNITS_MOCK.renderServerUnits;
    setRenderServerUnits(list);
    setCards(list);
    setLoading(false);
  };

  const handleSearch = () => {
    setLoading(true);
    getRenderServerUnitsByRam(8)
      .then((response) => {
        // const results = response.results.filter(
        //   (item) => item.status === "published"
        // );
        const results = response.renderServerUnits
        if (results.length) {
          setRenderServerUnits(results);
          setCards(results);
          setLoading(false);
          return;
        }
        applyMock();
      })
      .catch((error) => {
        console.error(error);
        applyMock();
      });
  };

  const handleCardClick = (renderServerUnitId: number) => {
    navigate(`${ROUTES.DETAIL}/${renderServerUnitId}`);
  };

  return (
    <div className="container">
      <InputField
        value={searchValue}
        setValue={(value) => setSearchValue(value)}
        loading={loading}
        onSubmit={handleSearch}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!renderServerUnits.length ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <div className="cardsList">
            {renderServerUnits.map((item) => (
              <RenderServerUnitCard
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                {...item}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default RenderServerUnitsPage;