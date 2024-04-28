import { useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import DataStore from "../store/DataStore";
import { observer } from "mobx-react";
import { getTableData } from "../api/data";
import { debounce } from "lodash";
import { ProgressSpinner } from "primereact/progressspinner";

const FakeDataTable = observer(() => {
  const getPageSize = () => DataStore.page > 1 ? 10 : 20;

  const getData = async () => {
    DataStore.setLoading(true);
    try {
      const res = await getTableData(DataStore.regionValue.locale, DataStore.seedValue, DataStore.page, getPageSize(), DataStore.errorValue);
      DataStore.setTableData([...DataStore.tableData, ...res.data]);
      DataStore.incrementPage();
    } finally { DataStore.setLoading(false); }
  };

  const debouncedGetData = useCallback(
    debounce(() => {
      getData();
    }, 1000),
    []
  );

  const isScrollAtBottom = () => {
    return (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    );
  };

  const handleScroll = () => {
    const bottom = isScrollAtBottom();
    if (bottom && !DataStore.isLoading) {
      getData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (DataStore.regionValue.locale) {
      DataStore.resetData();
      debouncedGetData();
    }
  }, [DataStore.regionValue, DataStore.errorValue, DataStore.seedValue]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Uuid</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {DataStore.tableData.length === 0 && DataStore.isLoading ? (
            <tr>
              <td colSpan={5} className="centered-content">
                <ProgressSpinner />{" "}
              </td>
            </tr>
          ) : DataStore.tableData.length === 0 ? (
            <tr>
              <td colSpan={5} className="centered-content">
                <h2>No data available</h2>
              </td>
            </tr>
          ) : (
            DataStore.tableData.map((v, i) => (
              <tr key={i}>
                <td>{v.Number}</td>
                <td>{v.UUID}</td>
                <td>{v.Name}</td>
                <td>{v.Phone}</td>
                <td>{v.Address}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {DataStore.isLoading && DataStore.tableData.length !== 0 ? (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <ProgressSpinner />
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default FakeDataTable;
