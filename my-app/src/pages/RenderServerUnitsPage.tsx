import "./RenderServerUnitsPage.css";
import { type FC, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { RamFilter } from "../components/RamFilter";
import { ROUTES } from "../Routes";
import { RenderServerUnitCard } from "../components/RenderServerUnitCard";
import { type AppOutletContext } from "../AppLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  MIN_RAM,
  MAX_RAM,
  setMinValueAction,
  setMaxValueAction,
  getRenderServerUnits,
  deleteRenderServerUnit,
} from "../slices/renderServerUnitsSlice";
import { type AppDispatch } from "../store";

const RenderServerUnitsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { minValue, maxValue, items, loading, error } = useSelector(
    (s: any) => s.renderServerUnits
  );

  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  // при открытии страницы загружаем список с учётом сохранённого фильтра
  useEffect(() => {
    dispatch(getRenderServerUnits());
  }, [dispatch]);

  // список для навбара (кнопка «Лента» открывает первую карточку)
  useEffect(() => {
    setCards(items);
  }, [items, setCards]);

  const handleSearch = () => {
    dispatch(getRenderServerUnits());
  };

  const handleDelete = (renderServerUnitId?: number) => {
    if (renderServerUnitId !== undefined) {
      dispatch(deleteRenderServerUnit(renderServerUnitId));
    }
  };

  const handleCardClick = (renderServerUnitId?: number) => {
    if (renderServerUnitId !== undefined) {
      navigate(`${ROUTES.DETAIL}/${renderServerUnitId}`);
    }
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
        disabled={loading}
      />

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div>
          <h1>{error}</h1>
        </div>
      ) : !items.length ? (
        <div>
          <h1>Ничего не найдено</h1>
        </div>
      ) : (
        <Row xs={2} className="g-3">
          {items.map((item: any) => (
            <Col key={item.id}>
              <RenderServerUnitCard
                onClick={() => handleCardClick(item.id)}
                onDelete={() => handleDelete(item.id)}
                {...item}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default RenderServerUnitsPage;
