import { Col, Button } from "react-bootstrap";
import { saveAs } from 'file-saver';
import { getCsv } from "../api/export";
import DataStore from "../store/DataStore";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useRef } from "react";
import { Data } from "../api/data";
import { Toast } from 'primereact/toast';

const ExportButton = () => {
  const [loading, setLoading] = useState(false);

  const toast = useRef<Toast>(null);

    const show = (message: string) => {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: `${message}` });
    };

  async function saveCsv(data: Data[]): Promise<void> {
    const response = await getCsv(data);
    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  }

  const handleExport = async (event: React.MouseEvent<any>) => {
    event.preventDefault();
    setLoading(true)
    try {
      await saveCsv(DataStore.tableData);
    } catch (error) { console.error("Error during CSV download", error);}
    setLoading(false)
  };

  const handleEmptyData = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    show("Epmty data")
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <Toast ref={toast} />
      <Button type="submit"  onClick={(e) => DataStore.tableData.length > 0 ? handleExport(e) : handleEmptyData(e)}>
        {loading ? (<Spinner animation="border" />) : 'Export'}
        </Button>
    </Col>
  );
};

export default ExportButton;
