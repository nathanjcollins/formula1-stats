<script>
    import '../app.postcss';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="app max-w-5xl m-auto mt-10 flex items-center justify-center">
    <main class="flex flex-col items-center justify-center gap-5 w-full">
        <h1 class="text-center text-5xl font-extrabold">Formula <span class="bg-gradient-to-b from-rose-400 to-red-500 truncate text-transparent bg-clip-text break-words">1</span> Weather</h1>
        <slot/>
    </main>
</div>
