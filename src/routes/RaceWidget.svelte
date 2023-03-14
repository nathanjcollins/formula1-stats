<script lang="ts">
    import type {Race} from "../types/race";
    import SessionWidget from "./SessionWidget.svelte";
    import SessionDetailedWidget from "./SessionDetailedWidget.svelte";

    export let data: Race;
</script>

<div class="min-w-full border-red-500 border-2 rounded-lg p-5 flex flex-col gap-5 shadow-2xl">
    <h2 class="self-center text-2xl font-bold">{data.name}</h2>
    <div class="flex flex-col items-center pb-10 border-b-2">
        <h3 class="text-xl">Next Session: {data.nextSession.name}</h3>
        <SessionDetailedWidget data={data.nextSession}/>
    </div>

    <div class="flex place-content-between flex-col md:flex-row">
        {#each data.upcomingSessions as upcomingSession}
            <SessionWidget data={upcomingSession}/>
        {/each}
    </div>
</div>