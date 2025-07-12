<!-- src/components/Summary.svelte -->
<script lang="ts">
	let { summaryItems } = $props();
	let activeIndex = $state();

	import { goto } from '$app/navigation';

	function handleClick(item: any, index: number) {
		activeIndex = index;
		goto(item.link);
	}
</script>

<h2 style="margin-bottom: 3rem; margin-top: .3rem;">Summary</h2>
<div style="display:flex; flex-direction:column;">
	{#each summaryItems as item, index}
		<button
			onclick={() => handleClick(item, index)}
			style="{activeIndex === index ? 'outline: 2px solid #7289da;' : 'outline: 0px'};"
			>{item.title}</button
		>
	{/each}
</div>

<!-- <ul>
	{#each summaryItems as item}
		<li>
			<a href={item.link}>{item.title}</a>
		</li>
	{/each}
</ul> -->

<style>
	h2 {
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		width: 80%;
		max-width: 13rem;
		box-sizing: border-box;
		margin: 0 auto;
	}

	button {
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		width: 100%;
		max-width: 13rem;
		margin-bottom: 1rem;
		box-sizing: border-box;

		/* Prevent overflow */
		overflow: hidden;
		white-space: normal;
		word-wrap: break-word;
		word-break: break-word;
		text-overflow: ellipsis;
	}

	button:hover {
		background: #2c2f33;
	}

	@media (max-width: 768px) {
		h2 {
			width: 80%;
			max-width: 100%;
		}
		button {
			max-width: 100%;
			width: 100%;
		}
	}
</style>
