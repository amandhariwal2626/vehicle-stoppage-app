import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ gpsData, stoppages }) => {
  const pathCoordinates = gpsData.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  return (
    <MapContainer
      center={[pathCoordinates[0][0], pathCoordinates[0][1]]}
      zoom={13}
      style={{ height: "100%", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={pathCoordinates} color="blue" />
      {stoppages.map((stoppage, index) => (
        <Marker
          key={index}
          position={[stoppage.start.latitude, stoppage.start.longitude]}
        >
          <Popup>
            <div>
              <p>
                <strong>Reach Time:</strong>{" "}
                {new Date(stoppage.start.eventGeneratedTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {new Date(stoppage.end.eventGeneratedTime).toLocaleString()}
              </p>
              <p>
                <strong>Duration:</strong> {stoppage.duration}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
