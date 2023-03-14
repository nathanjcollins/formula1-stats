<script lang="ts">
    import type {RaceSession} from "../types/race";

    export let data: RaceSession;
</script>

<div class="flex text-center gap-5 items-center">
    <h3>{data.name}</h3>
    <p>{data.weather.temperature}&deg;C</p>
    <img src={`https://openweathermap.org/img/wn/${data.weather.icon}.png`} alt="Weather Icon">
</div>