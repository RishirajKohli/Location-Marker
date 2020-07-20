import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import arrowDownCircle from "@iconify/icons-mdi/arrow-down-circle";
import arrowUpCircle from "@iconify/icons-mdi/arrow-up-circle";

import "./tableArea.scss";
import {
  addLocationRow,
  updateLocationRow,
  toggleSort,
  addTable,
  deleteTable,
  toggleLocationStatus,
} from "./actions";

function TableArea({
  addLocationRow,
  updateLocationRow,
  toggleSort,
  tables,
  addTable,
  deleteTable,
  toggleLocationStatus,
  isThemeLight,
}) {
  const [addRow, setAddRow] = useState([false]);
  const [editing, setEditing] = useState([-1]);

  function handleDeleteTable(tableIndex) {
    return () => {
      deleteTable(tableIndex);
      let temp = [...addRow];
      temp[tableIndex] = false;
      setAddRow(temp);
      let temp2 = [...editing];
      temp2[tableIndex] = -1;
      setEditing(temp2);
    };
  }

  function handleNewLocationAdd(index) {
    return () => {
      let temp = [...addRow];
      temp[index] = true;
      setAddRow(temp);
    };
  }
  function handleNewLocationCancel(index) {
    return () => {
      let temp = [...addRow];
      temp[index] = false;
      setAddRow(temp);
    };
  }
  function handleAddNew(tableIndex) {
    return (event) => {
      event.preventDefault();
      let [name, lat, lng] = event.target;
      addLocationRow(name.value, lat.value, lng.value, tableIndex);
      let temp = [...addRow];
      temp[tableIndex] = false;
      setAddRow(temp);
    };
  }
  function handleUpdate(tableIndex) {
    return (event) => {
      event.preventDefault();
      let [name, lat, lng] = event.target;
      updateLocationRow(
        name.value,
        lat.value,
        lng.value,
        editing[tableIndex],
        tableIndex
      );
      let temp = [...editing];
      temp[tableIndex] = -1;
      setEditing(temp);
    };
  }
  function handlEdit(index, tableIndex) {
    return (event) => {
      event.preventDefault();
      let temp = [...editing];
      temp[tableIndex] = index;
      setEditing(temp);
    };
  }
  function handleToggleSort(tableIndex) {
    return () => {
      toggleSort(tableIndex);
    };
  }
  function handleLocationStatus(index, tableIndex) {
    return () => toggleLocationStatus(index, tableIndex);
  }
  return (
    <>
      <div className={`add-table ${isThemeLight ? null : "add-table-dark"}`}>
        <button onClick={addTable}> Add new Table</button>
      </div>
      {tables.map((table, tableIndex) => {
        return (
          <div className="table-container">
            <div className="table-controls">
              <input placeholder="Enter region"></input>

              <button onClick={handleDeleteTable(tableIndex)}>
                Delete Table
              </button>
            </div>
            <form
              onSubmit={handleAddNew(tableIndex)}
              id={`add-form-${tableIndex}`}
            ></form>
            <form
              onSubmit={handleUpdate(tableIndex)}
              id={`update-form-${tableIndex}`}
            ></form>
            <table className="marker-table">
              <thead className="marker-table__head">
                <tr>
                  <th>Disabled</th>
                  <th>
                    Name
                    <InlineIcon
                      icon={table.sortByAsc ? arrowDownCircle : arrowUpCircle}
                      className="sorting-arrow"
                      onClick={handleToggleSort(tableIndex)}
                    ></InlineIcon>
                  </th>
                  <th>Latitude/Longitude</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="marker-table__body">
                {table.locations.map((location, index) => {
                  return (
                    <>
                      {editing[tableIndex] === index ? (
                        <tr key={index}>
                          <td>
                            <input disabled type="checkbox"></input>
                          </td>
                          <td>
                            <input
                              required
                              type="text"
                              defaultValue={location.name}
                              form={`update-form-${tableIndex}`}
                            ></input>
                          </td>
                          <td>
                            <div className="coord-controls">
                              <input
                                type="number"
                                step="0.00001"
                                min="-90"
                                max="90"
                                defaultValue={location.lat}
                                form={`update-form-${tableIndex}`}
                              ></input>
                              <input
                                type="number"
                                step="0.00001"
                                min="-180"
                                max="180"
                                defaultValue={location.lng}
                                form={`update-form-${tableIndex}`}
                              ></input>
                            </div>
                          </td>
                          <td>
                            <button
                              type="submit"
                              form={`update-form-${tableIndex}`}
                              className="update-button"
                            >
                              Update Location
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={handleLocationStatus(index, tableIndex)}
                            ></input>
                          </td>
                          <td>
                            <span className="table-cell">{location.name}</span>
                          </td>
                          <td>
                            <span className="table-cell coords">
                              {location.lat}
                            </span>

                            <span className="table-cell coords">
                              {location.lng}
                            </span>
                          </td>
                          <td id="edit-button">
                            <button
                              onClick={handlEdit(index, tableIndex)}
                              className="edit-button"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}

                {addRow[tableIndex] ? (
                  <tr>
                    <td>
                      <input disabled type="checkbox"></input>
                    </td>
                    <td>
                      <input
                        required
                        type="text"
                        form={`add-form-${tableIndex}`}
                      ></input>
                    </td>
                    <td>
                      <div className="coord-controls">
                        <input
                          required
                          type="number"
                          step="0.00001"
                          min="-90"
                          max="90"
                          form={`add-form-${tableIndex}`}
                        ></input>
                        <input
                          required
                          type="number"
                          step="0.00001"
                          min="-180"
                          max="180"
                          form={`add-form-${tableIndex}`}
                        ></input>
                      </div>
                    </td>
                    <td>
                      <button
                        type="submit"
                        form={`add-form-${tableIndex}`}
                        className="update-button"
                      >
                        Save Location
                      </button>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <button
              onClick={
                addRow[tableIndex]
                  ? handleNewLocationCancel(tableIndex)
                  : handleNewLocationAdd(tableIndex)
              }
              className="add-row-button"
            >
              {addRow[tableIndex] ? "Cancel" : " Add New Location"}
            </button>
          </div>
        );
      })}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    tables: state.tableArea.tables,
    isThemeLight: state.app.isThemeLight,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addLocationRow: (name, lat, lng, tableIndex) =>
      dispatch(addLocationRow(name, lat, lng, tableIndex)),
    updateLocationRow: (name, lat, lng, index, tableIndex) =>
      dispatch(updateLocationRow(name, lat, lng, index, tableIndex)),
    toggleSort: (tableIndex) => dispatch(toggleSort(tableIndex)),
    addTable: () => dispatch(addTable()),
    deleteTable: (tableIndex) => dispatch(deleteTable(tableIndex)),
    toggleLocationStatus: (index, tableIndex) =>
      dispatch(toggleLocationStatus(index, tableIndex)),
  };
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(TableArea));
