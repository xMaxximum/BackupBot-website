// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
              autoImports: [
                // automatically imports `defineStore`
                'defineStore', // import { defineStore } from 'pinia'
                // automatically imports `defineStore` as `definePiniaStore`
                ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
              ],
            }
    ],
],
    runtimeConfig: {
        "clientId": process.env.CLIENT_ID,
        "clientSecret": process.env.CLIENT_SECRET,
        "redirectOauth": process.env.REDIRECT_OAUTH,
        "botInvite": ""
    
    },
    imports: {
        dirs: ['stores']
    },
    routeRules: {
        '/dashboard/': { ssr: false },
        '/dashboard/**': { ssr: false }
    }
})

