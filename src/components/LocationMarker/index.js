import React, { memo } from "react";
import { Icon } from "@iconify/react";
import MapMarker from "@iconify/icons-mdi/map-marker";
import "./locationMarker.scss";
const LocationMarker = ({ text, table, status }) => {
  return (
    <div>
      <Icon
        icon={MapMarker}
        style={{
          color: `rgba(${(195 + table * 30) % 255},${
            (140 + table * 40) % 255
          },${(50 + table * 20) % 255})`,
          visibility: status ? "visible" : "hidden",
        }}
        className="pin-icon"
      ></Icon>
      <p>{text}</p>
    </div>
  );
};
export default memo(LocationMarker);
