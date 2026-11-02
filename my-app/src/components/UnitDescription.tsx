import "./UnitDescription.css";
import { type FC, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  title: string;
  description: string;
}

export const UnitDescription: FC<Props> = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [description]);

  return (
    <div className="unitDescription">
      <p className="unitDescriptionTitle">{title}</p>
      <p
        ref={textRef}
        className={`unitDescriptionText ${expanded ? "expanded" : ""}`}
      >
        {description}
      </p>
      {truncated && (
        <Button
          variant="link"
          className="unitDescriptionToggle"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "СВЕРНУТЬ" : "ЕЩЁ"}
        </Button>
      )}
    </div>
  );
};