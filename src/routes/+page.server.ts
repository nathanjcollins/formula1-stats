import type {PageServerLoad} from "./$types";
import type {CircuitResponse} from "../types/circuit-response";
import type {WeatherResponse} from "../types/weather-response";
import {OPENWEATHER_API_KEY} from "$env/static/private";
import type {Race, RaceSession} from "../types/race";
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
    isr: {
        expiration: 60,
    }
};

export const load = (async ({cookies}) => {
    const response = await fetch("https://ergast.com/api/f1/current.json");
    const circuitData: CircuitResponse = await response.json();

    const now = new Date();
    const nextRace = circuitData.MRData.RaceTable.Races
        .sort(x => x.round)
        .find(x => new Date(x.date) >= now)!;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${nextRace.Circuit.Location.lat}&lon=${nextRace.Circuit.Location.long}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    let weatherData: WeatherResponse = await weatherResponse.json();
    weatherData.list = weatherData.list.sort(x => x.dt).reverse();

    const sprintOrP3 = nextRace.ThirdPractice ?? nextRace.Sprint!;

    const p1Weather = weatherData.list.find(x => new Date(x.dt_txt) <= new Date(`${nextRace.FirstPractice.date} ${nextRace.FirstPractice.time}`))!;
    const p2Weather = weatherData.list.find(x => new Date(x.dt_txt) <= new Date(`${nextRace.SecondPractice.date} ${nextRace.SecondPractice.time}`))!;
    const p3Weather = weatherData.list.find(x => new Date(x.dt_txt) <= new Date(`${sprintOrP3.date} ${sprintOrP3.time}`))!;
    const qualifyingWeather = weatherData.list.find(x => new Date(x.dt_txt) <= new Date(`${nextRace.Qualifying.date} ${nextRace.Qualifying.time}`))!;
    const raceWeather = weatherData.list.find(x => new Date(x.dt_txt) <= new Date(`${nextRace.date} ${nextRace.time}`))!;

    const raceSessions: RaceSession[] = [
        {
            name: "Practice 1",
            dateTime: new Date(`${nextRace.FirstPractice.date} ${nextRace.FirstPractice.time}`),
            weather: {
                description: p1Weather.weather[0].description,
                cloudCoverage: p1Weather.clouds.all,
                wind: p1Weather.wind.speed,
                icon: p1Weather.weather[0].icon,
                humidity: p1Weather.main.humidity,
                temperature: p1Weather.main.temp,
                rainInTheLastThreeHours: p1Weather.rain !== undefined ? p1Weather.rain ["3h"] : 0,
                precipitationProbability: p1Weather.pop * 100
            }
        },
        {
            name: "Practice 2",
            dateTime: new Date(`${nextRace.SecondPractice.date} ${nextRace.SecondPractice.time}`),
            weather: {
                description: p2Weather.weather[0].description,
                cloudCoverage: p2Weather.clouds.all,
                wind: p2Weather.wind.speed,
                icon: p2Weather.weather[0].icon,
                humidity: p2Weather.main.humidity,
                temperature: p2Weather.main.temp,
                rainInTheLastThreeHours: p2Weather.rain !== undefined ? p2Weather.rain ["3h"] : 0,
                precipitationProbability: p2Weather.pop * 100
            }
        },
        {
            name: nextRace.ThirdPractice ? "Practice 3" : "Sprint",
            dateTime: new Date(`${sprintOrP3.date} ${sprintOrP3.time}`),
            weather: {
                description: p3Weather.weather[0].description,
                cloudCoverage: p3Weather.clouds.all,
                wind: p3Weather.wind.speed,
                icon: p3Weather.weather[0].icon,
                humidity: p3Weather.main.humidity,
                temperature: p3Weather.main.temp,
                rainInTheLastThreeHours: p3Weather.rain !== undefined ? p3Weather.rain ["3h"] : 0,
                precipitationProbability: p3Weather.pop * 100
            }
        },
        {
            name: "Qualifying",
            dateTime: new Date(`${nextRace.Qualifying.date} ${nextRace.Qualifying.time}`),
            weather: {
                description: qualifyingWeather.weather[0].description,
                cloudCoverage: qualifyingWeather.clouds.all,
                wind: qualifyingWeather.wind.speed,
                icon: qualifyingWeather.weather[0].icon,
                humidity: qualifyingWeather.main.humidity,
                temperature: qualifyingWeather.main.temp,
                rainInTheLastThreeHours: qualifyingWeather.rain !== undefined ? qualifyingWeather.rain ["3h"] : 0,
                precipitationProbability: qualifyingWeather.pop * 100
            }
        },
        {
            name: "Race",
            dateTime: new Date(`${nextRace.date} ${nextRace.time}`),
            weather: {
                description: raceWeather.weather[0].description,
                cloudCoverage: raceWeather.clouds.all,
                wind: raceWeather.wind.speed,
                icon: raceWeather.weather[0].icon,
                humidity: raceWeather.main.humidity,
                temperature: raceWeather.main.temp,
                rainInTheLastThreeHours: raceWeather.rain !== undefined ? raceWeather.rain ["3h"] : 0,
                precipitationProbability: raceWeather.pop * 100
            }
        },
    ]

    // So we get the session even if it's live
    now.setHours(now.getHours() + 1);
    const nextSession = raceSessions.find(x => x.dateTime >= now)!;
    const race: Race = {
        name: nextRace.raceName,
        dateTime: new Date(`${nextRace.date} ${nextRace.time}`),
        nextSession: nextSession,
        upcomingSessions: raceSessions.filter(x => x.name !== nextSession.name)
    };

    return race;
}) satisfies PageServerLoad;