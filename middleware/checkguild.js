import { useDiscordStore } from "~~/stores/DiscordStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const discord = useDiscordStore()
    const appConfig = useAppConfig()

    const req = await $fetch(`${appConfig.apiBase}/checkguild/${to.params.id}&id=${discord.id}`, {
        method: 'GET'
    })
    
    if (req != 'True') {
        return navigateTo('/')
    }
})