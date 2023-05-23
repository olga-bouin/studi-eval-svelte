import {writable} from 'svelte/store';

const user = "mercadona@gmail.com"
const pass = "passwd"

export const store = writable(null);

export const getUserDetails = async (username, password) => {
    if (username === user && password === pass)
        return 1
}