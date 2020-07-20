import React, { memo } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../../components/LocationMarker";

function MapView({ tables }) {
  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCKQge0tR5EjVSQWg5zsku4KBw9KYUyc4Y" }}
        defaultCenter={{
          lat: 28.7041,
          lng: 77.1025,
        }}
        defaultZoom={6}
      >
        {tables.map((table, tableIndex) => {
          return table.locations.map((location, index) => {
            return (
              // <>
              //   {location.status && (
              <LocationMarker
                table={tableIndex}
                lat={location.lat}
                lng={location.lng}
                text={location.name}
                status={location.status}
              ></LocationMarker>
              //   )}
              // </>
            );
          });
        })}
      </GoogleMapReact>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    tables: state.tableArea.tables,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)(MapView);
export default memo(withConnect);
