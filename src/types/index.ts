export interface currentConditionsModel {
    "datetime": string;
    "datetimeEpoch": number;
    "temp": number;
    "feelslike": number;
    "humidity": number;
    "dew": number;
    "precip": number;
    "snow": number;
    "snowdepth": number;
    "windgust": number;
    "windspeed": number;
    "winddir": number;
    "pressure": number;
    "visibility": number;
    "cloudcover": number;
    "solarradiation": number;
    "solarenergy": number;
    "uvindex": number;
    "conditions": string;
    "sunrise": string;
    "sunriseEpoch": number;
    "sunset": string;
    "sunsetEpoch": number;
    "moonphase": number;
    "description": string;
}

export interface daysDataModel extends currentConditionsModel {
    "hours": currentConditionsModel[];
    "description": string;
}

export interface weatherDataModel {
    "currentConditions": currentConditionsModel;
    "address": string;
    "days": daysDataModel[];
    "description": string;
    "latitude": number;
    "longitude": number;
    "resolvedAddress": string;
    "timezone": string;
    "tzoffset": number;
}

export interface contextModel {
    "location": string;
    "data"?: weatherDataModel;
    "setLocation": any;
    "selectedHour": number,
    "setSelectedHour": any;
}

export interface CountryType {
    "code": string;
    "label": string;
    "phone": string;
    "suggested"?: boolean;
}

export interface TableColumn {
    id: 'datetime' | 'temp' | 'feelslike' | 'dew' | 'humidity' | 'snow' | 'snowdepth' | 'windgust' | 'windspeed' | 'winddir' | 'cloudcover' | 'visibility' | 'uvindex' | 'sunrise' | 'sunset' | 'moonphase' | 'conditions' | 'description';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}