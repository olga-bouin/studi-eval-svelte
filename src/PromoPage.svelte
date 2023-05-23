<script>
    import Table from './Table.svelte';
    import {derived, writable} from "svelte/store";
    import {onMount} from "svelte";

    let isSuccessVisible = false;
    let isSuccessVisibleProduct = false;
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

        setTimeout(force_compute, 3000);
        isSuccessVisible = true;
        setTimeout(function () {
            isSuccessVisible = false;
        }, 3000);
        event.target.reset();
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

    function create_product(event) {
        const formData = new FormData(event.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data)

        fetch("https://back-fastapi.herokuapp.com/api/products/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({
                "libelle": data["libelle_produit"],
                "prix": data["prix"],
                "image": data["image"],
                "catalog_id": data["catalog_id"]
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        });

        isSuccessVisibleProduct = true;
        setTimeout(function () {
            isSuccessVisibleProduct = false;
        }, 3000);
        event.target.reset();
    }
</script>

<main>
    <h1>Produits et promotions</h1>
    <p>Créer un produit</p>
    <div class="form">
        <form on:submit|preventDefault={create_product}>
            <div class="input-w">
                <label for="libelle_produit">Libellé : </label>
                <input type="text" id="libelle_produit" name="libelle_produit" placeholder="Libellé de produit" required/>
                <label for="prix">Prix : </label>
                <input type="text" id="prix" name="prix" placeholder="Prix en euros"
                       required/>
                <label for="image">L'url de l'image : </label>
                <input type="text" id="image" name="image" placeholder="URL de l'image" required/>
                <label for="catalog_id">Catalog_id : </label>
                <input type="text" id="catalog_id" name="catalog_id" placeholder="Catalog id 8936265-8936273" required/>
                <button type="submit">Créer</button>
            </div>
        </form>
    </div>
    {#if isSuccessVisibleProduct}
        <p class="success-alert">Le produit a été ajouté avec succès</p>
    {/if}
    <p>Créer une promotion</p>
    <div class="form">
        <form on:submit|preventDefault={create_promotion}>
            <div class="input-w">
                <label for="code_produit">Product ID : </label>
                <input type="text" id="code_produit" name="code_produit" placeholder="Code produit" required/>
                <label for="pourcentage_promotion">Promo en % : </label>
                <input type="text" id="pourcentage_promotion" name="pourcentage_promotion" placeholder="Entre 1% et 75%"
                       required/>
                <label for="date_debut">Début : </label>
                <input type="text" id="date_debut" name="date_debut" placeholder="Date de début" required/>
                <label for="date_fin">Fin : </label>
                <input type="text" id="date_fin" name="date_fin" placeholder="Date de fin" required/>
                <button type="submit">Créer</button>
            </div>
        </form>
    </div>
    {#if isSuccessVisible}
        <p class="success-alert">La promotion a été ajoutée avec succès</p>
    {/if}

    <Table tableData={$promotions}/>
</main>

<style>
    .input-w label, .input-w input {
        float: none;
        display: inline-block;
        vertical-align: middle;
    }

    h1 {
        color: #4F8A06;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        text-align: center;
    }

    p {
        padding: 2rem;
    }

    .form {
        margin: 0 auto;
        width: 90%;
        padding: 1em;
        border: 1px solid #CCC;
        border-radius: 1em;
    }

    .success-alert {
        padding: 6px;
        text-align: center;
        color: #4F8A06;
    }
</style>