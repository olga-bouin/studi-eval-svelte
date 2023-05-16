<script>
    import Table from './Table.svelte';
    import {derived, writable} from "svelte/store";
    import {onMount} from "svelte";

    export const apiPromotionsData = writable([]);
    onMount(async () => {
        fetch("https://back-fastapi.herokuapp.com/api/promotions/")
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

</script>
<main>
    <h1>Promotions</h1>
    <Table tableData={$promotions}/>
</main>