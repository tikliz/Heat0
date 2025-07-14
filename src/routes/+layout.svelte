<script lang="ts">
	import { page } from '$app/state';
	import { setContext } from 'svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Summary from '../components/Summary.svelte';

	let { children } = $props();
	const roles = $state(['tank', 'healer', 'melee', 'ranged']);
	let selectedRole = $state(page.data?.selectedRole || 'tank');
	let selectedPosition = $state(page.data?.selectedPosition || '1');
	let selectedFight = $state(page.data?.selectedFight || 'home');
	let isMobile = $state(false);

	let showSidebarSummary = $state(true);

	let sidebarOpen = $state(true);

	function checkScreenSize() {
		isMobile = window.innerWidth < 768;
		console.log('Screen size checked:', isMobile);
	}

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	function saveToLocalStorage() {
		if (typeof window !== 'undefined') {
			const state = {
				selectedRole,
				selectedPosition
				// selectedFight
			};
			localStorage.setItem('userState', JSON.stringify(state));
		}
	}

	function goToGuide() {
		const baseUrl = `/${selectedFight}`;
		window.location.href = `${baseUrl}`;
	}

	$effect(() => {
		saveToLocalStorage();
	});
</script>

{#if !showSidebarSummary}
	<button
		onclick={() => (showSidebarSummary = !showSidebarSummary)}
		class="logo-button"
		style="position:fixed; top:1rem; left:1rem; z-index:1000; width:3rem; height:3rem;"
		aria-label="Toggle Sidebar and Summary"
	>
		{showSidebarSummary ? '0' : 'O'}
	</button>
{:else}
	<nav
		style="position:fixed; top:0; left:0; width:100%; background:#23272a; padding:1rem; z-index:1000; display:flex; justify-content:left; gap:1rem; box-shadow:0 2px 4px rgba(0,0,0,0.3); align-items:center;"
	>
		<div class="dropdowns" style="gap: 10px">
			<div style="display:flex; align-items:center; gap: {isMobile ? '1rem' : '0'};">
				<button
					onclick={() => (showSidebarSummary = !showSidebarSummary)}
					class="logo-button"
					aria-label="Toggle Sidebar and Summary"
				>
					{showSidebarSummary ? '0' : 'O'}
				</button>
				<span style="height:2.5rem; border-left:1px solid #444; margin:0 1rem;"></span>
				<select bind:value={selectedRole}>
					{#each roles as role}
						<option value={role}>{role.toUpperCase()}</option>
					{/each}
				</select>
				<select bind:value={selectedPosition}>
					{#if selectedRole === 'tank'}
						<option value="1" style="text-align:center;">MT</option>
						<option value="2" style="text-align:center;">OT</option>
					{:else}
						<option value="1" style="text-align:center;">1</option>
						<option value="2" style="text-align:center;">2</option>
					{/if}
				</select>
			</div>
			<select
				bind:value={selectedFight}
				style="width: {isMobile ? '100%' : '40%'};"
				onchange={() => goToGuide()}
			>
				<option disabled selected value="home"> -- select an option -- </option>
				<option value="uwu">The Weapon's Refrain (Ultimate)</option>
				<option value="b">Option B</option>
				<option value="c">Option C</option>
				<option value="d">Option D</option>
			</select>
		</div>

		{#if !isMobile}
			<a
				href="/"
				target="_blank"
				rel="noopener"
				style="color:#99aab5; font-size:1.5em; display:flex; align-items:center; gap:0.5em; margin-left:auto;"
			>
				<span
					style="font-weight:bold; font-size:3rem; display:flex; align-items:center; justify-content:center; width:3rem; height:3rem; padding-bottom:.5rem; background:#2c2f33; border-radius:20%; font-family:'Monomaniac One', 'Courier New', Courier, monospace; color:#f1f3f4;"
					>1</span
				>
				Haze1
			</a>
			<span style="height:2.5rem; border-left:1px solid #444; margin:0 1rem;"></span>
			<a
				href="https://github.com/tikliz/Heat0"
				target="_blank"
				rel="noopener"
				style="color:#99aab5; font-size:1.5em; display:flex; align-items:center; gap:0.5em;"
			>
				<svg height="1em" viewBox="0 0 16 16" fill="currentColor" style="vertical-align:middle;">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					/>
				</svg>
				<span>Repo</span></a
			>
		{/if}
	</nav>
{/if}

<div class="layout-container {showSidebarSummary ? '' : 'no-topbar'}">
	{#if showSidebarSummary}
		<div class="sidebar {sidebarOpen ? 'open' : 'closed'}">
			<button
				onclick={() => (sidebarOpen = !sidebarOpen)}
				aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
				class="toggle-button {sidebarOpen ? 'open' : 'closed'}"
			>
				{sidebarOpen ? '✖' : '☰'}
			</button>
			{#if sidebarOpen && page.data.summaryItems}
				<Summary summaryItems={page.data.summaryItems}></Summary>
			{/if}
		</div>
	{/if}

	<main>
		{@render children()}
	</main>
</div>

<style>
	select,
	button {
		background: #2c2f33;
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 4px;
		padding: 0.5rem 1rem;
	}
	select:focus,
	button:focus {
		outline: 2px solid #7289da;
	}
	a {
		color: #7289da;
	}
	a:hover {
		color: #99aab5;
	}

	main {
		flex: 1;
		/* padding: 2rem; */
		background-color: #1c1b22;
		overflow-y: auto;
		height: 100%;
	}

	.logo-button {
		font-weight: bold;
		font-size: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 1rem;
		background: #2c2f33;
		border-radius: 20%;
		font-family: 'Monomaniac One', 'Courier New', Courier, monospace;
		color: #f1f3f4;
		border: none;
		cursor: pointer;
		width: 3rem;
		height: 3rem;
	}

	.logo-button:hover {
		background: #40444b;
	}

	.toggle-button {
		position: fixed;
		top: 6.7rem;
		width: 4rem;
		height: 4rem;
		background: #23272a;
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 50%;
		cursor: pointer;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
		transition: left 0.3s ease;
	}

	.toggle-button:hover {
		background: #2c2f33;
	}
	.toggle-button:focus {
		outline: 0px;
	}

	.toggle-button.open {
		left: 10rem;
	}

	.toggle-button.closed {
		left: 0.8rem;
	}

	.layout-container {
		display: flex;
		position: relative;
		flex-direction: row; /* default for desktop layout */
		margin-top: 4.5rem;

		/* Lock to visible viewport height */
		height: calc(100vh - 4.5rem);
		max-height: calc(100vh - 4.5rem);

		/* Prevent children from overflowing */
		overflow: hidden;
	}

	.layout-container.no-topbar {
		margin-top: 0rem;
	}

	.sidebar {
		position: fixed;
		/* top: 4.5rem; */
		width: 15rem;
		transition: all 0.3s ease;
		overflow: hidden;
		background: #23272a;
		color: #f1f3f4;
		padding: 2rem 1rem 1rem 1rem;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
		position: relative;
	}

	.sidebar.closed {
		width: 6rem;
		padding: 2rem 0 1rem 0;
	}

	.dropdowns {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	@media (max-width: 768px) {
		nav {
			flex-wrap: wrap;
			padding: 0.5rem;
			gap: 0.5rem;
			font-size: 0.9rem;
		}

		.logo {
			width: 1.5rem;
			height: 1.5rem;
			font-size: 2rem;
		}

		select {
			width: 100%;
			flex: 1;
		}

		nav a {
			margin-left: 0 !important;
		}

		.toggle-button {
			top: 8.2rem;
		}

		.toggle-button.open {
			left: 10rem;
		}
		.toggle-button.closed {
			left: 1rem;
		}

		main {
			padding: 1rem;
		}

		.layout-container {
			margin-left: 0;
			margin-top: 6rem;
		}
	}

	@media (min-width: 768px) {
		.dropdowns {
			flex-direction: row;
			/* width: 60%; */
		}
	}

	.hidden {
		display: none; /* Class to hide elements */
	}
</style>
