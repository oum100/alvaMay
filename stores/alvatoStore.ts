import { defineStore } from "pinia";
import { type Users } from '~/alvato/types/user'

export const alvatoStore = defineStore("pointofsale", ()=> {
    const registerUser = ref(<Users|null>(null))

    return{}
})