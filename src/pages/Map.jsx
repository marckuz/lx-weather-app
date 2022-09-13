import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../context";
import "leaflet/dist/leaflet.css";
import "../lib/leaflet-openweathermap";
import L from "leaflet";

const WEATHER_API_KEY = "064509463c96990192de40b25652f112";

export default function MapPage() {
  const [leafletMap, setLeafletMap] = useState(null);
  const { data } = useContext(AppContext);

  const mapRef = useRef(null);

  useEffect(() => {
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors</a>',
      }
    );
    const clouds = L.OWM.clouds({
      showLegend: false,
      opacity: 0.5,
      appId: WEATHER_API_KEY,
    });
    const rain = L.OWM.rainClassic({ appId: WEATHER_API_KEY });
    const wind = L.OWM.wind({ appId: WEATHER_API_KEY });
    const city = L.OWM.current({ intervall: 60, appId: WEATHER_API_KEY });
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    const map = L.map("map", { layers: [osm] });
    const overlayMaps = {
      City: city,
      Clouds: clouds,
      Rain: rain,
      "Wind speed": wind,
    };
    const baseMaps = { "OSM Standard": osm };
    L.control.layers(baseMaps, overlayMaps).addTo(map);
    setLeafletMap(map);
  }, [data]);

  useEffect(() => {
    if (data?.latitude && data?.longitude && leafletMap) {
      leafletMap.setView([data.latitude, data.longitude], 10);
    }
  }, [leafletMap]);

  return (
    <div
      ref={mapRef}
      id="map"
      className="p-2"
      style={{ height: "80vh", width: "100%" }}
    ></div>
  );
}
