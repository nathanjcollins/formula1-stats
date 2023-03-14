<script lang="ts">
    import type {PageData} from "./$types";
    import RaceWidget from "./RaceWidget.svelte";

    export let config = {
        isr: {
            expiration: 3600
        }
    }

    export let data: PageData;
    // const raceData: Race = {
    //     name: 'Bahrain',
    //     nextSession: {
    //         name: 'Practice 1',
    //         weather: {
    //             icon: '04d',
    //             temperature: 500,
    //             wind: 4,
    //             humidity: 10,
    //             description: "overcast clouds",
    //             cloudCoverage: 50
    //         }
    //     },
    //     upcomingSessions: [
    //         {
    //             name: 'Practice 2',
    //             weather: {
    //                 icon: '04d',
    //                 temperature: 500,
    //                 wind: 4,
    //                 humidity: 11,
    //                 description: "Overcast Clouds",
    //                 cloudCoverage: 50
    //             }
    //         },
    //         {
    //             name: 'Practice 3',
    //             weather: {
    //                 icon: '04d',
    //                 temperature: 500,
    //                 wind: 4,
    //                 humidity: 12,
    //                 description: "Overcast Clouds",
    //                 cloudCoverage: 50
    //             }
    //         },
    //         {
    //             name: 'Qualifying',
    //             weather: {
    //                 icon: '04d',
    //                 temperature: 500,
    //                 wind: 4,
    //                 humidity: 13,
    //                 description: "Overcast Clouds",
    //                 cloudCoverage: 50
    //             }
    //         },
    //         {
    //             name: 'Race',
    //             weather: {
    //                 icon: '04d',
    //                 temperature: 500,
    //                 wind: 4,
    //                 humidity: 14,
    //                 description: "Overcast Clouds",
    //                 cloudCoverage: 50
    //             }
    //         },
    //     ],
    //     dateTime: new Date()
    // };
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app"/>
</svelte:head>

<div class="p-2 md:p-0">
    <RaceWidget data={data}/>
</div>

