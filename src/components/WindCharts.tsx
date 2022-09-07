import React, { useContext } from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer
} from "recharts";
import { AppContext } from "../context";

export default function WindCharts() {
    const { data, location } = useContext(AppContext);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                width={500}
                height={400}
                data={data?.days}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip formatter={(label) => label + " kph"} />
                <Legend />
                <Bar dataKey="windgust" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="windspeed" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}
