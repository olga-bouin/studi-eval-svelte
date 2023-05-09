<script>
	import Card from "./Card.svelte";
	import { onMount } from "svelte";
	//@TODO split files
	//import { apiData, drinkNames } from './stores.js';
	//export let name;
	export let products;

	import { writable, derived } from 'svelte/store';

	/** Store for your data.
	 This assumes the data you're pulling back will be an array.
	 If it's going to be an object, default this to an empty object.
	 **/
	export const apiData = writable([]);
	export const apiCatalogData = writable([]);

	/** Data transformation.
	 For our use case, we only care about the drink names, not the other information.
	 Here, we'll create a derived store to hold the drink names.
	 **/
	export const drinks = derived(apiData, ($apiData) => {
		if ($apiData.drinks){
			return $apiData.drinks;
		}
		return [];
	});

	onMount(async () => {
		fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
				.then(response => response.json())
				.then(data => {
					console.log(data);
					apiData.set(data);
				}).catch(error => {
			console.log(error);
			return [];
		});
	});

	onMount(async () => {
		fetch("https://back-fastapi.herokuapp.com/api/catalog/")
				.then(response => response.json())
				.then(data => {
					console.log(data);
					apiCatalogData.set(data);
				}).catch(error => {
			console.log(error);
			return [];
		});
	});

	export const catalogs = derived(apiCatalogData, ($apiCatalogData) => {
		if ($apiCatalogData){
			return $apiCatalogData;
		}
		return [];
	});

</script>

<main>
	<div>
		<h1>Catalogs</h1>
		<ul>
			{#each $catalogs as catalog}
				<li>
					<span>{catalog.libelle}</span>
				</li>
			{/each}
		</ul>
	</div>
	<h1>Here is 1st product: {products[0].name}</h1>
	<div>
		<ul>
			{#each products as product}
				<li>
					<span>{product.name}</span>
					<button>{product.price}</button>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<article>
			{#each products as product}
				<Card 	title={product.name}
						backgroundImage={product.image}
						price={product.price} />
			{/each}
		</article>
	</div>
	<main>
		<h1>Whiskey Drinks Menu</h1>
		<article>
			{#each $drinks as drink}
				<Card 	title={drink.strDrink}
						backgroundImage={drink.strDrinkThumb}
						price={drink.idDrink} />
			{/each}
		</article>
	</main>
</main>

<style>
	article {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin: 0.4rem;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>