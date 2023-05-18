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

    const filter = writable({ status: 'Tout' })

    const filtered = derived([filter, products], ([$filter, $products]) => {
        if ($filter.status === 'Tout') return $products
        return $products.filter(x => x.catalog_id === $filter.status)
    })

    let navItems = [
        {
            "title": 'Tout',
        },
        {
            "title": 8936268,
        },
        {
            "title": 8936265,
        }



        // Terrasse
        // Jardin
        // Outillage
        // Décoration
        // Meubles
        // Matérieux
        // Électricité
    ]

</script>

<main>
    <h1>Produits de bricolage</h1>
    <nav>
        {#each navItems as item}
            <button on:click={() => $filter.status = item.title} class:active={$filter.status == item.title}>{item.title}</button>
        {/each}
    </nav>

    <article>
        {#each $filtered as product}
            <Card title={product.libelle}
                  image={product.image}
                  price={product.prix}
                  promotion={product.promotion ? product.promotion : 0}
                  id="{product.product_id}"
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
        color: #4F8A06;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }


     /*NAV*/

     :global(html, body) {
         margin: 0;
         padding: 0;
     }

    nav {
        flex: 0 0 auto;
        white-space: no-wrap;
        display: flex;
        border-bottom: 1px solid #AAA;
        padding: 12px;
        overflow-x: scroll;
        background: #EEE;
    }

    button {
        background: none;
        border: none;
        appearance: none;
        display: flex;
        flex: 0 0 auto;
        padding: 10px 18px;
        min-height: 20px;
        text-decoration: none;
        border-radius: 24px;
    }

    button.active {
        background: #4F8A06;
        color: #FFF;
    }

</style>