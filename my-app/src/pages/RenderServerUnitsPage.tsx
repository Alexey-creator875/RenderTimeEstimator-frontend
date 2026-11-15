import "./RenderServerUnitsPage.css";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
// import { getRenderServerUnitsByRam } from "../modules/renderServerUnitsApi";
import { RamFilter } from "../components/RamFilter";
import { ROUTES } from "../Routes";
import { RenderServerUnitCard } from "../components/RenderServerUnitCard";
import { type AppOutletContext } from "../AppLayout";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";
import { useDispatch, useSelector } from "react-redux";
import {
  MIN_RAM,
  MAX_RAM,
  setMinValueAction,
  setMaxValueAction,
} from "../slices/renderServerUnitsSlice";

const filterMock = (minValue: number, maxValue: number) =>
  RENDER_SERVER_UNITS_MOCK.renderServerUnits.filter((item) =>
    item.ram >= minValue && item.ram <= maxValue
  );

const RenderServerUnitsPage: FC = () => {
  const dispatch = useDispatch();
  const minValue = useSelector((s: any) => s.renderServerUnits.minValue);
  const maxValue = useSelector((s: any) => s.renderServerUnits.maxValue);

  // список строится по фильтру из store, чтобы при возврате на страницу он совпадал со слайдерами
  const [renderServerUnits, setRenderServerUnits] = useState(() => filterMock(minValue, maxValue));
  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    setCards(renderServerUnits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCards]);

  const applyMock = () => {
    const results = filterMock(minValue, maxValue);

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
    <Container className="unitsPage">
      <RamFilter
        min={MIN_RAM}
        minValue={minValue}
        setMinValue={(value) => dispatch(setMinValueAction(value))}

        max={MAX_RAM}
        maxValue={maxValue}
        setMaxValue={(value) => dispatch(setMaxValueAction(value))}

        onApply={handleSearch}
      />

      {!renderServerUnits.length ? (
          <div>
            <h1>Ничего не найдено</h1>
          </div>
        ) : (
          <Row xs={2} className="g-3">
            {renderServerUnits.map((item) => (
              <Col key={item.id}>
                <RenderServerUnitCard
                  onClick={() => handleCardClick(item.id)}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        )
      }
    </Container>
  );
};

export default RenderServerUnitsPage;