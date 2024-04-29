import { Form, Row, Col } from "react-bootstrap";
import DataStore from "../store/DataStore";
import { observer } from "mobx-react";

const RangeWithErrorsInput = observer(() => {
  const handleRangeErrorValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    DataStore.setRangeErrorValue(value);
    DataStore.setErrorValue(value);
  };

  const handleErrorValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newValue = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 1000);

    DataStore.setErrorValue(newValue);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-2 mb-md-0">
      <Form.Group as={Row} className="align-items-center">
        <Form.Label column xs="auto">
          Errors:
        </Form.Label>
        <Col xs="4" className="d-flex justify-content-center">
          <Form.Range
            min={0}
            max={10}
            step={0.01}
            value={DataStore.rangeErrorValue}
            onChange={handleRangeErrorValueChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            style={{ width: "80px" }}
            value={DataStore.errorValue}
            onChange={handleErrorValue}
            min={0}
            max={1000}
          />
        </Col>
      </Form.Group>
    </Col>
  );
})

export default RangeWithErrorsInput;
