import {
  ADD_LOCATION_ROW,
  UPDATE_LOCATION_ROW,
  TOGGLE_SORT,
  ADD_TABLE,
  DELETE_TABLE,
  TOGGLE_LOCATION_STATUS,
} from "./constants";

export function addTable() {
  return {
    type: ADD_TABLE,
  };
}
export function deleteTable(tableIndex) {
  return {
    type: DELETE_TABLE,
    tableIndex,
  };
}
export function addLocationRow(name, lat, lng, tableIndex) {
  return {
    type: ADD_LOCATION_ROW,
    name,
    lat,
    lng,
    tableIndex,
  };
}
export function updateLocationRow(name, lat, lng, index, tableIndex) {
  return {
    type: UPDATE_LOCATION_ROW,
    name,
    lat,
    lng,
    index,
    tableIndex,
  };
}
export function toggleSort(tableIndex) {
  return {
    type: TOGGLE_SORT,
    tableIndex,
  };
}
export function toggleLocationStatus(index, tableIndex) {
  return {
    type: TOGGLE_LOCATION_STATUS,
    index,
    tableIndex,
  };
}
