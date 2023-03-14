export interface Race {
    name: string;
    dateTime: Date;
    nextSession: RaceSession;
    upcomingSessions: RaceSession[];
}

export interface RaceSession {
    weather: RaceWeather;
    name: string;
    dateTime: Date;
}

export interface RaceWeather {
    temperature: number;
    wind: number;
    icon: string;
    humidity: number;
    cloudCoverage: number;
    description: string;
}