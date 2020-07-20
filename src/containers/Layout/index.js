import React, { memo } from "react";
import "./layout.scss";
import { toggleTheme } from "../App/actions";
import { connect } from "react-redux";
function Layout({ children, isThemeLight, toggleTheme }) {
  console.log(children);

  return (
    <>
      <header className="header">
        <h2>Location Marker</h2>

        <div className="theme-control">
          <label htmlFor="select"> Choose Theme:</label>
          <select
            id="select"
            name="select"
            onChange={() => {
              toggleTheme();
            }}
          >
            <option value="true">Light</option>
            <option value="false">Dark</option>
          </select>
        </div>
      </header>
      <main
        className={`main-content ${isThemeLight ? null : "main-content-dark"}`}
      >
        {children}
      </main>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isThemeLight: state.app.isThemeLight,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: () => dispatch(toggleTheme()),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)(Layout);
export default memo(withConnect);
