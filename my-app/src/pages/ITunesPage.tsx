import "./ITunesPage.css";
import { type FC, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getMusicByName } from "../modules/itunesApi";
import { InputField } from "../components/InputField";
import { ROUTES } from "../Routes";
import { MusicCard } from "../components/MusicCard";
import { type AppOutletContext } from "../AppLayout";
import { SONGS_MOCK } from "../modules/mock";

const ITunesPage: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState(SONGS_MOCK.results);
  const { setCards } = useOutletContext<AppOutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    setCards(SONGS_MOCK.results);
  }, [setCards]);

  const applyMock = () => {
    const results = SONGS_MOCK.results.filter((item) =>
      item.collectionCensoredName
        .toLowerCase()
        .startsWith(searchValue.toLowerCase())
    );
    const list = results.length ? results : SONGS_MOCK.results;
    setMusic(list);
    setCards(list);
    setLoading(false);
  };

  const handleSearch = () => {
    setLoading(true);
    getMusicByName(searchValue)
      .then((response) => {
        const results = response.results.filter(
          (item) => item.wrapperType === "track"
        );
        if (results.length) {
          setMusic(results);
          setCards(results);
          setLoading(false);
          return;
        }
        applyMock();
      })
      .catch(applyMock);
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