import { makeAutoObservable } from 'mobx';
import { Data } from '../api/data';
import { Locale } from '../api/locales';

class DataStore {
  seedValue: number = 0;
  errorValue: number = 0;
  rangeErrorValue: number = 0;
  regionValue: Locale = {name: '', locale: ''};
  tableData: Data[] = [];
  page: number = 1;
  pageSize: number = 20;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSeedValue(value: number) {
    this.seedValue = value;
  }

  setErrorValue(value: number) {
    this.errorValue = value;
  }

  setRangeErrorValue(value: number) {
    this.rangeErrorValue = value;
  }

  setRegionValue(value: Locale) {
    this.regionValue = value;
  }

  setTableData(data: Data[]) {
    this.tableData = data
  }

  resetData() {
    this.tableData = [];
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }
}

export default new DataStore;