import { type FC } from "react";
import { Card } from "react-bootstrap";
import "./MusicCard.css";

interface ICardProps {
  artworkUrl100: string;
  artistName: string;
  collectionCensoredName: string;
  onClick: () => void;
}

export const MusicCard: FC<ICardProps> = ({
  artworkUrl100,
  artistName,
  collectionCensoredName,
  onClick,
}) => {
  const defaultImage = "/DefaultImage.png";

  return (
    <Card className="card" onClick={onClick}>
      <Card.Img
        className="cardImage"
        variant="top"
        src={artworkUrl100 || defaultImage}
        height={100}
        width={100}
      />
      <Card.Body>
        <div className="textStyle">
          <Card.Title>{collectionCensoredName}</Card.Title>
        </div>
        <div className="textStyle">
          <Card.Text>{artistName}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};