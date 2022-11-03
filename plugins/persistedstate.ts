import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'
let date = new Date();
date.setHours(date.getHours() + 168)
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.$pinia.use(createNuxtPersistedState(useCookie, {
        debug: true,
        cookieOptions: {
            expires: date
        }
    }))
})