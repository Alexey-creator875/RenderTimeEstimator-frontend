import "./RenderServerUnitsPage.css";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { getRenderServerUnitsByRam } from "../modules/renderServerUnitsApi";
import { RamFilter } from "../components/RamFilter";
import { ROUTES } from "../Routes";
import { RenderServerUnitCard } from "../components/RenderServerUnitCard";
import { type AppOutletContext } from "../AppLayout";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";

const MIN_RAM = 8
const MAX_RAM = 128

const RenderServerUnitsPage: FC = () => {
  const [minValue, setMinValue] = useState(MIN_RAM);
  const [maxValue, setMaxValue] = useState(MAX_RAM);

  const [renderServerUnits, setRenderServerUnits] = useState(RENDER_SERVER_UNITS_MOCK.renderServerUnits);
  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    setCards(RENDER_SERVER_UNITS_MOCK.renderServerUnits);
  }, [setCards]);

  const applyMock = () => {
    const results = RENDER_SERVER_UNITS_MOCK.renderServerUnits.filter((item) =>
      item.ram >= minValue && item.ram <= maxValue
    );

    setRenderServerUnits(results);
    setCards(results);
  };

  const handleSearch = () => {
    applyMock();
  };

  const handleCardClick = (renderServerUnitId: number) => {
    navigate(`${ROUTES.DETAIL}/${renderServerUnitId}`);
  };

  return (
    <div className="container">
      <RamFilter
        min={MIN_RAM}
        minValue={minValue}
        setMinValue={setMinValue}

        max={MAX_RAM}
        maxValue={maxValue}
        setMaxValue={setMaxValue}

        onApply={handleSearch}
      />

      {!renderServerUnits.length ? (
          <div>
            <h1>Ничего не найдено</h1>
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
        )
      }
    </div>
  );
};

export default RenderServerUnitsPage;