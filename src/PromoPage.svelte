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
        if ($apiPromotionsData) {
            return $apiPromotionsData;
        }
        return [];
    });


    function create_promotion(event) {
        const formData = new FormData(event.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data)

        fetch("https://back-fastapi.herokuapp.com/api/promotions/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
                "pourcentage": data["pourcentage_promotion"],
                "date_debut": data["date_debut"],
                "date_fin": data["date_fin"],
                "product_id": data["code_produit"]
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }

    function force_compute() {
        fetch("https://back-fastapi.herokuapp.com/api/products/compute_promotions", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });
    }


</script>


<main>
    <h1>Promotions</h1>
    <form on:submit|preventDefault={create_promotion}>
        <div class="input-w">
            <label>Product ID : </label>
            <input type="text" name="code_produit" placeholder="Code produit"/>
            <label>Promo en % : </label>
            <input type="text" name="pourcentage_promotion" placeholder="Entre 1% et 75%"/>
            <label>Début : </label>
            <input type="text" name="date_debut" placeholder="Date de début"/>
            <label>Fin : </label>
            <input type="text" name="date_fin" placeholder="Date de fin"/>
            <button type="submit">Créer</button>
        </div>
    </form>
        <button class="force" on:click={force_compute}>Forcer le recalcul des prix promotionnels</button>

    <Table tableData={$promotions}/>
</main>

<style>
    .input-w label, .input-w input {
        float: none;
        display: inline-block;
        vertical-align: middle;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        text-align: center;
    }

    .force {
        float: right;
    }
</style>