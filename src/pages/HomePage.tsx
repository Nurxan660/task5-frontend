import FakeDataTable from "../components/FakeDataTable";
import { Container, Form, Row } from "react-bootstrap";
import RegionInput from "../components/RegionInput";
import ExportButton from "../components/ExportButton";
import RangeWithErrorsInput from "../components/RangeWithErrorsInput";
import SeedInput from "../components/SeedInput";

const HomePage = () => {
  return (
    <Container fluid>
      <Form>
        <Row className="align-items-center mb-3 mt-3 ms-2">
          <RegionInput/>
          <RangeWithErrorsInput/>
          <SeedInput/>
          <ExportButton/>
        </Row>
      </Form>

      <FakeDataTable />
    </Container>
  );
};

export default HomePage;
