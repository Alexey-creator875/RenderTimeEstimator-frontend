import "./UnitSidebar.css";
import { type FC } from "react";
import { Button, Image, Spinner, Stack } from "react-bootstrap";

interface ItemProps {
  icon: string;
  alt: string;
  value: string | number;
}

const SidebarItem: FC<ItemProps> = ({ icon, alt, value }) => (
  <div className="unitSidebarItem">
    <Image className="unitSidebarIcon" src={icon} alt={alt} />
    <span>{value}</span>
  </div>
);

interface Props {
  likes: number;
  isLiked: boolean;
  canLike: boolean;
  onLike: () => void;
  cores: number;
  ram: number;
  onNext: () => void;
  loading?: boolean;
}

export const UnitSidebar: FC<Props> = ({ likes, isLiked, canLike, onLike, cores, ram, onNext, loading }) => (
  <Stack gap={3} className="unitSidebar">
    <Button
      variant="link"
      className="unitSidebarLike"
      disabled={!canLike}
      onClick={onLike}
    >
      <SidebarItem
        icon={isLiked ? "/like_filled.png" : "/like.png"}
        alt="Лайки"
        value={likes}
      />
    </Button>
    <SidebarItem icon="/cores.png" alt="Ядра" value={cores} />
    <SidebarItem icon="/RAM.png" alt="Память" value={`${ram} ГБ`} />
    <Button
      variant="link"
      className="unitSidebarNext"
      disabled={loading}
      onClick={onNext}
    >
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <Image className="unitSidebarIcon" src="/next.png" alt="Далее" />
      )}
    </Button>
  </Stack>
);