import "./UnitSidebar.css";
import { type FC } from "react";
import { Button, Image, Stack } from "react-bootstrap";

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
  cores: number;
  ram: number;
  onNext: () => void;
}

export const UnitSidebar: FC<Props> = ({ likes, cores, ram, onNext }) => (
  <Stack gap={3} className="unitSidebar">
    <SidebarItem icon="/like.png" alt="Лайки" value={likes} />
    <SidebarItem icon="/cores.png" alt="Ядра" value={cores} />
    <SidebarItem icon="/RAM.png" alt="Память" value={`${ram} ГБ`} />
    <Button variant="link" className="unitSidebarNext" onClick={onNext}>
      <Image className="unitSidebarIcon" src="/next.png" alt="Далее" />
    </Button>
  </Stack>
);