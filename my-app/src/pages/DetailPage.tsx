import "./DetailPage.css";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { type RenderServerUnit, getRenderServerUnitById } from "../modules/renderServerUnitsApi";
import { ROUTES } from "../Routes";
import { type AppOutletContext } from "../AppLayout";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";

const defaultImage = "/DefaultImage.png";

export const DetailPage: FC = () => {
  const [pageData, setPageData] = useState<RenderServerUnit>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cards } = useOutletContext<AppOutletContext>();

  useEffect(() => {
    if (!id) return;

    const fromList = cards.find((item) => String(item.id) === id);
    if (fromList) {
      setPageData(fromList);
      return;
    }

    getRenderServerUnitById(id)
      .then((response) => {
        const data = response.renderServerUnits[0];
        setPageData(
          data ??
            RENDER_SERVER_UNITS_MOCK.renderServerUnits.find((renderServerUnit) => String(renderServerUnit.id) === id)
        );
      })
      .catch(() =>
        setPageData(
          RENDER_SERVER_UNITS_MOCK.renderServerUnits.find((renderServerUnit) => String(renderServerUnit.id) === id)
        )
      );
  }, [id, cards]);

  const handleNext = () => {
    if (!id || !cards.length) return;
    const currentIndex = cards.findIndex(
      (item) => String(item.id) === id
    );
    const nextItem = cards[currentIndex + 1];
    if (nextItem) {
      navigate(`${ROUTES.DETAIL}/${nextItem.id}`);
    }
  };

  if (!pageData) {
    return (
      <div className="detailLoader">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="detailPage">
      {pageData.video ? (
        <video
          className="detailVideo"
          src={pageData.video}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="detailVideo"
          src={pageData.video || defaultImage}
          alt={pageData.processor}
        />
      )}
      <div className="detailOverlay">
        <div className="detailTitle">{pageData.processor}</div>
        <div className="detailArtist">{pageData.ram}</div>
        <Button className="detailNextBtn" variant="light" onClick={handleNext}>
          Далее
        </Button>
      </div>
    </div>
  );
};