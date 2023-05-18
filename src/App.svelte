<script>
	import CatalogPage from './CatalogPage.svelte';
	import PromoPage from './PromoPage.svelte';

	const webpages = [
		{ name: "Catalogue", component: CatalogPage },
		{ name: "Promotions", component: PromoPage }
	];

	let selectedPage = webpages[0];
	$: console.dir(selectedPage)

	const loadPage = (obj) => selectedPage = obj;

</script>
{#each webpages as webpageObj}
	<button class="tablink"
			title={webpageObj.name}
			on:click={() => loadPage(webpageObj)}>{webpageObj.name}</button>
{/each}
<svelte:component this={selectedPage.component} />
