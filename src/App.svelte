<script>
	import CatalogPage from './CatalogPage.svelte';
	import AdminPage from './AdminPage.svelte';


	const webpages = [
		{ name: "Catalog", component: CatalogPage },
		{ name: "Administration", component: AdminPage }
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
