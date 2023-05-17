<script>
    import Table from './Table.svelte';
    import {derived, writable} from "svelte/store";
    import {onMount} from "svelte";

    export const apiPromotionsData = writable([]);
    onMount(async () => {
        fetch("https://back-fastapi.herokuapp.com/api/promotions/extended_promotions_data/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                apiPromotionsData.set(data);
            }).catch(error => {
            console.error(error);
            return [];
        });
    });
    export const promotions = derived(apiPromotionsData, ($apiPromotionsData) => {
        if ($apiPromotionsData){
            return $apiPromotionsData;
        }
        return [];
    });

    let drawer;

    const openDrawer = ()=>{

        drawer.addEventListener('sl-hide', (event) => console.log('hide'));
        drawer.show();

    };

</script>

<svelte:head>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.34/dist/themes/base.css">
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.34/dist/shoelace.js"></script>

</svelte:head>

<main>
    <h1>Promotions</h1>
    <button on:click={openDrawer}>Créer une promotion</button>

    <sl-drawer label="Créer une promotion" class="drawer menu" bind:this={drawer}>

        <sl-select>
            <sl-menu-item value="option-1">Option 1</sl-menu-item>
            <sl-menu-item value="option-2">Option 2</sl-menu-item>
            <sl-menu-item value="option-3">Option 3</sl-menu-item>
        </sl-select>

    </sl-drawer>

    <Table tableData={$promotions}/>
</main>