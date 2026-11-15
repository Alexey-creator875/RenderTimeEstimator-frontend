import "./DetailPage.css";
import { type FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UnitDescription } from "../components/UnitDescription";
import { UnitSidebar } from "../components/UnitSidebar";
import { ROUTES } from "../Routes";
import { getRenderServerUnit } from "../slices/renderServerUnitsSlice";
import { type AppDispatch } from "../store";

const DEFAULT_VIDEO = "/default-video.mp4";

export const DetailPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { current, currentLoading, currentError } = useSelector(
    (s: any) => s.renderServerUnits
  );

  // показываем карточку только если она соответствует id из адреса
  const pageData = current && String(current.id) === id ? current : null;

  useEffect(() => {
    if (!id) return;
    // карточка уже загружена (например, после «Далее»), повторный запрос не нужен
    if (current && String(current.id) === id) return;
    dispatch(getRenderServerUnit({ id: Number(id) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const handleNext = async () => {
    if (!id) return;
    try {
      const next = await dispatch(
        getRenderServerUnit({ id: Number(id), next: true })
      ).unwrap();
      navigate(`${ROUTES.DETAIL}/${next.id}`);
    } catch {
      // ошибка уже записана в store
    }
  };

  if (!pageData) {
    return (
      <div className="detailLoader">
        {currentError && !currentLoading ? (
          <h2>{currentError}</h2>
        ) : (
          <Spinner animation="border" />
        )}
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
            likes={pageData.likes_number ?? 0}
            cores={pageData.cores ?? 0}
            ram={pageData.ram ?? 0}
            onNext={handleNext}
          />
        </div>
        <div className="detailOverlayLeft">
          <UnitDescription
            key={pageData.id}
            title={pageData.processor ?? ""}
            description={pageData.description ?? ""}
          />
        </div>
      </div>
    </div>
  );
};
