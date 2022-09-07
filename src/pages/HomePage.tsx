import {
    Container, Typography,
} from "@mui/material";
import React, { Fragment, useContext } from "react";
import { AppContext } from "../context";
import CardWeather from "../components/CardWeather";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import WindCharts from "../components/WindCharts";

export default function HomePage() {
    const { data } = useContext(AppContext);
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Daily Forecast
            </Typography>
            <Swiper
                slidesPerView={7}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {data?.days.map((hourData, i) => (
                    <SwiperSlide key={hourData.datetimeEpoch}>
                        <CardWeather hourData={hourData} index={i} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <br />
            <Typography variant="h6" gutterBottom>
                Wind Pressure
            </Typography>
            <WindCharts />
        </Fragment>
    );
}
