import "./ITunesPage.css";
import { type FC, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type ITunesMusic, getMusicByName } from "../modules/itunesApi";
import { InputField } from "../components/InputField";
import { ROUTES } from "../Routes";
import { MusicCard } from "../components/MusicCard";
import { type AppOutletContext } from "../AppLayout";

const ITunesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState<ITunesMusic[]>([]);
  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getMusicByName(searchValue)
      .then((response) => {
        const results = response.results.filter(
          (item) => item.wrapperType === "track"
        );
        setMusic(results);
        setCards(results);
        setLoading(false);
      });
  };

  const handleCardClick = (trackId: number) => {
    navigate(`${ROUTES.DETAIL}/${trackId}`);
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
        (!music.length ? (
          <div>
            <h1>К сожалению, пока ничего не найдено :(</h1>
          </div>
        ) : (
          <div className="cardsList">
            {music.map((item) => (
              <MusicCard
                key={item.trackId}
                onClick={() => handleCardClick(item.trackId)}
                {...item}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default ITunesPage;