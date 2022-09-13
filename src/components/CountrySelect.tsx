import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../data/countries";
import { AppContext } from "../context";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function CountrySelect() {
    const { data, setLocation } = useContext(AppContext);

    return (
        <Grid
            container
            spacing={{ xs: 1, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
        >
            <Grid item xs={1} sm={4} md={4}>
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 400 }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    defaultValue={{ code: "PH", label: "Philippines", phone: "63" }}
                    onChange={(event, value) => {
                        console.log("new value ", value);
                        setLocation(value?.label);
                    }}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                        >
                            <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                            />
                            {option.label} ({option.code})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Choose a country" />
                    )}
                />
            </Grid>
            <Grid item xs={1} sm={4} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                    TimeZone: {data?.timezone}
                </Typography>
            </Grid>
            <Grid item xs={1} sm={4} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                    {data?.description}
                </Typography>
            </Grid>
        </Grid>
    );
}
