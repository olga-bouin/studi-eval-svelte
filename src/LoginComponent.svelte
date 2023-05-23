<script>
    import { getUserDetails } from './hooks/auth';
    import { store } from './hooks/auth';

    let username = '';
    let password = '';
    let error = ''

    async function login(event) {
        const user = await getUserDetails( username, password )

        if ( user ) {
            $store = user
            if ( error ) error = ''
        }
        else {
            error = 'Le mot de passe et/ou l\'identifiant sont incorrects'
            console.log("Incorrect username and password.")
        }
        event.target.reset();
    }

</script>
<div class="card">
<form on:submit|preventDefault={login} class="flex mx-auto col-6" style={$store?"display: none":""}>

    <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="email" class="form-control" id="username" bind:value={username} />
    </div>

    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" bind:value={password} />
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
    <div id="error_message" class="text-danger">
        <small>{error}</small>
    </div>

</form>
</div>

<style>
    #error_message {
        color: darkred;
    }
    .card {
        margin: 2rem;
    }
</style>