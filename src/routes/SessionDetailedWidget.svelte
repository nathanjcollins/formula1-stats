<script lang="ts">
    import type {RaceSession} from "../types/race";

    export let data: RaceSession;
</script>

<div class="flex flex-col text-center gap-2 items-center">
    <h3 class="capitalize">{data.weather.description}</h3>
    <img src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`} alt="Weather Icon">
    <div class="grid grid-cols-2 gap-2 text-left">
        <p>Temperature: {data.weather.temperature}&deg;C</p>
        <p>Humidity: {data.weather.humidity}%</p>
        <p>Cloud Coverage: {data.weather.cloudCoverage}%</p>
        <p>Wind Speed: {data.weather.wind}meters/sec</p>
    </div>
</div>