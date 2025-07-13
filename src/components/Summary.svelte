<!-- src/components/Summary.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { activeIndex, sectionRefs } from '$lib/scrollstate';
	let { summaryItems } = $props();
	let localIndex = $state($activeIndex);

	onMount(() => {
		let tries = 0;

		const waitForRefs = setInterval(() => {
			// Wait until all refs are non-null
			if (sectionRefs.length > 0 && sectionRefs.every(Boolean)) {
				clearInterval(waitForRefs);

				const observer = new IntersectionObserver(
					(entries) => {
						for (const entry of entries) {
							if (entry.isIntersecting) {
								const index = sectionRefs.findIndex((el) => el === entry.target);
								if (index !== -1) activeIndex.set(index);
							}
						}
					},
					{
						root: null,
						rootMargin: '0px 0px 0px 0px',
						threshold: 0.1
					}
				);

				sectionRefs.forEach((el) => el && observer.observe(el));

				// Cleanup
				return () => observer.disconnect();
			}

			if (tries++ > 50) clearInterval(waitForRefs); // fail-safe
		}, 50); // check every 50ms
	});

	function handleClick(item: any, index: number) {
		sectionRefs[index]?.scrollIntoView({ behavior: 'smooth' });
		// activeIndex.set(index);
	}
</script>

<h2 style="margin-bottom: 3rem; margin-top: .3rem;">Summary</h2>
<div style="display:flex; flex-direction:column;">
	{#each summaryItems as item, index}
		<button
			onclick={() => handleClick(item, index)}
			style="{$activeIndex === index ? 'outline: 2px solid #7289da;' : 'outline: 0px'};"
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
