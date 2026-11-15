import { type FC } from "react";
import { Card, Ratio } from "react-bootstrap";
import "./RenderServerUnitCard.css";

const DEFAULT_IMAGE = "/default-image.png";

interface RenderServerUnitCardProps {
  processor?: string;
  image?: string;
  cores?: number;
  ram?: number;
  likes_number?: number;
  is_mine?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

export const RenderServerUnitCard: FC<RenderServerUnitCardProps> = ({
  processor,
  image,
  cores,
  ram,
  likes_number,
  is_mine,
  onClick,
  onDelete,
}) => {
  return (
    <Card className="unitCard h-100" onClick={onClick}>
      <Ratio aspectRatio="1x1">
        <Card.Img
          variant="top"
          className="unitCardImage"
          src={image || DEFAULT_IMAGE}
          alt={processor ?? ""}
        />
      </Ratio>

      <Card.Body className="unitCardBody">
        <Card.Title className="unitCardTitle">{processor}</Card.Title>
        <Card.Text className="unitCardSpec">Ядер: {cores} шт.</Card.Text>
        <Card.Text className="unitCardSpec">RAM: {ram} ГБ</Card.Text>
      </Card.Body>

      <Card.Footer className="unitCardFooter">
        <img className="unitCardLike" src="/blue-like.png" alt="Лайки" />
        <span>{likes_number ?? 0}</span>

        {is_mine && (
          <button
            type="button"
            className="unitCardDelete"
            aria-label="Удалить"
            onClick={(event) => {
              event.stopPropagation(); // не открывать карточку при удалении
              onDelete?.();
            }}
          >
            <img src="/trash.png" alt="Удалить" />
          </button>
        )}
      </Card.Footer>
    </Card>
  );
};