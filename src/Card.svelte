<script>
    import { createEventDispatcher } from "svelte";
    export let title;
    export let price;
    export let backgroundImage;
</script>

<a>
    <div id="interaction">
        <p>
            {@html title}
        </p>
        <div>
            <img
                    src={backgroundImage} />
        </div>
        <div>
            <p>
                {@html price} €
            </p>
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
        color: blueviolet;
        flex: 1 1 20rem;
        margin: 0.5rem;
    }
    a:hover {
        cursor: pointer;
    }
    img {
        width: 2rem;
        height: 2rem;
        filter: invert(1);
    }
</style>
