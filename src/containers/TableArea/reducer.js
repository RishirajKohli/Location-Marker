import {
  ADD_LOCATION_ROW,
  UPDATE_LOCATION_ROW,
  TOGGLE_SORT,
  ADD_TABLE,
  DELETE_TABLE,
  TOGGLE_LOCATION_STATUS,
} from "./constants";
import { sortByNameAsc, sortByNameDesc } from "./sorts";
const initialState = {
  tables: [{ locations: [], sortByAsc: true }],
};

export function tableArea(state = initialState, action) {
  switch (action.type) {
    case ADD_TABLE: {
      let temp = [...state.tables];
      temp.push({ locations: [], sortByAsc: true });
      return { ...state, tables: temp };
    }
    case DELETE_TABLE: {
      let temp = [...state.tables];
      temp.splice(action.tableIndex, 1);
      return { ...state, tables: temp };
    }
    case ADD_LOCATION_ROW: {
      let temp = [...state.tables[action.tableIndex].locations];
      temp.push({
        name: action.name,
        lat: action.lat,
        lng: action.lng,
        status: true,
      });
      temp.sort(
        state.tables[action.tableIndex].sortByAsc
          ? sortByNameAsc
          : sortByNameDesc
      );
      let tempTables = [...state.tables];
      tempTables[action.tableIndex] = {
        ...tempTables[action.tableIndex],
        locations: temp,
      };
      return { ...state, tables: tempTables };
    }
    case UPDATE_LOCATION_ROW: {
      let temp = [...state.tables[action.tableIndex].locations];
      temp[action.index] = {
        ...temp[action.index],
        name: action.name,
        lat: action.lat,
        lng: action.lng,
      };
      temp.sort(
        state.tables[action.tableIndex].sortByAsc
          ? sortByNameAsc
          : sortByNameDesc
      );
      let tempTables = [...state.tables];
      tempTables[action.tableIndex] = {
        ...tempTables[action.tableIndex],
        locations: temp,
      };
      return { ...state, tables: tempTables };
    }
    case TOGGLE_SORT: {
      let sortByAsc = !state.tables[action.tableIndex].sortByAsc;

      let temp = [...state.tables[action.tableIndex].locations];
      temp.reverse();
      let tempTables = [...state.tables];
      tempTables[action.tableIndex] = {
        ...tempTables[action.tableIndex],
        locations: temp,
        sortByAsc,
      };
      return { ...state, tables: tempTables };
    }
    case TOGGLE_LOCATION_STATUS: {
      let temp = [...state.tables[action.tableIndex].locations];
      temp[action.index] = {
        ...temp[action.index],
        status: !temp[action.index].status,
      };
      let tempTables = [...state.tables];
      tempTables[action.tableIndex] = {
        ...tempTables[action.tableIndex],
        locations: temp,
      };
      return { ...state, tables: tempTables };
    }
    default:
      return state;
  }
}
