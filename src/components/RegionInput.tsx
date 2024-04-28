import { Col } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { getLocales } from "../api/locales";
import { Locale } from "../api/locales";
import { useEffect, useState } from "react";
import "../css/main.css";
import { getLocaleDisplayName } from "../utils/localeUtils";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import DataStore from "../store/DataStore";
import { observer } from "mobx-react";

const RegionInput = observer(() => {
  const [locales, setLocales] = useState<Locale[]>([]);
  const [loading, setLoading] = useState(true);
  
  const getCountries = async () => {
    try {
      const res = await getLocales();
      setLocales(res.data.map(locale => ({ name: getLocaleDisplayName(locale.name), locale: locale.name })));
    } finally { setLoading(false); }
  };

  const handleOnChangeRegionInput = (e: Locale) => {
    DataStore.setRegionValue(e);
  }

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mb-2 mb-md-0">
      <Dropdown
        placeholder={loading ? "Loading..." : "Select region"}
        onChange={(e) => handleOnChangeRegionInput(e.value)}
        value={DataStore.regionValue}
        options={locales}
        optionLabel="name"
        loading={loading}
      />
    </Col>
  );
})

export default RegionInput;
