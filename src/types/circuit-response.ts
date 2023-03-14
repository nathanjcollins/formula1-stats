export interface CircuitResponse {
    MRData: MRData;
}

export interface MRData {
    series: string;
    url: string;
    limit: number;
    offset: number;
    total: number;
    RaceTable: RaceTable;
}

export interface RaceTable {
    season: number;
    Races: Race[];
}

export interface Race {
    season: number;
    round: number;
    url: string;
    raceName: string;
    date: string;
    time: string;
    Circuit: Circuit;
    FirstPractice: Session;
    SecondPractice: Session;
    ThirdPractice?: Session;
    Sprint?: Session;
    Qualifying: Session;
}

export interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: Location;
}

export interface Location {
    lat: string;
    long: string;
    locality: string;
    country: string;
}

export interface Session {
    date: string;
    time: string;
}