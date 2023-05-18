<script>
    import Card from "./Card.svelte";
    import {derived, writable} from "svelte/store";
    import {onMount} from "svelte";

    export const apiProductsData = writable([]);


    onMount(async () => {
        fetch("https://back-fastapi.herokuapp.com/api/products/")
            .then(response => response.json())
            .then(data => {
                apiProductsData.set(data);
            }).catch(error => {
            console.error(error);
            return [];
        });
    });


    export const products = derived(apiProductsData, ($apiProductsData) => {
        if ($apiProductsData) {
            return $apiProductsData;
        }
        return [];
    });
</script>

<main>
    <h1>Products DIY</h1>
    <article>
        {#each $products as product}
            <Card title={product.libelle}
                  image={product.image}
                  price={product.prix}
                  promotion={product.promotion ? product.promotion : 0}
            />
        {/each}
    </article>
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