import {
  Card,
  CardHeader,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import React, { useContext } from "react";
import cloudy from "../assets/weathers/cloudy.svg";
import sunny from "../assets/weathers/sunny.svg";
import rainy from "../assets/weathers/rainy.svg";
import snowy from "../assets/weathers/snowy.svg";
import { currentConditionsModel } from "../types";
import { styled } from "@mui/material/styles";
import { AppContext } from "../context";
import { Link } from "react-router-dom";

const CardWeather = ({
  hourData,
  index,
}: {
  hourData: currentConditionsModel;
  index: number;
}) => {
  const { setSelectedHour } = useContext(AppContext);

  const getIcon = (condition: string) => {
    if (condition.match(/snow/gi)) {
      return snowy;
    } else if (condition.match(/rain/gi)) {
      return rainy;
    } else if (condition.match(/cloudy/gi)) {
      return cloudy;
    } else {
      console.log("sunny ", sunny);
      return sunny;
    }
  };
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <HtmlTooltip
      title={<Typography color="inherit">{hourData.description}</Typography>}
    >
      <Card
        sx={{
          maxWidth: 345,
          background: "linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)",
        }}
        onClick={setSelectedHour(index)}
      >
        <Link style={{ color: "white" }} to={"/hourly"}>
          <CardActionArea>
            <CardHeader
              title={hourData.temp + "°C"}
              subheader={hourData.datetime}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <img
                src={getIcon(hourData.conditions)}
                alt={hourData.conditions}
                height={100}
              />
              <Typography gutterBottom variant="subtitle1" component="div">
                {hourData.conditions}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </HtmlTooltip>
  );
};
export default CardWeather;
