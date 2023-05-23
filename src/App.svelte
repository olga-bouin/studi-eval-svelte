<script>
    import CatalogPage from './CatalogPage.svelte';
    import PromoPage from './PromoPage.svelte';
    import LoginComponent from "./LoginComponent.svelte";
    import AfterLogin from "./AfterLogin.svelte";
    import {store} from "./hooks/auth.js";
    import LogoutComponent from "./LogoutComponent.svelte";

    const webpages = [
        {name: "Catalogue", component: CatalogPage},
        {name: "Administration", component: PromoPage},
        {name: "Login", component: LoginComponent},
        {name: "Logout", component: LogoutComponent}
    ];

    let selectedPage = webpages[0];
    $: console.dir(selectedPage)

    const loadPage = (obj) => selectedPage = obj;

</script>
{#each webpages as webpageObj}
    {#if $store && webpageObj.name === "Login"}
        <span/>
    {:else if !$store && webpageObj.name === "Logout"}
        <span/>
    {:else if !$store && webpageObj.name === "Administration"}
        <span/>
    {:else}
        <button class="tablink"
                title={webpageObj.name}
                on:click={() => loadPage(webpageObj)}>{webpageObj.name}</button>
    {/if}
{/each}
{#if $store}
    <AfterLogin/>
{/if}
<svelte:component this={selectedPage.component}/>
