<!-- src/components/Summary.svelte -->
<script lang="ts">
	let { summaryItems } = $props();
	let activeIndex = $state();

	import { goto } from "$app/navigation";

	function handleClick(item: any, index: number) {
		activeIndex = index;
		goto(item.link);
	}
</script>

<h2 style="margin-bottom: 3rem; margin-top: .3rem;">Summary</h2>
<div style="display:flex; flex-direction:column;">
	{#each summaryItems as item, index}
		<button onclick="{() => handleClick(item, index)}" style="{activeIndex === index ? "outline: 2px solid #7289da;" : "outline: 0px"};">{item.title}</button>
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
		/* background: #2c2f33; */
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		width: 12rem;
		transition: left 0.3s ease;
	}
	button {
		/* background: #2c2f33; */
		color: #f1f3f4;
		border: 1px solid #444;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		width: 13rem;
		margin-bottom: 2rem;
		transition: left 0.3s ease;
		word-wrap: break-word;
	}
	button:hover {
		background: #2c2f33;
	}
</style>