<script lang="ts">
    import { sectionRefs } from '$lib/scrollstate';
	import { Canvas } from '@threlte/core';
    import Arena from '../../components/Arena.svelte';
	import { Sky } from '@threlte/extras';

    let introRef: HTMLElement;
	let garudaRef: HTMLElement;
	let ifritRef: HTMLElement;
	let titanRef: HTMLElement;
	let ultimaRef: HTMLElement;

    let arenaRef: any;

    $effect(() => {
        sectionRefs.length = 0;
        sectionRefs.push(
			introRef,
			garudaRef,
			ifritRef,
			titanRef,
			ultimaRef
		);
        console.log('Section refs updated:', sectionRefs);
    });

</script>

<div style="display:flex; align-items:center; justify-content:center; flex-direction:column; gap:1rem; padding:2rem;">
	<h1>ULTIMA WEAPON ULTIMATE GUIDE</h1>
    <section id="introduction" bind:this={introRef}>
        <h2>Introduction</h2>
        <p>blablablablabla MARKERS blabalablabal NAUR blablablabala CENTERUDA</p>
    </section>

    <Canvas>
        <Sky elevation={90} />
        <Arena bind:this={arenaRef} />
    </Canvas>
    <span style="margin: 3rem;"></span>

    <section id="garuda" bind:this={garudaRef}>
        <h2>Garuda</h2>
        <img src="../src/routes/uwu/resources/garuda.webp" alt="Garuda" width="100%" height="auto" />
    </section>
    <span style="margin: 3rem;"></span>

    <section id="ifrit" bind:this={ifritRef}>
        <h2>Ifrit</h2>
        <img src="../src/routes/uwu/resources/ifrit.jpg" alt="Ifrit" width="100%" height="auto" />
    </section>
    <span style="margin: 3rem;"></span>

    <section id="titan" bind:this={titanRef}>
        <h2>Titan</h2>
        <img src="../src/routes/uwu/resources/titan.webp" alt="Titan" width="100%" height="auto" />
    </section>
    <span style="margin: 3rem;"></span>

    <section id="ultima" bind:this={ultimaRef}>
        <h2>Ultima</h2>
        <img src="../src/routes/uwu/resources/ultima_weapon.jpg" alt="Ultima" width="100%" height="auto" />
    </section>
    
</div>


<style>
    section {
        scroll-margin-top: 7rem;
    }
</style>