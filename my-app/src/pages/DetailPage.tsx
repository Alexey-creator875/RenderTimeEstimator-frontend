import "./DetailPage.css";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { UnitDescription } from "../components/UnitDescription";
import { UnitSidebar } from "../components/UnitSidebar";
import { type RenderServerUnit } from "../modules/renderServerUnitsApi";
import { ROUTES } from "../Routes";
import { type AppOutletContext } from "../AppLayout";
import { RENDER_SERVER_UNITS_MOCK } from "../modules/mock";

const DEFAULT_VIDEO = "/default-video.mp4";

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

    setPageData(
      RENDER_SERVER_UNITS_MOCK.renderServerUnits.find((renderServerUnit) => String(renderServerUnit.id) === id)
    )
  }, [id, cards]);

  const handleNext = () => {
    if (!id || !cards.length) return;
    const currentIndex = cards.findIndex(
      (item) => String(item.id) === id
    );
    const nextItem = cards[currentIndex + 1] ?? cards[0];
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
      <video
        className="detailVideo"
        src={pageData.video || DEFAULT_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />

      
      <div className="detailOverlay">
        <div className="detailOverlayRight">
          <UnitSidebar
            likes={pageData.likes_number}
            cores={pageData.cores}
            ram={pageData.ram}
            onNext={handleNext}
          />
        </div>
        <div className="detailOverlayLeft">
          <UnitDescription
            key={pageData.id}
            title={pageData.processor}
            description={pageData.description}
          />
        </div>
      </div>
    </div>
  );
};