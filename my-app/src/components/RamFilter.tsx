import "./RamFilter.css";
import { type FC } from "react";
import { Button, Form } from "react-bootstrap";

interface Props {
  min: number;
  minValue: number;
  setMinValue: (value: number) => void;

  max: number;
  maxValue: number;
  setMaxValue: (value: number) => void;

  onApply: () => void; 
}

export const RamFilter: FC<Props> = ({ min, minValue, setMinValue, max, maxValue, setMaxValue, onApply }) => {
  const handleMin = (value: number) => setMinValue(Math.min(value, maxValue));
  const handleMax = (value: number) => setMaxValue(Math.max(value, minValue));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onApply();
  };

  return (
    <Form className="ramFilter" onSubmit={handleSubmit}>
      <Form.Label className="ramFilterLabel">
        Объём RAM: {minValue} – {maxValue} ГБ
      </Form.Label>

      <div className="ramFilterRow">
        <div className="ramSlider">
          <Form.Range
            className="ramRange"
            min={min}
            max={max}
            step={1}
            value={minValue}
            onChange={(event) => handleMin(Number(event.target.value))}
          />
          <Form.Range
            className="ramRange"
            min={min}
            max={max}
            step={1}
            value={maxValue}
            onChange={(event) => handleMax(Number(event.target.value))}
          />
        </div>

        <Button type="submit">Применить</Button>
      </div>
    </Form>
  )
};