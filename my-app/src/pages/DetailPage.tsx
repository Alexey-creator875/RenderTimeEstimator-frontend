import "./DetailPage.css";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { type ITunesMusic, getTrackById } from "../modules/itunesApi";
import { ROUTES } from "../Routes";
import { type AppOutletContext } from "../AppLayout";
import { SONGS_MOCK } from "../modules/mock";

const defaultImage = "/DefaultImage.png";

export const DetailPage: FC = () => {
  const [pageData, setPageData] = useState<ITunesMusic>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cards } = useOutletContext<AppOutletContext>();

  useEffect(() => {
    if (!id) return;

    const fromList = cards.find((item) => String(item.trackId) === id);
    if (fromList) {
      setPageData(fromList);
      return;
    }

    getTrackById(id)
      .then((response) => {
        const data = response.results[0];
        setPageData(
          data ??
            SONGS_MOCK.results.find((track) => String(track.trackId) === id)
        );
      })
      .catch(() =>
        setPageData(
          SONGS_MOCK.results.find((track) => String(track.trackId) === id)
        )
      );
  }, [id, cards]);

  const handleNext = () => {
    if (!id || !cards.length) return;
    const currentIndex = cards.findIndex(
      (item) => String(item.trackId) === id
    );
    const nextItem = cards[currentIndex + 1];
    if (nextItem) {
      navigate(`${ROUTES.DETAIL}/${nextItem.trackId}`);
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
      {pageData.previewUrl ? (
        <video
          className="detailVideo"
          src={pageData.previewUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="detailVideo"
          src={pageData.artworkUrl100 || defaultImage}
          alt={pageData.collectionCensoredName}
        />
      )}
      <div className="detailOverlay">
        <div className="detailTitle">{pageData.collectionCensoredName}</div>
        <div className="detailArtist">{pageData.artistName}</div>
        <Button className="detailNextBtn" variant="light" onClick={handleNext}>
          Далее
        </Button>
      </div>
    </div>
  );
};