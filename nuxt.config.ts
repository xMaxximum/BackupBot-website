// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  runtimeConfig: {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET,
    "redirectOauth": process.env.REDIRECT_OAUTH,
    "botInvite": process.env.BOT_INVITE,
    "apiBase": process.env.API_BASE,
    public: {
      "redirectOauth": process.env.REDIRECT_OAUTH,
      "botInvite": process.env.BOT_INVITE,
    },
  },
  appConfig: {
    apiBase: "http://localhost:5116",
    botInvite:
      "http://discord.com/api/oauth2/authorize?client_id=869686497203335199&permissions=8&scope=bot",
  },
  imports: {
    dirs: ["stores"],
  },
  routeRules: {
    "/dashboard/": { ssr: false },
    "/dashboard/**": { ssr: false },
  },
});
