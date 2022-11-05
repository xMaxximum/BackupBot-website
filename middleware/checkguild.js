import { useDiscordStore } from "~~/stores/DiscordStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const discord = useDiscordStore()
    const appConfig = useAppConfig()

    /*
    const req = await $fetch(`${appConfig.apiBase}/getguild/${to.query}`, {
        headers: {
            "userid": discord.id
        }
    })
    */

    //console.log(req.data)
    //console.log(req)
})