import { Form, Row, Col, FormControl} from "react-bootstrap";
import { observer } from "mobx-react";
import DataStore from "../store/DataStore";

const SeedInput = observer(() => {
  const handleShuffleClick = () => {
    const randomSeed = Math.floor(Math.random() * 1000000);
    DataStore.setSeedValue(randomSeed);
  }

  const handleOnChangeSeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    DataStore.setSeedValue(Number(e.target.value));
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-2 mb-md-0">
      <Form.Group as={Row} controlId="formSeed" className="align-items-center">
        <Form.Label column xs="auto">
          Seed:
        </Form.Label>
        <Col xs="3" sm="5">
          <FormControl
            type="text"
            value={DataStore.seedValue}
            onChange={handleOnChangeSeed}
          />
        </Col>
        <Col>
          <span className="material-icons" onClick={handleShuffleClick}>
            shuffle
          </span>
        </Col>
      </Form.Group>
    </Col>
  );
})

export default SeedInput;
