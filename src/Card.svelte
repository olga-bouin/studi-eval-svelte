<script>
    export let title;
    export let price;
    export let promotion;
    export let image;
    export let id;
</script>

<a href="https://www.google.com/search?q={title}" target="_blank">
    <div id="interaction">
        <p>
            {@html title}
        </p>
        <div>
            <img alt={title}
                 title="id: {id}"
                 src={image}/>
        </div>
        <div>
            {#if !promotion || promotion === price}
                <p>{@html price.toFixed(2)} €</p>
            {:else}
                <p class="promo">{@html promotion.toFixed(2)} €</p>
            {/if}
        </div>
    </div>
</a>

<style>
    a {
        display: grid;
        height: 14rem;
        border-radius: 0.5rem;
        grid-template-rows: 33.3% 33.3% 33.3%;
        padding: 1rem;
        background-size: cover;
        text-decoration: none;
        color: #4F8A06;
        flex: 1 1 20rem;
        margin: 0.5rem;
    }

    a:hover {
        cursor: pointer;
    }

    img {
        width: 10rem;
        height: 10rem;
    }
    .promo {
        color: red;
        font-weight: bold;
    }
</style>
