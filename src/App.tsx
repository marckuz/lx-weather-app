import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/Map";
import React, { useEffect, useState } from "react";
import { AppContext } from "./context";
import CountrySelect from "./components/CountrySelect";
import { Container } from "@mui/material";
import HourlyTable from "./pages/HourlyTable";

export default function App() {
  const [data, setData] = useState<any>();
  const [selectedHour, setSelectedHour] = useState<any>(0);
  const [location, setLocation] = useState<string>("Philippines");

  const getData = () => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZMM2U9XUSJ6UV37L4L49NQACY&contentType=json`,
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData(); //fetch data everytime location changes
  }, [location]);

  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <AppContext.Provider
          value={{ data, location, setLocation, selectedHour, setSelectedHour }}
        >
          <CountrySelect />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/hourly" element={<HourlyTable />} />
          </Routes>
        </AppContext.Provider>
      </Container>
    </div>
  );
}
