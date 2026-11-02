import { type FC } from "react";
import { Card } from "react-bootstrap";
import "./RenderServerUnitCard.css";

interface RenderServerUnitCardProps {
  processor: string;
  image: string;
  cores: number;
  ram: number;
  onClick: () => void;
}

export const RenderServerUnitCard: FC<RenderServerUnitCardProps> = ({
  processor,
  image,
  cores,
  ram,
  onClick,
}) => {
  const defaultImage = "/DefaultImage.png";

  return (
    <Card className="card" onClick={onClick}>
      <Card.Img
        className="cardImage"
        variant="top"
        src={image || defaultImage}
        height={100}
        width={100}
      />
      <Card.Body>
        <div className="textStyle">
          <Card.Title>{processor}</Card.Title>
        </div>
        <div className="textStyle">
          <Card.Text>{cores}</Card.Text>
          <Card.Text>{ram}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};