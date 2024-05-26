import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import identifyStoppages from "./utils/stoppageDetection";
import gpsData from "./assets/data/data.json";
import "./App.css";

const App = () => {
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const detectedStoppages = identifyStoppages(gpsData, threshold);
    setStoppages(detectedStoppages);
  }, [threshold]);

  const handleChange = (e) => {
    setThreshold(e.target.value);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1px",
          paddingBottom: "16px",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
          zIndex: "99999999",
        }}
      >
        <div>
          <h2>Vehicle Stoppage Identification and Visualization</h2>
        </div>
        <div>
          <label>Stoppage Threshold (minutes): </label>
          <input
            placeholder="Enter stoppage threshold"
            type="number"
            onChange={handleChange}
            min={0}
            style={{ borderRadius: "4px", width: "150px", padding: "4px" }}
            className="input"
          />
        </div>
      </div>
      {gpsData.length > 0 && (
        <MapComponent gpsData={gpsData} stoppages={stoppages} />
      )}
    </div>
  );
};

export default App;
