export interface WeatherResponse {
    cod: number;
    message: string;
    cnt: number;
    list: WeatherItem[];
}

export interface WeatherItem {
    dt: number;
    main: WeatherMain;
    weather: WeatherIcons[];
    clouds: WeatherClouds;
    wind: WeatherWind;
    visibility: number;
    pop: number;
    sys: WeatherSys;
    dt_txt: string;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface WeatherIcons {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherClouds {
    all: number;
}

export interface WeatherWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface WeatherSys {
    pod: string;
}